<template>
  <app-header />
  <app-map class="map-container" />
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppMap from '@/components/UI/AppMap.vue'
import { useSightsStore } from '@/stores/sights'

const sightStore = useSightsStore()

sightStore.getAllSights()
sightStore.clearCurrentSight()

</script>

<style scoped>
.map-container {
  width: 100%;
  height: 93vh;
  top: 7vh;
}
</style>
