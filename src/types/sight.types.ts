import type { Timestamp } from 'firebase/firestore'

export interface SightPayload {
  title: string
  description: string
  userId: string
  createdAt: Timestamp
  rating: Rating[]
  latlng: {
    lat: number
    lng: number
  }
  img: string
}

export interface Sight extends SightPayload {
  id: string
}

export interface Rating {
  userId: string
  value: number
}
