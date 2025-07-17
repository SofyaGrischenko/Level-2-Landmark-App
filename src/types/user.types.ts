import type { Timestamp } from 'firebase/firestore'

export interface UserPayload {
  email: string
  password: string
}

export type User = Omit<UserPayload, 'password'> & {
  uid: string
  createdAt: Timestamp
  type: string
}
