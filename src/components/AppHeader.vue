<template>
  <div class="header">
    <h2 class="logo">Landmark</h2>
    <base-button @click="newSight">new sight</base-button>
    <base-button @click="logout">Log Out</base-button>
  </div>
</template>

<script setup lang="ts">
import BaseButton from './UI/BaseButton.vue'
import { useUserStore } from '@/stores/index'
import router from '@/router'

const userStore = useUserStore()

const logout = () => {
  userStore.storeLogout()
  localStorage.removeItem('uid')
  router.push('/login')
}

const newSight = () => {
  router.push('/sightEditor')
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: var(--background-color);
  width: 100%;
  box-shadow: 2px 2px 10px #919191;
  position: fixed;
  top: 0;
  z-index: 1000;
}

.base-button {
  min-width: 150px;
}

.logo {
  color: var(--text-color);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 10px;
}
</style>
