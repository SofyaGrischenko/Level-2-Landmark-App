import type { Timestamp } from 'firebase/firestore'

export interface UserPivot {
  email: string
  password: string
}

export type User = Omit<UserPivot, 'password'> & {
  uid: string
  createdAt: Timestamp
  isAdmin?: boolean
}
