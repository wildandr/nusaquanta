import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  // Akses default Payload: semua operasi butuh login admin.
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [],
}
