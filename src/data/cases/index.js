import availly from './availly.json'
import shiftend from './shiftend.json'
import projectAlpha from './project-alpha.json'
import delicebrugge from './delicebrugge.json'
import calvarychurch from './calvarychurch.json'
import blurryVintage from './blurry-vintage.json'
import claymates from './claymates.json'
import ic from './ic.json'
import rebelieve from './rebelieve.json'
import yokoso from './yokoso.json'
import polandInvest from './poland-invest.json'

export const cases = [
  availly,
  shiftend,
  delicebrugge,
  calvarychurch,
  projectAlpha,
  blurryVintage,
  claymates,
  ic,
  rebelieve,
  yokoso,
  polandInvest,
]

export const webCases = cases.filter(c => c.template === 'web')
export const creativeCases = cases.filter(c => c.template === 'creative')

export const getCaseById = (id) => cases.find(c => c.id === id)

export const getFeaturedCases = (count = 6) => {
  // Return a mix: first 2 web cases + first 4 creative cases
  const web = webCases.filter(c => !c.comingSoon).slice(0, 2)
  const creative = creativeCases.slice(0, count - web.length)
  return [...web, ...creative]
}

export default cases
