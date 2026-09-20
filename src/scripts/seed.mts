/**
 * Seed: migrasi data Strapi (sqlite) → Payload.
 *
 * Sumber data: db.sqlite Strapi v4 (arsip lokal, path via env STRAPI_SQLITE_PATH).
 * Gambar: file lokal di public/images (project 1..18 + foto 5 orang).
 * Idempotent: data yang sudah ada (dicek per slug/name/filename) dilewati.
 *
 * Jalankan: npm run seed
 */
import './env.mjs'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Database from 'better-sqlite3'
import { getPayload } from 'payload'


import configPromise from '../payload.config.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const repoRoot = path.resolve(dirname, '../..')

const SQLITE_PATH =
  process.env.STRAPI_SQLITE_PATH ||
  path.resolve(repoRoot, '../../../99-archive/strapi-migration/db.sqlite')

// project id (Strapi) → file gambar di public/images/home/project/
const projectImage = (id: number) =>
  path.join(repoRoot, `public/images/home/project/${id}.png`)

// person id (Strapi) → foto tim
const personPhoto: Record<number, string> = {
  1: 'aziz.jpeg',
  2: 'rasyid.jpeg',
  3: 'wildan.jpeg',
  4: 'nawal.jpeg',
  5: 'darel.jpeg',
}
const personPhotoPath = (id: number) =>
  personPhoto[id]
    ? path.join(repoRoot, `public/images/project/${personPhoto[id]}`)
    : undefined

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

async function main() {
  const payload = await getPayload({ config: configPromise })
  const db = new Database(SQLITE_PATH, { readonly: true })

  console.log(`Sumber: ${SQLITE_PATH}`)

  // ---------- 1. Taxonomy ----------
  const taxonomyIds: Record<'categories' | 'products' | 'jobs', Map<number, number>> = {
    categories: new Map(),
    products: new Map(),
    jobs: new Map(),
  }

  for (const row of db.prepare('SELECT id, category_name FROM categories').all() as any[]) {
    const existing = await payload.find({
      collection: 'categories',
      where: { name: { equals: row.category_name } },
      overrideAccess: true,
    })
    const doc = existing.docs[0]
      ? existing.docs[0].id
      : (
          await payload.create({
            collection: 'categories',
            data: { name: row.category_name, slug: slugify(row.category_name) },
            overrideAccess: true,
          })
        ).id
    taxonomyIds.categories.set(row.id, doc)
  }

  for (const row of db.prepare('SELECT id, product_name FROM products').all() as any[]) {
    const existing = await payload.find({
      collection: 'products',
      where: { name: { equals: row.product_name } },
      overrideAccess: true,
    })
    const doc = existing.docs[0]
      ? existing.docs[0].id
      : (
          await payload.create({
            collection: 'products',
            data: { name: row.product_name, slug: slugify(row.product_name) },
            overrideAccess: true,
          })
        ).id
    taxonomyIds.products.set(row.id, doc)
  }

  for (const row of db.prepare('SELECT id, job_name FROM jobs').all() as any[]) {
    const existing = await payload.find({
      collection: 'jobs',
      where: { jobName: { equals: row.job_name } },
      overrideAccess: true,
    })
    const doc = existing.docs[0]
      ? existing.docs[0].id
      : (
          await payload.create({
            collection: 'jobs',
            data: { jobName: row.job_name, slug: slugify(row.job_name) },
            overrideAccess: true,
          })
        ).id
    taxonomyIds.jobs.set(row.id, doc)
  }

  // ---------- 2. Media + People ----------
  const peopleIds = new Map<number, number>() // strapi person id → payload id
  const mediaPhotoIds = new Map<number, number>() // strapi person id → media id

  const people = db
    .prepare('SELECT id, full_name, description, github, linkedin, instagram, email, website, cv FROM people ORDER BY id')
    .all() as any[]

  for (const p of people) {
    const existing = await payload.find({
      collection: 'people',
      where: { fullName: { equals: p.full_name } },
      overrideAccess: true,
    })
    if (existing.docs[0]) {
      peopleIds.set(p.id, existing.docs[0].id)
      if (existing.docs[0].photo) mediaPhotoIds.set(p.id, (existing.docs[0].photo as any).id)
      continue
    }

    // foto
    const photoPath = personPhotoPath(p.id)
    let photoId: number | undefined
    if (photoPath) {
      const photoName = path.basename(photoPath)
      const existingMedia = await payload.find({
        collection: 'media',
        where: { filename: { equals: photoName } },
        overrideAccess: true,
      })
      photoId = existingMedia.docs[0]?.id
      if (!photoId) {
        const media = await payload.create({
          collection: 'media',
          data: { alt: p.full_name },
          filePath: photoPath,
          overrideAccess: true,
        })
        photoId = media.id
      }
      mediaPhotoIds.set(p.id, photoId)
    }

    // topJobs: 3 job paling sering muncul di project_teams milik orang ini
    const jobCounts = new Map<number, number>()
    const teamIds = (
      db
        .prepare('SELECT project_team_id FROM project_teams_person_links WHERE person_id = ?')
        .all(p.id) as any[]
    ).map((r) => r.project_team_id)
    for (const tid of teamIds) {
      for (const r of db
        .prepare('SELECT job_id FROM project_teams_jobs_links WHERE project_team_id = ?')
        .all(tid) as any[]) {
        jobCounts.set(r.job_id, (jobCounts.get(r.job_id) ?? 0) + 1)
      }
    }
    const topJobs = [...jobCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([jobId]) => taxonomyIds.jobs.get(jobId))
      .filter(Boolean)

    const person = await payload.create({
      collection: 'people',
      data: {
        fullName: p.full_name,
        order: p.id,
        description: p.description,
        photo: photoId,
        topJobs,
        links: {
          github: p.github || undefined,
          linkedin: p.linkedin || undefined,
          instagram: p.instagram || undefined,
          email: p.email || undefined,
          website: p.website || undefined,
          cv: p.cv || undefined,
        },
      },
      overrideAccess: true,
    })
    peopleIds.set(p.id, person.id)
  }

  // ---------- 3. Projects ----------
  const projects = db
    .prepare('SELECT id, project_name, project_slug FROM projects ORDER BY id')
    .all() as any[]

  for (const pr of projects) {
    const slug = pr.project_slug || slugify(pr.project_name)
    const existing = await payload.find({
      collection: 'projects',
      where: { slug: { equals: slug } },
      overrideAccess: true,
    })
    if (existing.docs[0]) continue

    // gambar project
    const imgPath = projectImage(pr.id)
    let imageId: number | undefined
    if (fs.existsSync(imgPath)) {
      const imgName = path.basename(imgPath)
      const existingMedia = await payload.find({
        collection: 'media',
        where: { filename: { equals: imgName } },
        overrideAccess: true,
      })
      imageId = existingMedia.docs[0]?.id
      if (!imageId) {
        const media = await payload.create({
          collection: 'media',
          data: { alt: pr.project_name },
          filePath: imgPath,
          overrideAccess: true,
        })
        imageId = media.id
      }
    }

    // relasi taxonomy
    const catIds = (
      db.prepare('SELECT category_id FROM categories_projects_links WHERE project_id = ?').all(pr.id) as any[]
    )
      .map((r) => taxonomyIds.categories.get(r.category_id))
      .filter(Boolean)
    const prodIds = (
      db.prepare('SELECT product_id FROM products_projects_links WHERE project_id = ?').all(pr.id) as any[]
    )
      .map((r) => taxonomyIds.products.get(r.product_id))
      .filter(Boolean)

    // team: project_teams per project → { person, jobs }
    const teamEntryIds = (
      db
        .prepare('SELECT project_team_id FROM project_teams_projects_links WHERE project_id = ?')
        .all(pr.id) as any[]
    ).map((r) => r.project_team_id)

    const team: { person: number; jobs: number[] }[] = []
    for (const tid of teamEntryIds) {
      const personRow = db
        .prepare('SELECT person_id FROM project_teams_person_links WHERE project_team_id = ?')
        .get(tid) as any
      if (!personRow) continue
      const personId = peopleIds.get(personRow.person_id)
      if (!personId) continue
      const jobIds = (
        db
          .prepare('SELECT job_id FROM project_teams_jobs_links WHERE project_team_id = ?')
          .all(tid) as any[]
      )
        .map((r) => taxonomyIds.jobs.get(r.job_id))
        .filter(Boolean)
      team.push({ person: personId, jobs: jobIds })
    }

    // detail 1:1
    const detailRow = db
      .prepare('SELECT headline, description, client, year FROM project_details WHERE id = ?')
      .get(pr.id) as any

    await payload.create({
      collection: 'projects',
      data: {
        title: pr.project_name,
        slug,
        image: imageId,
        categories: catIds,
        products: prodIds,
        team,
        detail: detailRow
          ? {
              headline: detailRow.headline || undefined,
              description: detailRow.description || undefined,
              client: detailRow.client?.trim() || undefined,
              year: detailRow.year?.trim() || undefined,
            }
          : undefined,
      },
      overrideAccess: true,
    })

    console.log(`project ${pr.id}: ${pr.project_name} (team: ${team.length})`)
  }

  const counts = await Promise.all(
    (['projects', 'people', 'media', 'categories', 'products', 'jobs'] as const).map((c) =>
      payload.count({ collection: c, overrideAccess: true }).then((r) => [c, r.totalDocs])
    )
  )
  console.log('Selesai:', Object.fromEntries(counts))
  db.close()
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
