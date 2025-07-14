<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import L, { Map as LeafletMap } from 'leaflet'
import { useSightsStore } from '@/stores'
import 'leaflet/dist/leaflet.css'

const sightStore = useSightsStore()
const currentUserId = localStorage.getItem('uid')

const mapContainer = ref<HTMLDivElement | null>(null)
const map = ref<L.Map | null>(null)
const markerLayer = L.layerGroup()

const greenIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const yellowIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

watch(
  () => sightStore.sights,
  (newMarkers) => {
    markerLayer.clearLayers()

    newMarkers?.forEach((marker) => {
      const popupContent = `
      <div class="popup-header">
        <h3 class=popup-title>${marker.title}</h3>
      </div>
      <div class="popup-body">
        <img src="${marker.img[0]}" alt="${marker.description}" class="popup-photo"/>
        <p class="popup-rating">⭐${marker.rating}</p>
      </div>
      `

      L.marker(marker.latlng, { icon: marker.userId == currentUserId ? greenIcon : yellowIcon })
        .addTo(map.value as LeafletMap)
        .bindPopup(popupContent, { className: 'popup' })
    })
  },
  { deep: true, immediate: true },
)

onMounted(() => {
  if (mapContainer.value) {
    map.value = L.map(mapContainer.value).setView([53.902284, 27.561831], 10)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map.value as LeafletMap)

    markerLayer.addTo(map.value as LeafletMap)
  }
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 93vh;
  top: 7vh;
}

:deep(.popup .leaflet-popup-content-wrapper) {
  max-width: 250px;
  background: var(--background-color);
  border-radius: 10px;
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4);
  padding: 0;
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
