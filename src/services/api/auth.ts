import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore'
import { db, auth } from '@/services/firebase'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import type { User, UserPivot } from '@/types/user.types'

export const handleRegistration = async (user: UserPivot) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, user.email, user.password)

    const userRef = doc(db, 'users', userCredentials.user.uid)

    const userData: User = {
      uid: userCredentials.user.uid,
      email: user.email,
      createdAt: Timestamp.now(),
    }

    await setDoc(userRef, userData)

    return userData
  } catch (e) {
    throw new Error(e as string)
  }
}

export const handleLogin = async (user: UserPivot) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(auth, user.email, user.password)
    const firebaseUser = userCredentials.user

    const userRef = doc(db, 'users', firebaseUser.uid)
    const userDoc = await getDoc(userRef)

    if (!firebaseUser.email) {
      throw new Error('User email is missing')
    }
    const userData = userDoc.data()

    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      createdAt: userData?.createdAt,
      isAdmin: userData?.isAdmin ?? false,
    }
  } catch (e) {
    const errorMessage = 'Login Error'
    console.error(e)
    throw new Error(errorMessage)
  }
}

export const handleLogOut = async () => {
  try {
    await signOut(auth)
  } catch (e) {
    const errorMessage = 'Log out error'
    console.error(e)
    throw new Error(errorMessage)
  }
}

export const handleGetMe = () => {
  return new Promise((resolve) => {
    const removeListener = onAuthStateChanged(auth, (user) => {
      removeListener()
      resolve(user)
    })
  })
}
