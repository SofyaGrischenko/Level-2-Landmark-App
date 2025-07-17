<template>
  <app-header />
  <div class="page-wrap">
    <div class="sight-map">
      <app-map class="map" is-sight-page />
    </div>

    <div class="sight-content">
      <div class="sight-photos">
        <img :src="sight?.img" />
      </div>
      <h2>{{ sight?.title }}</h2>
      <p class="sight-description">
        {{ sight?.description }}
      </p>
      <div class="rating-display">
        <p class="average-rating">Average rating {{ averageRating }}</p>

        <div class="user-rating">
          <app-rating v-if="userStore.user" v-model="userRating" />
          <base-button v-if="showSubmitButton" @click="submitRating">OK</base-button>
        </div>
      </div>
      <base-button v-if="sight?.userId === userStore.user?.uid" @click="handleEdit">
        Edit
      </base-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppMap from '@/components/UI/AppMap.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppRating from '@/components/UI/AppRating.vue'
import BaseButton from '@/components/UI/BaseButton.vue'
import { useUserStore } from '@/stores/user'
import type { Rating, Sight } from '@/types/sight.types'
import { handleGetSightById, handleUpdateSightProp } from '@/services/api/sights'
import { calcRatingScore } from '@/utils/rating'

const { id } = defineProps<{ id: string }>()

const router = useRouter()

const userStore = useUserStore()

const sight = ref<Sight | null>(null)
const userRating = ref<string>('0')

let initialUserRatingValue = '0'

const averageRating = computed(() => {
  if (sight.value?.rating) {
    return calcRatingScore(sight.value.rating)
  }
  return '0'
})

const showSubmitButton = computed(() => {
  return userRating.value !== '0' && userRating.value !== initialUserRatingValue
})

const submitRating = async () => {
  if (!sight.value || !userStore.user) return

  if (!Array.isArray(sight.value?.rating)) {
    return '0'
  }

  const newRatingValue = parseInt(userRating.value, 10)
  const existingRatings = sight.value.rating || []
  const userRatingIndex = existingRatings.findIndex((r) => {
    return r.userId === userStore.user?.uid
  })
  let newRatingsArray: Rating[]

  if (userRatingIndex !== -1) {
    newRatingsArray = [...existingRatings]
    newRatingsArray[userRatingIndex] = {
      ...newRatingsArray[userRatingIndex],
      value: newRatingValue,
    }
  } else {
    newRatingsArray = [...existingRatings, { userId: userStore.user.uid, value: newRatingValue }]
  }

  initialUserRatingValue = userRating.value

  await handleUpdateSightProp(id, newRatingsArray)

  if (sight.value) {
    sight.value.rating = newRatingsArray
  }
}

const handleEdit = () => {
  if (sight.value) {
    router.push({ name: 'sight-editor', params: { id: sight.value.id } })
  }
}

const initSight = async () => {
  if (id) sight.value = await handleGetSightById(id)

  if (!sight.value || !Array.isArray(sight.value?.rating)) {
    return '0'
  }

  if (sight.value?.rating && userStore.user) {
    const ratingObj = sight.value.rating.find((r) => r.userId === userStore.user?.uid)
    userRating.value = ratingObj ? ratingObj.value.toString() : '0'
  }
}

onMounted(() => initSight())
</script>

<style scoped>
.page-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  height: 100vh;
  width: 100vw;
  background-color: var(--background-color);
  padding: 5%;
}

.sight-content {
  width: 50vw;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

h2 {
  letter-spacing: 2px;
  font-weight: 500;
  color: var(--text-color);
  text-transform: uppercase;
}

.map {
  width: 30vw;
  height: 50vh;
  border-radius: 40px;
}

.sight-map {
  width: 100vw;
  height: 100vh;
  padding-top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sight-rating {
  font-size: 30px;
  font-weight: 700;
  color: var(--accent-color);
}

.sight-photos img {
  width: 200px;
  height: 200px;
  border-radius: 20px;
  object-fit: cover;
}

.average-rating {
  font-size: 1.5rem;
  color: var(--text-color);
}

.user-rating {
  display: flex;
  gap: 5%;
}

:deep(.leaflet-container) {
  width: 80%;
  height: 80%;
}

@media (max-width: 768px) {
  .page-wrap {
    flex-direction: column;
    justify-content: center;
  }
}
</style>
