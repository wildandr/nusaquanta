import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { isAdmin, publicRead } from '../access/index.ts'

const taxonomyAccess = {
  create: isAdmin,
  delete: isAdmin,
  read: publicRead,
  update: isAdmin,
}

/** Project categories, e.g. "Healthcare", "Event". */
export const Categories: CollectionConfig = {
  slug: 'categories',
  access: taxonomyAccess,
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    slugField({ fieldToUse: 'name' }),
  ],
}

/** Product/service types a project was built with, e.g. "Mobile Apps". */
export const Products: CollectionConfig = {
  slug: 'products',
  access: taxonomyAccess,
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    slugField({ fieldToUse: 'name' }),
  ],
}

/** Roles/occupations of team members, e.g. "Frontend Developer". */
export const Jobs: CollectionConfig = {
  slug: 'jobs',
  access: taxonomyAccess,
  admin: {
    useAsTitle: 'jobName',
  },
  fields: [
    {
      name: 'jobName',
      type: 'text',
      required: true,
    },
    slugField({ fieldToUse: 'jobName' }),
  ],
}
