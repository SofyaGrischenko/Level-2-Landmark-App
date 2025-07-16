import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import type { Sight, SightPayload } from '@/types/sight.types'

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

export const handleCreateSight = async (sight: SightPayload) => {
  console.log('api', sight)

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
