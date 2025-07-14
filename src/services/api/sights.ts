import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import type { Sight } from '@/types/sight.types'

export const handleGetSights = async () => {
  const sights: Sight[] = []

  const querySnapshot = await getDocs(collection(db, 'sights'))

  querySnapshot.forEach((doc) => {
    const data = doc.data()
    sights.push({
      id: doc.id,
      title: data.title,
      description: data.description,
      userId: data.userId,
      createdAt: data.createdAt,
      rating: data.rating,
      latlng: data.latlng,
      img: data.img,
    })
  })

  return sights
}