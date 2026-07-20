import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

// Three.js image plane with a custom shader.
// - Vertex shader: subtle bulge that follows the cursor (fake displacement).
// - Fragment shader: chromatic aberration around the cursor + slight idle wave.
// - UV cover-fit so the image fills the frame regardless of aspect ratio.
// - Falls back to a plain <img> if WebGL/three fails to load.
const VERT = `
  uniform float uTime;
  uniform vec2 uMouse;      // 0..1 in plane UV
  uniform float uHover;     // 0..1 eased
  uniform float uAspect;    // container aspect (w/h)
  uniform float uImgAspect; // texture aspect (w/h)
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Cursor bulge — smooth exponential falloff around cursor UV.
    vec2 duv = uv - uMouse;
    duv.x *= uAspect; // preserve circular falloff in a rectangle
    float d = length(duv);
    float bulge = exp(-d * 5.5) * uHover * 0.18;

    // Idle breathing — very small.
    float breathe = sin(uTime * 0.6) * 0.005;

    pos.z += bulge + breathe;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const FRAG = `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uHover;
  uniform float uTime;
  uniform float uAspect;
  uniform float uImgAspect;
  varying vec2 vUv;

  // UV cover-fit for the texture inside the plane.
  vec2 coverUv(vec2 uv, float containerAspect, float imgAspect) {
    vec2 out_ = uv;
    if (imgAspect > containerAspect) {
      // image wider than container — crop horizontally
      float scale = containerAspect / imgAspect;
      out_.x = (uv.x - 0.5) * scale + 0.5;
    } else {
      // image taller than container — crop vertically
      float scale = imgAspect / containerAspect;
      out_.y = (uv.y - 0.5) * scale + 0.5;
    }
    return out_;
  }

  void main() {
    vec2 uv = coverUv(vUv, uAspect, uImgAspect);
    vec2 duv = vUv - uMouse;
    duv.x *= uAspect;
    float d = length(duv);

    // Chromatic aberration — stronger near cursor when hovered.
    float aberr = uHover * smoothstep(0.5, 0.0, d) * 0.006;

    vec3 col;
    col.r = texture2D(uTexture, uv + vec2(aberr, 0.0)).r;
    col.g = texture2D(uTexture, uv).g;
    col.b = texture2D(uTexture, uv - vec2(aberr, 0.0)).b;

    // Subtle warmth boost near cursor.
    col += vec3(uHover * smoothstep(0.35, 0.0, d) * 0.06, 0.0, 0.0);

    gl_FragColor = vec4(col, 1.0);
  }
`

const WebGLImage = ({ src, alt, className }) => {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let mounted = true
    let cleanup = () => {}

    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    ;(async () => {
      try {
        const THREE = await import('three')
        if (!mounted || !containerRef.current || !canvasRef.current) return

        const container = containerRef.current
        const canvas = canvasRef.current

        const scene = new THREE.Scene()
        const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10)
        camera.position.z = 1

        const renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
        })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        const resize = () => {
          const { width, height } = container.getBoundingClientRect()
          renderer.setSize(width, height, false)
        }
        resize()
        const ro = new ResizeObserver(resize)
        ro.observe(container)

        // Load texture
        const loader = new THREE.TextureLoader()
        loader.crossOrigin = 'anonymous'
        const texture = await new Promise((res, rej) =>
          loader.load(src, res, undefined, rej)
        )
        if (!mounted) return
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter
        texture.generateMipmaps = false
        texture.colorSpace = THREE.SRGBColorSpace

        const imgAspect =
          (texture.image?.naturalWidth || texture.image?.width || 1) /
          (texture.image?.naturalHeight || texture.image?.height || 1)

        const rect = container.getBoundingClientRect()
        const uniforms = {
          uTexture: { value: texture },
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uHover: { value: 0 },
          uAspect: { value: rect.width / rect.height },
          uImgAspect: { value: imgAspect },
        }

        const material = new THREE.ShaderMaterial({
          uniforms,
          vertexShader: VERT,
          fragmentShader: FRAG,
          transparent: false,
        })
        const geometry = new THREE.PlaneGeometry(1, 1, 48, 48)
        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)

        // Interaction
        let targetHover = 0
        let easedHover = 0
        const targetMouse = new THREE.Vector2(0.5, 0.5)
        const easedMouse = new THREE.Vector2(0.5, 0.5)

        const onMove = (e) => {
          const r = container.getBoundingClientRect()
          targetMouse.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height)
        }
        const onEnter = () => (targetHover = 1)
        const onLeave = () => (targetHover = 0)
        container.addEventListener('mousemove', onMove)
        container.addEventListener('mouseenter', onEnter)
        container.addEventListener('mouseleave', onLeave)

        // Only render when in viewport (perf).
        let inView = true
        const io = new IntersectionObserver(
          (entries) => entries.forEach((e) => (inView = e.isIntersecting)),
          { threshold: 0 }
        )
        io.observe(container)

        const onResize = () => {
          const r = container.getBoundingClientRect()
          uniforms.uAspect.value = r.width / r.height
        }
        window.addEventListener('resize', onResize)

        let rafId
        const t0 = performance.now()
        const loop = (now) => {
          if (!mounted) return
          if (inView) {
            easedHover += (targetHover - easedHover) * 0.08
            easedMouse.lerp(targetMouse, 0.12)
            uniforms.uHover.value = easedHover
            uniforms.uMouse.value.copy(easedMouse)
            uniforms.uTime.value = (now - t0) / 1000
            renderer.render(scene, camera)
          }
          rafId = requestAnimationFrame(loop)
        }
        rafId = requestAnimationFrame(loop)

        cleanup = () => {
          cancelAnimationFrame(rafId)
          io.disconnect()
          ro.disconnect()
          window.removeEventListener('resize', onResize)
          container.removeEventListener('mousemove', onMove)
          container.removeEventListener('mouseenter', onEnter)
          container.removeEventListener('mouseleave', onLeave)
          geometry.dispose()
          material.dispose()
          texture.dispose()
          renderer.dispose()
        }
      } catch (e) {
        console.error('WebGLImage failed', e)
        setFailed(true)
      }
    })()

    return () => {
      mounted = false
      cleanup()
    }
  }, [src])

  return (
    <div ref={containerRef} className={cn('relative w-full h-full overflow-hidden', className)}>
      {failed ? (
        <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <>
          <canvas ref={canvasRef} className="block w-full h-full" />
          {/* Screen-reader / SEO fallback */}
          <img src={src} alt={alt} className="sr-only" />
        </>
      )}
    </div>
  )
}

export default WebGLImage
