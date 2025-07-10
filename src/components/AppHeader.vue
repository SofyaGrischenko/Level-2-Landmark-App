<template>
  <div class="header">
    <h2 class="logo">Landmark</h2>
    <base-button @click="logout">Log Out</base-button>
  </div>
</template>

<script setup lang="ts">
import BaseButton from './UI/BaseButton.vue'
import { handleLogOut } from '@/services/api/auth'
import router from '@/router'

const logout = () => {
  handleLogOut()
  localStorage.removeItem('uid')
  router.push('/login')
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: var(--white-color);
  width: 100%;
  color: var(--black-color);
  box-shadow: 2px 2px 10px #919191;
  position: fixed;
  top: 0;
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
