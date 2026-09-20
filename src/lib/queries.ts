import { getPayload } from 'payload'
import configPromise from '@payload-config'

/**
 * Data layer sisi-server (Payload Local API) — pengganti fetch ke Strapi.
 * Bentuk data di sengaja dibuat sama dengan hasil mapping Strapi yang lama
 * supaya komponen UI tidak perlu banyak berubah.
 */

const PLACEHOLDER = '/images/project/placeholder.png'

const getPayloadClient = () => getPayload({ config: configPromise })

/**
 * URL media hasil Local API absolut (pakai serverURL). URL media same-origin
 * dibuat relatif agar next/image tidak menuntut konfigurasi hostname per-env;
 * URL Blob (host berbeda) dibiarkan absolut.
 */
const mediaSrc = (url?: string | null): string => {
  if (!url) return PLACEHOLDER
  return url.replace(/^https?:\/\/[^/]+(\/api\/media\/file\/)/, '$1')
}

type AnyDoc = Record<string, any>

const rel = (v: any): AnyDoc | null => (v && typeof v === 'object' ? v : null)

/** Kartu showcase di home: 14 project pertama (2 baris x 7). */
export async function getShowcaseCards(): Promise<AnyDoc[]> {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'projects',
      limit: 14,
      sort: 'id',
      depth: 1,
      overrideAccess: true,
    })
    return docs.map((p: AnyDoc) => ({
      id: p.id,
      title: p.title,
      imageUrl: mediaSrc(rel(p.image)?.url),
      description: p.detail?.description || 'No description available',
    }))
  } catch (e) {
    console.error('getShowcaseCards:', e)
    return []
  }
}

/** Kartu + opsi filter untuk halaman /project. */
export async function getProjectCards(): Promise<{
  cards: AnyDoc[]
  roleOptions: string[]
  productOptions: string[]
  categoryOptions: string[]
}> {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'projects',
      limit: 100,
      sort: 'id',
      depth: 2,
      overrideAccess: true,
    })

    const cards = docs.map((p: AnyDoc) => ({
      id: p.id,
      title: p.title,
      imageUrl: mediaSrc(rel(p.image)?.url),
      roles: (p.team ?? []).flatMap((t: AnyDoc) =>
        (t.jobs ?? []).map((j: AnyDoc) => (rel(j) ? j.jobName : j)).filter(Boolean)
      ),
      products: (p.products ?? []).map((x: AnyDoc) => (rel(x) ? x.name : x)).filter(Boolean),
      categories: (p.categories ?? []).map((x: AnyDoc) => (rel(x) ? x.name : x)).filter(Boolean),
      projectTeamIds: (p.team ?? [])
        .map((t: AnyDoc) => rel(t.person)?.fullName)
        .filter(Boolean),
    }))

    const roleOptions = [...new Set(cards.flatMap((c) => c.roles))]
    const productOptions = [...new Set(cards.flatMap((c) => c.products))]
    const categoryOptions = [...new Set(cards.flatMap((c) => c.categories))]

    return { cards, roleOptions, productOptions, categoryOptions }
  } catch (e) {
    console.error('getProjectCards:', e)
    return { cards: [], roleOptions: [], productOptions: [], categoryOptions: [] }
  }
}

/** Detail satu project untuk /project/[id]. */
export async function getProjectDetail(id: string | number): Promise<AnyDoc | null> {
  try {
    const payload = await getPayloadClient()
    const p: AnyDoc = await payload.findByID({
      collection: 'projects',
      id: Number(id),
      depth: 2,
      overrideAccess: true,
    })
    if (!p) return null

    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      imageUrl: mediaSrc(rel(p.image)?.url),
      detail: {
        headline: p.detail?.headline,
        description: p.detail?.description,
        client: p.detail?.client,
        year: p.detail?.year,
      },
      team: (p.team ?? [])
        .map((t: AnyDoc) => {
          const person = rel(t.person)
          if (!person) return null
          return {
            key: `${p.id}-${person.id}`,
            fullName: person.fullName,
            photoUrl: mediaSrc(rel(person.photo)?.url),
            jobs: (t.jobs ?? [])
              .map((j: AnyDoc) => (rel(j) ? j.jobName : j))
              .filter(Boolean),
          }
        })
        .filter(Boolean),
    }
  } catch (e: any) {
    if (e?.status === 404 || e?.name === 'NotFoundError') return null
    console.error('getProjectDetail:', e)
    return null
  }
}

/**
 * People untuk hero halaman project. Bentuk field dipertahankan ala Strapi
 * (full_name, topRoles[].job_name, cv) supaya Hero.js & HeroMobile.js minim perubahan.
 */
export async function getPeople(): Promise<AnyDoc[]> {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'people',
      limit: 20,
      sort: 'order',
      depth: 2,
      overrideAccess: true,
    })
    return docs.map((p: AnyDoc) => ({
      id: p.id,
      full_name: p.fullName,
      description: p.description ?? '',
      cv: p.links?.cv ?? '',
      topRoles: (p.topJobs ?? []).map((j: AnyDoc) => ({
        job_name: rel(j) ? j.jobName : j,
      })),
      photoUrl: mediaSrc(rel(p.photo)?.url),
    }))
  } catch (e) {
    console.error('getPeople:', e)
    return []
  }
}
