import peopleJson from '../../content/people.json'
import projectsJson from '../../content/projects.json'

/**
 * Data layer — dibaca dari file JSON di /content.
 * Edit data = edit JSON di repo → commit → Vercel auto-deploy.
 * Panduan skema: lihat content/README.md
 *
 * Bentuk output sengaja sama dengan mapping Strapi yang lama supaya
 * komponen UI tidak perlu banyak berubah.
 */

type AnyDoc = Record<string, any>

const projects = projectsJson as AnyDoc[]
const people = peopleJson as AnyDoc[]

const PLACEHOLDER = '/images/project/placeholder.png'

/** Kartu showcase di home: 14 project pertama (2 baris x 7). */
export async function getShowcaseCards(): Promise<AnyDoc[]> {
  return projects.slice(0, 14).map((p) => ({
    id: p.id,
    title: p.title,
    imageUrl: p.image ?? PLACEHOLDER,
    description: p.detail?.description || 'No description available',
  }))
}

/** Kartu + opsi filter untuk halaman /project. */
export async function getProjectCards(): Promise<{
  cards: AnyDoc[]
  roleOptions: string[]
  productOptions: string[]
  categoryOptions: string[]
}> {
  const cards = projects.map((p) => ({
    id: p.id,
    title: p.title,
    imageUrl: p.image ?? PLACEHOLDER,
    roles: (p.team ?? []).flatMap((t: AnyDoc) => t.jobs ?? []),
    products: p.products ?? [],
    categories: p.categories ?? [],
    projectTeamIds: (p.team ?? []).map((t: AnyDoc) => t.person),
  }))

  return {
    cards,
    roleOptions: [...new Set(cards.flatMap((c) => c.roles))],
    productOptions: [...new Set(cards.flatMap((c) => c.products))],
    categoryOptions: [...new Set(cards.flatMap((c) => c.categories))],
  }
}

/** Detail satu project untuk /project/[id]. */
export async function getProjectDetail(id: string | number): Promise<AnyDoc | null> {
  const p = projects.find((x) => String(x.id) === String(id))
  if (!p) return null

  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    imageUrl: p.image ?? PLACEHOLDER,
    detail: {
      headline: p.detail?.headline,
      description: p.detail?.description,
      client: p.detail?.client,
      year: p.detail?.year,
    },
    team: (p.team ?? []).map((t: AnyDoc, i: number) => {
      const person = people.find((x) => x.fullName === t.person)
      return {
        key: `${p.id}-${i}`,
        fullName: t.person,
        photoUrl: person?.photo ?? PLACEHOLDER,
        jobs: t.jobs ?? [],
      }
    }),
  }
}

/**
 * People untuk hero halaman project. Bentuk field dipertahankan ala Strapi
 * (full_name, topRoles[].job_name, cv) supaya Hero.js & HeroMobile.js minim perubahan.
 */
export async function getPeople(): Promise<AnyDoc[]> {
  return people.map((p) => ({
    id: p.id,
    full_name: p.fullName,
    description: p.description ?? '',
    cv: p.links?.cv ?? '',
    topRoles: (p.topJobs ?? []).map((jobName: string) => ({ job_name: jobName })),
    photoUrl: p.photo ?? PLACEHOLDER,
  }))
}
