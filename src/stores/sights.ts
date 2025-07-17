import { ref } from 'vue'
import { handleCreateSight, handleGetSights, handleUpdateSight } from '@/services/api/sights'
import { defineStore } from 'pinia'
import type { Sight, SightPayload } from '@/types/sight.types'

export const useSightsStore = defineStore('sight', () => {
  const sights = ref<Sight[] | null>(null)
  const currentSight = ref<Sight | null>(null)

  const setCurrentSight = (sightData: Sight) => {
    currentSight.value = sightData
  }

  const setAllSights = (sightsData: Sight[]) => {
    sights.value = sightsData
  }

  const clearCurrentSight = () => {
    currentSight.value = null
  }

  const getAllSights = async () => {
    try {
      const data = await handleGetSights()

      setAllSights(data)
    } catch (e) {
      console.error(e)
    }
  }

  const createsight = async (sight: SightPayload) => {
    try {
      await handleCreateSight(sight)
    } catch (e) {
      console.error(e)
    }
  }

  const updateTask = async (sight: Sight) => {
    try {
      await handleUpdateSight(sight)
    } catch (e) {
      console.error(e)
    }
  }

  return {
    sights,
    currentSight,
    getAllSights,
    createsight,
    setCurrentSight,
    clearCurrentSight,
    updateTask,
  }
})
