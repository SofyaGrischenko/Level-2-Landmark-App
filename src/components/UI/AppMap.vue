<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import L, { LatLng, Map as LeafletMap } from 'leaflet'
import { createPopup, yellowIcon, greenIcon } from '@/utils/map'
import { useSightsStore } from '@/stores/sights'
import { useUserStore } from '@/stores/user'
import type { Sight } from '@/types/sight.types'
import 'leaflet/dist/leaflet.css'

const { isInteractive, isSightPage } = defineProps<{
  isInteractive?: boolean
  isSightPage?: boolean
}>()

const emit = defineEmits<{ (e: 'map-click', payload: LatLng): void }>()

const router = useRouter()

const sightStore = useSightsStore()
const userStore = useUserStore()

const markerLayer = L.layerGroup()
let tempMarker: L.Marker | null = null

const mapContainer = ref<HTMLDivElement | null>(null)
const map = ref<L.Map | null>(null)
const currentUserId = computed(() => userStore.user?.uid)

const initMap = () => {
  if (mapContainer.value) {
    map.value = L.map(mapContainer.value).setView([53.902284, 27.561831], 10)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map.value as LeafletMap)

    markerLayer.addTo(map.value as LeafletMap)

    if (isInteractive) enableMapInteractions()

    if (isSightPage) {
      displaySingleSight()
    }
  }
}

const displaySingleSight = () => {
  const currentSight = sightStore.currentSight
  if (!map.value || !currentSight) return

  markerLayer.clearLayers()

  const marker = newMarker(currentSight)
  marker.addTo(map.value as LeafletMap)

  map.value.setView(currentSight.latlng, 15)
}

const enableMapInteractions = () => {
  map.value?.on('click', (e) => {
    const coords = e.latlng
    if (tempMarker) {
      tempMarker.setLatLng(coords)
    } else {
      tempMarker = L.marker(coords).addTo(map.value as LeafletMap)
    }
    emit('map-click', coords)
  })
}

const newMarker = (marker: Sight) => {
  const markerInstance = L.marker(marker.latlng, {
    icon: marker.userId == currentUserId.value ? greenIcon : yellowIcon,
  })

  markerInstance.bindPopup(createPopup(marker), { className: 'popup' }).on('popupopen', () => {
    const popupEl = markerInstance.getPopup()?.getElement()
    popupEl?.addEventListener('click', () => {
      handleMarkerClick(marker)
    })
  })

  return markerInstance
}

const handleMarkerClick = (sight: Sight) => {
  sightStore.setCurrentSight(sight)
  router.push({ name: 'sight', params: { id: sight.id } })
}

const displayMarkers = (newMarkers: Sight[]) => {
  if (!map.value || !newMarkers) return

  markerLayer.clearLayers()

  newMarkers?.forEach((marker) => {
    newMarker(marker).addTo(map.value as LeafletMap)
  })
}

watch(
  [() => sightStore.sights, () => userStore.user],
  () => {
    displayMarkers(sightStore.sights as Sight[])
  },
  { deep: true },
)

onMounted(() => initMap())
</script>

<style scoped>
:deep(.popup .leaflet-popup-content-wrapper) {
  max-width: 250px;
  background: var(--background-color);
  border-radius: 10px;
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4);
  padding: 0;
  cursor: pointer;
}

:deep(.popup .leaflet-popup-content) {
  margin: 0;
  padding: 0;
}

:deep(.popup .leaflet-popup-tip-container) {
  width: 30px;
  height: 15px;
}

:deep(.popup .leaflet-popup-tip) {
  background: var(--background-color);
}

:deep(.popup-header) {
  padding: 12px 15px;
  border-bottom: 2px dashed var(--accent-color);
}

:deep(.popup-title) {
  font-size: 1.3em;
  font-weight: 600;
  margin: 0;
  color: var(--text-color);
}

:deep(.popup-body) {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

:deep(.popup-photo) {
  width: 100%;
  height: 100px;
  min-width: 150px;
  object-fit: cover;
  border-radius: 5px;
}

:deep(.popup-rating) {
  font-size: 1em;
  font-weight: 600;
  margin: 0;
  align-self: center;
  background-color: var(--text-color);
  padding: 3px 8px;
  border-radius: 12px;

  color: var(--accent-color);
}

:deep(.leaflet-top) {
  top: 100px;
}
</style>
