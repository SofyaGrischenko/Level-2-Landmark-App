<template>
  <div class="header">
    <h2 class="logo">Landmark</h2>
    <div class="center-action">
      <base-button v-if="$route.name === 'home'" @click="newSight"> New Sight </base-button>
      <base-button
        v-else-if="$route.name === 'sight-editor' || $route.name === 'sight'"
        @click="goBack"
      >
        Go back
      </base-button>
    </div>
    <base-button @click="logout">Log Out</base-button>
  </div>
</template>

<script setup lang="ts">
import BaseButton from './UI/BaseButton.vue'
import { useUserStore } from '@/stores/user'
import router from '@/router'

const userStore = useUserStore()

const logout = () => {
  userStore.storeLogout()
  localStorage.removeItem('uid')
  router.push({ name: 'login' })
}

const newSight = () => {
  router.push({ name: 'sight-editor', params: { id: 'new' } })
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--background-color);
  width: 100%;
  box-shadow: 2px 2px 10px rgba(145, 145, 145, 0.3);
  position: fixed;
  top: 0;
  z-index: 1000;
  box-sizing: border-box;
}

.base-button {
  min-width: 120px;
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
}

.logo {
  color: var(--text-color);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5rem;
  font-size: 1.5rem;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
  }

  .logo {
    font-size: 1rem;
    letter-spacing: 0.3rem;
  }

  .base-button {
    font-size: 1rem;
    min-width: unset;
    width: 100%;
    text-align: center;
  }
}
</style>
