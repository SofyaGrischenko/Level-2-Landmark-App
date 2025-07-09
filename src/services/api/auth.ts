import { doc, setDoc } from 'firebase/firestore'
import { db, auth } from '@/services/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import type { User } from '@/types/user.types'

export const registration = async (user: User) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, user.email, user.password)

    await setDoc(doc(db, 'users', userCredentials.user.uid), {
      uid: userCredentials.user.uid,
      email: user.email,
      createdAt: new Date(),
    })

    return userCredentials.user
  } catch (e) {
    throw new Error(e as string)
  }
}
