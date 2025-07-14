import { ref } from 'vue'
import { defineStore } from 'pinia'
import { handleLogin, handleLogOut, handleRegistration } from '@/services/api/auth'
import { handleGetSights } from '@/services/api/sights'
import type { User, UserPivot } from '@/types/user.types'
import type { Sight } from '@/types/sight.types'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  const setUser = (userDate: User) => {
    user.value = userDate
    localStorage.setItem('uid', userDate.uid)
  }

  const clearUser = () => {
    user.value = null
    localStorage.removeItem('uid')
  }

  const login = async (userData: UserPivot) => {
    const data = await handleLogin(userData)
    setUser(data)
  }

  const registration = async (userData: UserPivot) => {
    const data = await handleRegistration(userData)
    setUser(data)
  }

  const storeLogout = async () => {
    await handleLogOut()
    clearUser()
  }

  return { user, login, registration, storeLogout }
})

export const useSightsStore = defineStore('sight', () => {
  const sights = ref<Sight[] | null>(null)

  const setAllSights = (sightsData: Sight[]) => {
    sights.value = sightsData
  }

  const getAllSights = async () => {
    const data = await handleGetSights()

    setAllSights(data)
  }

  return { sights, getAllSights }
})
