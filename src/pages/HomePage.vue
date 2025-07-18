<template>
  <app-header :openSideBar />
  <app-map class="map-container" />
  <side-bar :isOpen="isOpen" @closeSidebar="closeSidebar" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppMap from '@/components/UI/AppMap.vue'
import SideBar from '@/components/SideBar.vue'
import { useSightsStore } from '@/stores/sights'

const sightStore = useSightsStore()

const isOpen = ref(false)

sightStore.getAllSights()
sightStore.clearCurrentSight()

const openSideBar = () => {
  isOpen.value = true
}

const closeSidebar = () => {
  isOpen.value = false
}
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 93vh;
  top: 7vh;
}
</style>
