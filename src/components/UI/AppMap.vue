<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import L, { Map as LeafletMap } from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface Marker {
  id: number
  latlng: [number, number]
  img: string[]
  title: string
  description: string
}

const mapContainer = ref<HTMLDivElement | null>(null)
const map = ref<L.Map | null>(null)
const markers = ref<Marker[]>([])
const markerLayer = L.layerGroup()

const loadMarkers = () => {
  markers.value = [
    {
      id: 1,
      latlng: [53, 27],
      img: [
        'data:image/jpeg;base64,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',
      ],
      title: 'test',
      description: 'test description',
    },
    {
      id: 2,
      latlng: [57, 23],
      img: ['img'],
      title: 'test2',
      description: 'description 2',
    },
    {
      id: 3,
      latlng: [53.203, 23],
      img: ['img'],
      title: 'test 3',
      description: 'description 3',
    },
  ]
}

watch(
  markers,
  (newMarkers) => {
    markerLayer.clearLayers()

    newMarkers.forEach((marker) => {
      const popupContent = `
      <div>
        <p>${marker.title}</p>
        <img src="${marker.img[0]}" alt="${marker.description}" style="width:150px; height:auto; border-radius: 5px;" />
      </div>`
      L.marker(marker.latlng)
        .addTo(map.value as LeafletMap)
        .bindPopup(popupContent)
    })
  },
  { deep: true },
)

onMounted(() => {
  if (mapContainer.value) {
    map.value = L.map(mapContainer.value).setView([53.902284, 27.561831], 10)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map.value as LeafletMap)

    markerLayer.addTo(map.value as LeafletMap)

    loadMarkers()
  }
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 93vh;
  top: 7vh;
}

:deep(.leaflet-top) {
  top: 100px;
}
</style>
