import type { CollectionConfig } from 'payload'

import { isAdmin, publicRead } from '../access/index.ts'

export const People: CollectionConfig = {
  slug: 'people',
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: publicRead,
    update: isAdmin,
  },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'order', 'email'],
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Urutan tampil di site (1 = pertama).',
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'topJobs',
      type: 'relationship',
      hasMany: true,
      relationTo: 'jobs',
      admin: {
        description: 'Peran utama (maks 3 ditampilkan di hero project).',
      },
    },
    {
      type: 'group',
      name: 'links',
      fields: [
        { name: 'github', type: 'text' },
        { name: 'linkedin', type: 'text' },
        { name: 'instagram', type: 'text' },
        { name: 'email', type: 'text' },
        { name: 'website', type: 'text' },
        { name: 'cv', type: 'text', admin: { description: 'URL file CV.' } },
      ],
    },
  ],
}
