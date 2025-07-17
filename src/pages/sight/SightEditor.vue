<template>
  <div class="page-wrap">
    <app-header />
    <app-map is-interactive is-sight-page class="map" @map-click="handleMapClick" />
    <dynamic-form
      is-sight-page
      :inputs
      :initial-rating="currentUserRating"
      title="Sight"
      class="form task-form"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Timestamp } from 'firebase/firestore'
import AppMap from '@/components/UI/AppMap.vue'
import AppHeader from '@/components/AppHeader.vue'
import DynamicForm from '@/components/DynamicForm.vue'
import { useSightsStore } from '@/stores/sights'
import { useUserStore } from '@/stores/user'
import { maxLength, required } from '@/utils/validations'
import type { LatLng } from 'leaflet'
import type { Rating, Sight, SightPayload } from '@/types/sight.types'
import type { Form, Input } from '@/types/form.types'

const sightStore = useSightsStore()
const userStore = useUserStore()

const router = useRouter()

const currentUserUid = computed(() => userStore.user?.uid)
const currentSight = computed(() => sightStore.currentSight)

const newCoords = ref<LatLng>()
const inputs = ref<Input[]>([])

const currentUserRating = computed(() => {
  if (!currentSight.value || !Array.isArray(currentSight.value.rating)) {
    return '0'
  }

  const userRating = currentSight.value.rating.find((r) => r.userId === currentUserUid.value)

  return userRating ? userRating.value.toString() : '0'
})

const initForm = () => {
  inputs.value = [
    {
      type: 'text',
      placeholder: 'Title',
      field: 'title',
      value: currentSight.value?.title || '',
      validations: [
        {
          rule: (val: string): boolean => required(val),
          errorMessage: 'Title is required',
        },
        {
          rule: (val: string): boolean => maxLength(val),
          errorMessage: 'Title is too long',
        },
      ],
    },
    {
      type: 'textarea',
      placeholder: 'Description...',
      field: 'description',
      value: currentSight.value?.description || '',
    },
    {
      type: 'file',
      placeholder: 'Your photo',
      field: 'img',
      value: currentSight.value?.img || '',
      validations: [
        {
          rule: (val: string): boolean => required(val),
          errorMessage: 'Photo is required',
        },
      ],
    },
  ]
}

const handleSubmit = (formData: Form) => {
  const updatedLat = currentSight.value?.latlng.lat || newCoords.value?.lat || 53
  const updatedLng = currentSight.value?.latlng.lng || newCoords.value?.lng || 23

  if (currentUserUid.value) {
    const newRatingValue = parseInt(formData.rating, 10)
    const existingRatings: Rating[] = Array.isArray(currentSight.value?.rating)
      ? currentSight.value.rating
      : []
    let updatedRatingsArray: Rating[] = []

    const userRatingIndex = existingRatings.findIndex((r) => {
      return r.userId === currentUserUid.value
    })

    if (userRatingIndex !== -1) {
      updatedRatingsArray = [...existingRatings] as Rating[]
      updatedRatingsArray[userRatingIndex] = {
        userId: updatedRatingsArray[userRatingIndex].userId,
        value: newRatingValue,
      }
    } else {
      updatedRatingsArray = [
        ...existingRatings,
        { userId: currentUserUid.value, value: newRatingValue },
      ] as Rating[]
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      rating: updatedRatingsArray,
      img: formData.img,
      latlng: {
        lat: updatedLat,
        lng: updatedLng,
      },
    }

    if (!currentSight.value?.id) {
      const newSight: SightPayload = {
        ...payload,
        userId: currentUserUid.value,
        createdAt: Timestamp.now(),
      }
      sightStore.createsight(newSight)
      router.push('/')
    } else {
      const updatedData: Sight = {
        ...payload,
        id: currentSight.value.id,
        userId: currentSight.value.userId,
        createdAt: currentSight.value.createdAt,
      }
      sightStore.updateTask(updatedData)
      router.push('/')
    }
  } else {
    console.error(`Cannot ${currentSight.value?.id ? 'update' : 'create'} sight`)
  }
}

const handleMapClick = (coords: LatLng) => {
  newCoords.value = coords
}

onMounted(() => initForm())
</script>

<style scoped>
.page-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  height: 100vh;
  width: 100vw;
  gap: 10vh;
  background-color: var(--background-color);
}

.task-form {
  min-height: 70vh;
  width: fit-content;
}

.map {
  width: 30vw;
  height: 50vh;
  border-radius: 40px;
}

@media (max-width: 800px) {
  .page-wrap {
    flex-direction: column;
    gap: 5vh;
    height: auto;
    padding: 20px 0;
  }

  .map {
    width: 80vw;
    height: 40vh;
    margin-bottom: 5vh;
  }

  .task-form {
    width: 100%;
    min-height: auto;
    justify-content: center;
    align-items: center;
  }
}
</style>
