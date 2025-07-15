<template>
  <div class="page-wrap">
    <app-header />
    <app-map is-interactive class="map" @map-click="handleMapClick" />
    <dynamic-form :inputs="inputs" title="Sight" class="form task-form" @submit="handleSubmit" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Timestamp } from 'firebase/firestore'
import AppMap from '@/components/UI/AppMap.vue'
import AppHeader from '@/components/AppHeader.vue'
import DynamicForm from '@/components/DynamicForm.vue'
import { useSightsStore, useUserStore } from '@/stores'
import { maxLength, required } from '@/utils/validations'
import type { LatLng } from 'leaflet'
import type { SightPayload } from '@/types/sight.types'
import type { Form, Input } from '@/types/form.types'

const sightStore = useSightsStore()
const userStore = useUserStore()
const newCoords = ref<LatLng>()

const currentUser = userStore.user?.uid

const inputs = ref<Input[]>([
  {
    type: 'text',
    placeholder: 'Title',
    field: 'title',
    value: '',
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
    value: '',
  },
  {
    type: 'file',
    placeholder: 'Your photo',
    field: 'img',
    value: '',
  },

  {
    type: 'number',
    placeholder: 'Rating',
    field: 'rating',
    value: '',
  },
])

const handleSubmit = (formData: Form) => {
  if (currentUser && newCoords.value) {
    const newSight: SightPayload = {
      title: formData.title,
      description: formData.description,
      userId: currentUser,
      createdAt: Timestamp.now(),
      rating: formData.rating,
      latlng: {
        lat: newCoords.value.lat,
        lng: newCoords.value.lng,
      },
      img: formData.img,
    }

    sightStore.createsight(newSight)
  } else {
    throw new Error('Cannot create new sight')
  }
}

const handleMapClick = (coords: LatLng) => {
  newCoords.value = coords
}
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
