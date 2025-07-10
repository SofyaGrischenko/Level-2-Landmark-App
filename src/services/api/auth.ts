import { doc, setDoc } from 'firebase/firestore'
import { db, auth } from '@/services/firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import type { User } from '@/types/user.types'

export const handleRegistration = async (user: User) => {
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

export const handleLogin = async (user: User) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(auth, user.email, user.password)

    return userCredentials.user
  } catch (e) {
    const errorMessage = 'Login Error'
    console.log(e)
    throw new Error(errorMessage)
  }
}

export const handleLogOut = async () => {
  await signOut(auth)
}

export const handleGetMe = () => {
  return new Promise((resolve) => {
    const removeListener = onAuthStateChanged(auth, (user) => {
      removeListener()
      resolve(user)
    })
  })
}
