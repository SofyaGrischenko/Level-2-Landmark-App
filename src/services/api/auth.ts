import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore'
import { db, auth } from '@/services/firebase'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import type { User, UserPayload } from '@/types/user.types'

export const handleRegistration = async (user: UserPayload) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, user.email, user.password)

    const userRef = doc(db, 'users', userCredentials.user.uid)

    const userData: User = {
      uid: userCredentials.user.uid,
      email: user.email,
      createdAt: Timestamp.now(),
      type: 'user',
    }

    await setDoc(userRef, userData)

    return userData
  } catch (e) {
    throw e
  }
}

export const handleLogin = async (user: UserPayload) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(auth, user.email, user.password)
    const firebaseUser = userCredentials.user

    const userRef = doc(db, 'users', firebaseUser.uid)
    const userDoc = await getDoc(userRef)

    if (!firebaseUser.email) {
      throw new Error('User email is missing')
    }
    const userData = userDoc.data()
    if (!userData) throw new Error('User data not found')

    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      createdAt: userData?.createdAt,
      type: userData?.type,
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

export const handleGetMe = (): Promise<User> => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(auth, async (fbUser) => {
      removeListener()

      if (!fbUser) {
        return reject(new Error('user is not authorized'))
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', fbUser?.uid))

        if (!userDoc.exists()) {
          return reject(new Error('User not found in firestore'))
        }
        const data = userDoc.data()

        const user: User = {
          uid: fbUser.uid,
          email: fbUser.email ?? '',
          createdAt: data.createdAt as Timestamp,
          type: data.type,
        }

        resolve(user)
      } catch (e) {
        reject(e)
      }
    })
  })
}
