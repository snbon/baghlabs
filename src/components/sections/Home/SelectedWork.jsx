import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { cases } from '@/data/cases'
import { useCurrentLang, useLangPath } from '@/lib/usePathAlternate'
import SplitReveal from '@/components/motion/SplitReveal'

const FEATURED_IDS = ['availly', 'delicebrugge', 'shiftend', 'calvarychurch', 'supportportal', 'claymates']

/* ─────────────────────────────────────────────────────────────
 *   Full-screen WebGL gallery
 *   ────────────────────────────
 *   - Section is N × 100vh tall, inner sticky <div> pins full viewport
 *   - Fragment shader:
 *       · cover-fits current + next case textures
 *       · noise-driven dissolve mask between them, threshold = subProgress
 *       · velocity-driven horizontal shear so fast scroll warps the image
 *       · slow drifting UV noise for ambient life
 *   - Text overlay (chapter, title, tagline, view link) cross-fades on
 *     activeIdx change via AnimatePresence
 *   ───────────────────────────── */

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D uTextureA;
  uniform sampler2D uTextureB;
  uniform vec2  uResA;
  uniform vec2  uResB;
  uniform vec2  uCanvas;
  uniform float uProgress;   // 0..1 within current slot
  uniform float uVelocity;   // scroll velocity, smoothed
  uniform float uTime;
  varying vec2  vUv;

  vec2 coverUv(vec2 uv, vec2 texRes, vec2 canvas) {
    float ra = canvas.x / canvas.y;
    float ri = texRes.x / texRes.y;
    vec2 s = ri > ra ? vec2(ra / ri, 1.0) : vec2(1.0, ri / ra);
    return (uv - 0.5) * s + 0.5;
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;

    // Velocity-driven horizontal shear — subtle when idle, strong on fast scroll.
    float shear = uVelocity * 0.06 * sin(uv.y * 5.0 + uTime * 0.7);
    uv.x += shear;

    // Ambient displacement — very slow, adds life.
    float amb = fbm(uv * 3.0 + vec2(uTime * 0.04, uTime * 0.02));
    vec2 uvDisp = vec2(0.0, (amb - 0.5) * 0.008);

    // Cover-fit for both textures.
    vec2 uvA = coverUv(uv + uvDisp, uResA, uCanvas);
    vec2 uvB = coverUv(uv + uvDisp, uResB, uCanvas);

    // Slight forward push on outgoing, pull on incoming.
    uvA += vec2(0.0, uProgress * 0.05);
    uvB += vec2(0.0, (uProgress - 1.0) * 0.05);

    vec4 colA = texture2D(uTextureA, uvA);
    vec4 colB = texture2D(uTextureB, uvB);

    // Compress the transition into the MIDDLE of each slot:
    //   uProgress 0.00..0.35  → stable, showing texture A  (pT = 0)
    //   uProgress 0.35..0.65  → grain dissolve to texture B
    //   uProgress 0.65..1.00  → stable, showing texture B  (pT = 1)
    float pT = smoothstep(0.35, 0.65, uProgress);

    // Grain-modulated dissolve:
    //   pT = 0 → mask = 0 everywhere (fully A)
    //   pT = 1 → mask = 1 everywhere (fully B)
    //   pT = 0.5 → per-pixel jitter around grain threshold
    float grain = fbm(uv * 4.0);
    float mask = smoothstep(0.4, 0.6, pT + (grain - 0.5) * 0.5);

    vec4 col = mix(colA, colB, mask);

    // Vignette so text overlay stays readable.
    float v = distance(vUv, vec2(0.5, 0.5));
    col.rgb *= 1.0 - v * 0.35;
    // Darker floor so text contrast holds.
    col.rgb *= 0.92;

    gl_FragColor = vec4(col.rgb, 1.0);
  }
`

const SelectedWork = () => {
  const { t } = useTranslation('cases')
  const { t: tCommon } = useTranslation('common')
  const lang = useCurrentLang()
  const langPath = useLangPath()
  const basePath = lang === 'en' ? '/en' : ''
  const projectsSegment = basePath === '/en' ? 'cases' : 'projecten'

  const featured = FEATURED_IDS.map((id) => cases.find((c) => c.id === id)).filter(Boolean)
  const N = featured.length

  const wrapperRef = useRef(null)
  const canvasRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  // Shared mutable state read by the render loop.
  const stateRef = useRef({
    activeIdx: 0,
    subProgress: 0,
    scrollVelocity: 0,
    lastScrollY: typeof window !== 'undefined' ? window.scrollY : 0,
    lastTime: performance.now(),
  })

  // React-facing state for the text overlay + counter.
  const [uiIdx, setUiIdx] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const clamped = Math.min(0.9999, Math.max(0, p))
    const total = clamped * N
    const idx = Math.min(N - 1, Math.floor(total))
    const sub = Math.min(1, Math.max(0, total - idx))
    stateRef.current.activeIdx = idx
    stateRef.current.subProgress = sub
    // Text swap happens at the middle of each slot so it aligns with the
    // WebGL transition window (uProgress 0.35..0.65). +0.5 shifts the floor.
    const displayIdx = Math.min(N - 1, Math.max(0, Math.floor(total + 0.5)))
    setUiIdx(displayIdx)
  })

  // Init WebGL once.
  useEffect(() => {
    let mounted = true
    let cleanup = () => {}

    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    ;(async () => {
      const THREE = await import('three')
      if (!mounted || !canvasRef.current) return

      const canvas = canvasRef.current
      const scene = new THREE.Scene()
      const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10)
      camera.position.z = 1

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: false,
        antialias: false,
        powerPreference: 'high-performance',
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      const resize = () => {
        const parent = canvas.parentElement
        const w = parent?.clientWidth || window.innerWidth
        const h = parent?.clientHeight || window.innerHeight
        renderer.setSize(w, h, false)
        uniforms.uCanvas.value.set(w, h)
      }

      // Preload all textures.
      const loader = new THREE.TextureLoader()
      loader.crossOrigin = 'anonymous'
      const textures = await Promise.all(
        featured.map(
          (c) =>
            new Promise((resolve) => {
              loader.load(
                c.image,
                (tex) => {
                  tex.minFilter = THREE.LinearFilter
                  tex.magFilter = THREE.LinearFilter
                  tex.generateMipmaps = false
                  tex.colorSpace = THREE.SRGBColorSpace
                  resolve(tex)
                },
                undefined,
                () => resolve(null)
              )
            })
        )
      )
      if (!mounted) return
      const valid = textures.filter(Boolean)
      if (valid.length === 0) return

      const texRes = valid.map((tex) => {
        const img = tex.image
        return new THREE.Vector2(img?.naturalWidth || img?.width || 1, img?.naturalHeight || img?.height || 1)
      })

      const uniforms = {
        uTextureA: { value: valid[0] },
        uTextureB: { value: valid[Math.min(1, valid.length - 1)] },
        uResA: { value: texRes[0] },
        uResB: { value: texRes[Math.min(1, valid.length - 1)] },
        uCanvas: { value: new THREE.Vector2(1, 1) },
        uProgress: { value: 0 },
        uVelocity: { value: 0 },
        uTime: { value: 0 },
      }

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: VERT,
        fragmentShader: FRAG,
      })
      const geometry = new THREE.PlaneGeometry(1, 1)
      const mesh = new THREE.Mesh(geometry, material)
      // Fit plane to camera.
      mesh.scale.set(1, 1, 1)
      scene.add(mesh)

      resize()
      window.addEventListener('resize', resize)

      // Also resize the plane to match ortho camera bounds.
      const fitPlane = () => {
        const w = camera.right - camera.left
        const h = camera.top - camera.bottom
        mesh.scale.set(w, h, 1)
      }
      fitPlane()

      // Sync scroll velocity via rAF diff on window.scrollY (works with Lenis too).
      const start = performance.now()
      let velSmooth = 0
      let rafId

      const loop = (now) => {
        if (!mounted) return
        const s = stateRef.current
        const dtMs = now - s.lastTime
        const dy = window.scrollY - s.lastScrollY
        s.lastTime = now
        s.lastScrollY = window.scrollY
        // Normalize velocity to ~[-1, 1] range at typical scroll speeds.
        const inst = Math.max(-1, Math.min(1, dy / (dtMs || 16) / 3))
        velSmooth += (inst - velSmooth) * 0.15

        const { activeIdx, subProgress } = s
        const idxA = activeIdx
        const idxB = Math.min(N - 1, activeIdx + 1)

        uniforms.uTextureA.value = valid[Math.min(valid.length - 1, idxA)]
        uniforms.uTextureB.value = valid[Math.min(valid.length - 1, idxB)]
        uniforms.uResA.value = texRes[Math.min(texRes.length - 1, idxA)]
        uniforms.uResB.value = texRes[Math.min(texRes.length - 1, idxB)]
        uniforms.uProgress.value = idxA === N - 1 ? 0 : subProgress
        uniforms.uVelocity.value = velSmooth
        uniforms.uTime.value = (now - start) / 1000

        renderer.render(scene, camera)
        rafId = requestAnimationFrame(loop)
      }
      rafId = requestAnimationFrame(loop)

      cleanup = () => {
        cancelAnimationFrame(rafId)
        window.removeEventListener('resize', resize)
        valid.forEach((tex) => tex && tex.dispose())
        geometry.dispose()
        material.dispose()
        renderer.dispose()
      }
    })()

    return () => {
      mounted = false
      cleanup()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sectionVh = N * 120
  const activeCase = featured[uiIdx]
  const activeName = activeCase ? t(`${activeCase.id}.name`, { defaultValue: activeCase.id }) : ''
  const activeTagline = activeCase ? t(`${activeCase.id}.tagline`, { defaultValue: '' }) : ''
  const activeCategory = activeCase ? t(`${activeCase.id}.category`, { defaultValue: '' }) : ''
  const activeHref = activeCase && !activeCase.comingSoon ? `${basePath}/${projectsSegment}/${activeCase.id}` : '#'
  const barWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <>
      {/* Desktop: full-screen WebGL gallery */}
      <section
        id="work"
        ref={wrapperRef}
        className="relative bg-noir text-paper hidden md:block"
        style={{ height: `${sectionVh}vh` }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden border-t border-paper/10">
          {/* Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
          {/* Darkening + gradient for text contrast */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(12,10,8,0.55) 0%, rgba(12,10,8,0.25) 30%, rgba(12,10,8,0.15) 55%, rgba(12,10,8,0.85) 100%)',
            }}
          />

          {/* Top row */}
          <div className="absolute top-0 inset-x-0 z-10">
            <div className="container-wide pt-24 pb-6 border-b border-paper/15 flex items-baseline justify-between">
              <div className="flex items-baseline gap-8">
                <span className="chapter">Cap. II — Selected work</span>
                <span className="smallcaps text-paper/50">
                  {String(uiIdx + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
                </span>
              </div>
              <Link
                to={langPath('projects')}
                className="smallcaps text-paper/70 hover:text-oxblood border-b border-paper/25 hover:border-oxblood pb-1 transition-colors"
              >
                View all →
              </Link>
            </div>
          </div>

          {/* Text overlay — bottom left */}
          <div className="absolute inset-x-0 bottom-0 z-10">
            <div className="container-wide pb-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={uiIdx}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-3xl"
                >
                  <p className="smallcaps text-oxblood mb-4">{activeCategory || 'Project'}</p>
                  <h3
                    className="font-display font-bold text-paper mb-6"
                    style={{
                      fontSize: 'clamp(3rem, 8vw, 8rem)',
                      lineHeight: 0.95,
                      letterSpacing: '-0.03em',
                      fontVariationSettings: "'opsz' 144",
                    }}
                  >
                    {activeName}
                  </h3>
                  <p className="font-display italic text-lg md:text-2xl text-paper/80 mb-8 leading-snug max-w-2xl">
                    {activeTagline}
                  </p>
                  {!activeCase?.comingSoon && (
                    <Link
                      to={activeHref}
                      className="group inline-flex items-baseline gap-3 smallcaps text-paper border-b border-paper/40 hover:border-oxblood hover:text-oxblood pb-1 transition-colors"
                    >
                      {tCommon('cta.viewCase')}
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div className="container-wide pb-6 border-t border-paper/15 pt-4">
              <div className="flex items-center gap-4">
                <span className="smallcaps text-paper/50 w-14">Scroll</span>
                <div className="flex-1 h-px bg-paper/20 relative">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-oxblood"
                    style={{ width: barWidth }}
                  />
                </div>
                <span className="smallcaps text-paper/50 w-14 text-right">Work</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile: vertical stack (no heavy WebGL) */}
      <section id="work-mobile" className="md:hidden bg-noir text-paper border-t border-paper/10">
        <div className="container-wide py-16">
          <div className="flex items-baseline justify-between mb-10">
            <p className="chapter">Cap. II</p>
            <Link to={langPath('projects')} className="smallcaps text-paper/60 border-b border-paper/20 pb-1">
              View all →
            </Link>
          </div>
          <h2 className="poster-2 mb-12">
            <SplitReveal>Selected work.</SplitReveal>
          </h2>
          <div className="space-y-14">
            {featured.map((c, i) => {
              const name = t(`${c.id}.name`, { defaultValue: c.id })
              const tagline = t(`${c.id}.tagline`, { defaultValue: '' })
              return (
                <Link
                  key={c.id}
                  to={c.comingSoon ? '#' : `${basePath}/${projectsSegment}/${c.id}`}
                  className={`group block ${c.comingSoon ? 'pointer-events-none' : ''}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-noir-2 mb-5">
                    <img src={c.image} alt={name} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-noir/80 px-2.5 py-1 border border-paper/15">
                      <span className="smallcaps text-oxblood">No. {String(i + 1).padStart(2, '0')}</span>
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-3xl leading-tight text-paper mb-2">{name}</h3>
                  <p className="text-paper/60">{tagline}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default SelectedWork
