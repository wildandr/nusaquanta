import peopleJson from '../../content/people.json'
import projectsJson from '../../content/projects.json'
import caseStudiesJson from '../../content/case-studies.json'

type AnyDoc = Record<string, any>
type CaseStudy = {
  shortTitle: string
  industry: string
  summary: string
  challenge: string
  solution: string
  outcome?: string
  metric?: string
  metricLabel?: string
}

const projects = projectsJson as AnyDoc[]
const people = peopleJson as AnyDoc[]
const caseStudies = caseStudiesJson as Record<string, CaseStudy>
const PLACEHOLDER = '/images/project/placeholder.png'
const featuredIds = [1, 3, 12, 17]

function readableText(markdown = ''): string {
  return markdown
    .replace(/^#{1,6}\s+.*$/gm, '')
    .replace(/\*\*|__|\[([^\]]+)\]\([^)]*\)/g, '$1')
    .split(/\n\s*\n/)
    .map((part: string) => part.trim())
    .find((part: string) => part.length > 80) || ''
}

function capabilitiesFor(products: string[] = []): string[] {
  const names = products.join(' ').toLowerCase()
  const result: string[] = []
  if (/ui\/ux|design|research/.test(names)) result.push('Product design')
  if (/website|web|api|backend|dashboard/.test(names)) result.push('Web platforms')
  if (/mobile|android|ios/.test(names)) result.push('Mobile apps')
  if (/machine|data|artificial|ai\b/.test(names)) result.push('Data & AI')
  return result.length ? result : ['Digital products']
}

function projectCard(project: AnyDoc) {
  const curated = caseStudies[String(project.id)]
  const year = String(project.detail?.year || '')
  const rawSummary = readableText(project.detail?.description || '')
  return {
    id: project.id,
    title: curated?.shortTitle || project.detail?.headline || project.title,
    fullTitle: project.title,
    imageUrl: project.image === PLACEHOLDER ? null : (project.image || null),
    summary: curated?.summary || (rawSummary.length > 190 ? `${rawSummary.slice(0, 187).trimEnd()}…` : rawSummary),
    industry: curated?.industry || (project.categories || []).find((category: string) => !/service|dashboard|website|application/i.test(category)) || 'Digital experience',
    capabilities: capabilitiesFor(project.products),
    year: /^20\d{2}$/.test(year) ? year : null,
    metric: curated?.metric || null,
    metricLabel: curated?.metricLabel || null,
    featured: featuredIds.includes(project.id),
  }
}

export async function getShowcaseCards() {
  return featuredIds.map((id) => projectCard(projects.find((project) => project.id === id)!))
}

export async function getProjectCards() {
  const cards = projects.map(projectCard)
  return {
    cards,
    capabilityOptions: [...new Set(cards.flatMap((card) => card.capabilities))],
    industryOptions: [...new Set(cards.map((card) => card.industry))].sort(),
  }
}

export async function getProjectDetail(id: string | number) {
  const project = projects.find((item) => String(item.id) === String(id))
  if (!project) return null
  const curated = caseStudies[String(project.id)]
  const client = project.detail?.client
  return {
    ...projectCard(project),
    slug: project.slug,
    client: typeof client === 'string' && !/^20\d{2}$/.test(client) ? client : null,
    challenge: curated?.challenge || null,
    solution: curated?.solution || null,
    outcome: curated?.outcome || null,
    description: project.detail?.description || '',
    team: (project.team || []).map((member: AnyDoc, index: number) => {
      const person = people.find((item) => item.fullName === member.person)
      return {
        key: `${project.id}-${index}`,
        fullName: member.person,
        photoUrl: person?.photo || PLACEHOLDER,
        jobs: member.jobs || [],
      }
    }),
  }
}

export async function getPeople() {
  return people.map((person) => {
    const basename = String(person.photo || '').split('/').pop()?.split('.')[0]
    const cutout = `/images/home/${basename}_warna.webp`
    const description = String(person.description || '').trim()
    return {
      id: person.id,
      fullName: person.fullName,
      description: /ganteng/i.test(description) ? '' : description,
      role: person.topJobs?.[0] || 'Team member',
      topJobs: person.topJobs || [],
      photoUrl: person.photo || PLACEHOLDER,
      cutoutUrl: cutout,
      linkedin: person.links?.linkedin || null,
      projectIds: projects.filter((project) => (project.team || []).some((member: AnyDoc) => member.person === person.fullName)).map((project) => project.id),
    }
  })
}
