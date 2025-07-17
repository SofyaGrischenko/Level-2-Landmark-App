import type { Sight } from '@/types/sight.types'
import L from 'leaflet'
import { calcRatingScore } from './rating'

export const createPopup = (marker: Sight) => {
  return `
     <div class="popup-header">
        <h3 class=popup-title>${marker.title}</h3>
     </div>
     <div class="popup-body">
      <img src="${marker.img}" alt="${marker.description}" class="popup-photo"/>
        <p class="popup-rating">⭐${calcRatingScore(marker.rating)}</p>
    </div>
       `
}

export const greenIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

export const yellowIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})
