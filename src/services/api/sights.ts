import { addDoc, collection, doc, getDocs, updateDoc, getDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { compareNum } from '@/utils/rating'
import type { Sight, SightPayload, Rating } from '@/types/sight.types'

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
      rating: Array.isArray(data.rating) ? data.rating : [],
      latlng: data.latlng,
      img: data.img,
    })
  })

  return sights.sort(compareNum)
}

export const handleCreateSight = async (sight: SightPayload) => {
  try {
    await addDoc(collection(db, 'sights'), {
      title: sight.title,
      description: sight.description,
      userId: sight.userId,
      createdAt: sight.createdAt,
      rating: sight.rating,
      latlng: sight.latlng,
      img: sight.img,
    })
  } catch (e) {
    console.error(e)
  }
}

export const handleUpdateSight = async (updatedData: Sight) => {
  const docRef = doc(db, 'sights', updatedData.id)

  await updateDoc(docRef, {
    title: updatedData.title,
    description: updatedData.description,
    rating: updatedData.rating,
    latlng: updatedData.latlng,
    img: updatedData.img,
  })
}

export const handleUpdateSightProp = async (id: string, ratings: Rating[]) => {
  const docRef = doc(db, 'sights', id)

  await updateDoc(docRef, { rating: ratings })
}

export const handleGetSightById = async (id: string) => {
  const docRef = doc(db, 'sights', id)

  const data = await getDoc(docRef)

  return data.data() as Sight
}
