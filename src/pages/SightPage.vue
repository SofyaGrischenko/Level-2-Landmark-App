<template>
  <app-header/>
  <div class="page-wrap">
    <div class="sight-map">
      <app-map class="map" />
    </div>

    <div class="sight-content">
      <!-- <div class="sight-photos">
        <img 
          src="https://static.posters.cz/image/750webp/101995.webp"
        />
          <img 
          src="https://static.posters.cz/image/750webp/101995.webp"
        />

      </div> -->
      <h2>sguisrgh rguhsg ush g</h2>
      <p class="sight-description">
        Why do we use it? It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of using Lorem Ipsum is
        that it has a more-or-less normal distribution of letters, as opposed to using 'Content
        here, content here'
      </p>
      <p class="sight-rating">⭐10</p>
      <base-button>Edit</base-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppMap from '@/components/UI/AppMap.vue'
import AppHeader from '@/components/AppHeader.vue'
import BaseButton from '@/components/UI/BaseButton.vue'
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
}

.sight-rating {
  font-size: 30px;
  font-weight: 700;
  color: var(--accent-color);
}

:deep(.leaflet-container) {
  width: 80%;
  height: 80%;
}
</style>
