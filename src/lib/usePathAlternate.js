import { useLocation } from 'react-router-dom'

// Segment maps: NL <-> EN. Only translated segments are listed;
// dynamic segments (case slug, service id) pass through untouched.
const NL_TO_EN = {
  diensten: 'services',
  projecten: 'cases',
  'over-ons': 'about',
  contact: 'contact',
}

const EN_TO_NL = {
  services: 'diensten',
  cases: 'projecten',
  about: 'over-ons',
  contact: 'contact',
}

// Given the current pathname and a target language, return the mirrored path.
// Examples:
//   ('/diensten/ai-workflows', 'en') -> '/en/services/ai-workflows'
//   ('/en/cases/availly',      'nl') -> '/projecten/availly'
//   ('/',                       'en') -> '/en'
//   ('/en',                     'nl') -> '/'
export function pathAlternate(pathname, targetLang) {
  const isEnglish = pathname === '/en' || pathname.startsWith('/en/')
  const rawSegments = isEnglish
    ? pathname.replace(/^\/en\/?/, '').split('/').filter(Boolean)
    : pathname.split('/').filter(Boolean)

  const mapping = targetLang === 'en'
    ? (isEnglish ? null : NL_TO_EN)  // NL -> EN
    : (isEnglish ? EN_TO_NL : null)  // EN -> NL

  const nextSegments = rawSegments.map((seg, idx) => {
    if (idx === 0 && mapping && mapping[seg]) return mapping[seg]
    return seg
  })

  const prefix = targetLang === 'en' ? '/en' : ''
  const body = nextSegments.length ? '/' + nextSegments.join('/') : ''
  return prefix + body || '/'
}

export function usePathAlternate(targetLang) {
  const location = useLocation()
  return pathAlternate(location.pathname, targetLang)
}

export function useCurrentLang() {
  const location = useLocation()
  return location.pathname === '/en' || location.pathname.startsWith('/en/') ? 'en' : 'nl'
}

// Build a language-aware absolute path for a known route key.
// Route keys are stable identifiers: 'home' | 'services' | 'projects' | 'about' | 'contact'.
// Optional trailing slug (for service id or project slug) is appended.
export function buildLangPath(lang, routeKey, slug) {
  if (routeKey === 'home') return lang === 'en' ? '/en' : '/'
  const nlSeg = { services: 'diensten', projects: 'projecten', about: 'over-ons', contact: 'contact' }[routeKey]
  const enSeg = { services: 'services', projects: 'cases', about: 'about', contact: 'contact' }[routeKey]
  const prefix = lang === 'en' ? '/en' : ''
  const seg = lang === 'en' ? enSeg : nlSeg
  return `${prefix}/${seg}${slug ? `/${slug}` : ''}`
}

export function useLangPath() {
  const lang = useCurrentLang()
  return (routeKey, slug) => buildLangPath(lang, routeKey, slug)
}
