import type { CollectionConfig } from 'payload'

import { isAdmin, publicRead } from '../access/index.ts'

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: publicRead,
    update: isAdmin,
  },
  admin: {
    defaultColumns: ['title', 'year', 'client', 'categories'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        description: 'Slug URL. Kosongkan lalu isi manual, atau biarkan seed mengisi.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'categories',
      type: 'relationship',
      hasMany: true,
      relationTo: 'categories',
    },
    {
      name: 'products',
      type: 'relationship',
      hasMany: true,
      relationTo: 'products',
    },
    {
      name: 'team',
      type: 'array',
      fields: [
        {
          name: 'person',
          type: 'relationship',
          relationTo: 'people',
          required: true,
        },
        {
          name: 'jobs',
          type: 'relationship',
          hasMany: true,
          relationTo: 'jobs',
          admin: {
            description: 'Peran orang ini di project ini.',
          },
        },
      ],
    },
    {
      type: 'group',
      name: 'detail',
      fields: [
        { name: 'headline', type: 'text' },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Markdown. Dirender dengan ReactMarkdown di halaman project.',
          },
        },
        { name: 'client', type: 'text' },
        { name: 'year', type: 'text' },
      ],
    },
  ],
}
