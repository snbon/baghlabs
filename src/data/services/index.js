import aiWorkflows from './ai-workflows.json'
import kennissystemen from './kennissystemen.json'
import documentverwerking from './documentverwerking.json'
import integraties from './integraties.json'
import softwareontwikkeling from './softwareontwikkeling.json'

export const pillars = [
  aiWorkflows,
  kennissystemen,
  documentverwerking,
  integraties,
  softwareontwikkeling,
]

export const pillarsById = Object.fromEntries(pillars.map((p) => [p.id, p]))

export function getPillar(id) {
  return pillarsById[id] || null
}
