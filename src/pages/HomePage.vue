<template>
  <app-header />
  <app-map />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppMap from '@/components/UI/AppMap.vue'
import { useSightsStore } from '@/stores'

const sightStore = useSightsStore()

onMounted(() => {
  sightStore.getAllSights()

})
</script>
