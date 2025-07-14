import type { Timestamp } from 'firebase/firestore'

export interface Sight {
  id: string
  title: string
  description: string
  userId: string
  createdAt: Timestamp
  rating: number
  img: string[]
}
