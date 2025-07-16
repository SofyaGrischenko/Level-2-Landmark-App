import { ref } from 'vue'
import { defineStore } from 'pinia'
import { handleGetMe, handleLogin, handleLogOut, handleRegistration } from '@/services/api/auth'
import type { User, UserPayload } from '@/types/user.types'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  const setUser = (userData: User) => {
    user.value = userData
    localStorage.setItem('uid', userData.uid)
  }

  const clearUser = () => {
    user.value = null
    localStorage.removeItem('uid')
  }

  const login = async (userData: UserPayload) => {
    try {
      const data = await handleLogin(userData)
      setUser(data)
    } catch (e) {
      throw e
    }
  }

  const registration = async (userData: UserPayload) => {
    try {
      const data = await handleRegistration(userData)
      setUser(data)
    } catch (e) {
      throw e
    }
  }

  const storeLogout = async () => {
    await handleLogOut()
    clearUser()
  }

  const fetchUser = async (): Promise<void> => {
    try {
      const data = await handleGetMe()
      setUser(data)
    } catch (e) {
      throw e
    }
  }

  return { user, login, registration, storeLogout, fetchUser }
})
