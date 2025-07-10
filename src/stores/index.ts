import { ref } from 'vue'
import { defineStore } from 'pinia'
import { handleLogin, handleRegistration } from '@/services/api/auth'
import type { User } from '@/types/user.types'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  async function login(userData: User) {
    user.value = userData
    console.log(userData)

    const newUser = await handleLogin(userData)
    localStorage.setItem('uid', newUser.uid)
  }

  async function registration(userData: User) {
    const newUser = await handleRegistration(userData)
    localStorage.setItem('uid', newUser.uid)
    user.value = userData
  }

  return { user, login, registration }
})
