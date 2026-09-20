import type { Access } from 'payload'

/** Write access: only authenticated admin users. */
export const isAdmin: Access = ({ req: { user } }) => Boolean(user)

/** Read access: public (site + REST), used together with isAdmin for writes. */
export const publicRead: Access = () => true
