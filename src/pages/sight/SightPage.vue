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
      <p class="sight-rating">⭐{{ sight?.rating }}</p>
      <base-button v-if="sight?.userId === userStore.user?.uid" @click="handleEdit">
        Edit
      </base-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import AppMap from '@/components/UI/AppMap.vue'
import AppHeader from '@/components/AppHeader.vue'
import BaseButton from '@/components/UI/BaseButton.vue'
import { useSightsStore } from '@/stores/sights'
import { useUserStore } from '@/stores/user'

const router = useRouter()

const userStore = useUserStore()
const sightStore = useSightsStore()

const sight = computed(() => sightStore.currentSight)

const handleEdit = () => {
  if (sight.value) {
    router.push({ name: 'sight-editor', params: { id: sight.value.id } })
  }
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
