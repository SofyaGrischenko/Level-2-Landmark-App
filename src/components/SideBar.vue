<template>
  <transition name="fade">
    <div v-if="isOpen" class="overlay" @click="$emit('close-sidebar')"></div>
  </transition>
  <transition name="slide-fade">
    <div v-if="isOpen" class="sidebar" @scroll="handleScroll">
      <div class="sidebar-header">
        <h3>Rating</h3>
        <base-button class="close-btn" @click="$emit('close-sidebar')">&times;</base-button>
      </div>

      <ul class="sidebar-list">
        <li v-for="sight in visibleSights" :key="sight.id" @click="handleSightClick(sight)">
          <h4>{{ sight.title }}</h4>
          <span>{{ calcRatingScore(sight.rating) }}</span>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BaseButton from './UI/BaseButton.vue'
import { handleGetSights } from '@/services/api/sights'
import { calcRatingScore } from '@/utils/rating'
import { useRouter } from 'vue-router'
import type { Sight } from '@/types/sight.types'

const router = useRouter()
const { isOpen } = defineProps<{ isOpen: boolean }>()
defineEmits<{ (e: 'close-sidebar'): void }>()

const sights = ref<Sight[]>([])
const visibleSights = ref<Sight[]>([])
const pageSize = 15
const currentPage = ref(1)

const handleSightClick = (sight: Sight) => {
  router.push({ name: 'sight', params: { id: sight.id } })
}

const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement

  if (target.scrollTop + target.clientHeight >= target.scrollHeight - 50) {
    updateVisibleSights()
  }
}

const updateVisibleSights = () => {
  const data = sights.value.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize)
  if (data.length !== 0) {
    visibleSights.value.push(...data)
    currentPage.value += 1
  }
}

const initSights = async () => {
  sights.value = await handleGetSights()
  updateVisibleSights()
}

onMounted(() => initSights())
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 35%;
  height: 100%;
  background-color: var(--background-color);
  box-shadow: 1px 0px 15px #0000;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: scroll;
}

.sidebar-header {
  padding: 3%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-color);
  font-size: 1.5rem;
  font-size: 1.7rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  border-bottom: 4px dashed var(--button-text-color);
}

.sidebar-header h3 {
  font-weight: 600;
}

.close-btn {
  width: 30px;
  background: none;
  border: none;
  font-size: 3rem;
  cursor: pointer;
  color: var(--black-color);
  opacity: 0.5;
}

.close-btn:hover {
  opacity: 1;
}

.sidebar-list li {
  padding: 15px 10px;
  font-size: 1.5rem;
  font-weight: 500;
  border-bottom: 1px solid var(--button-text-color);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  gap: 5px;
  color: var(--text-color);
}

.sidebar-list li:hover {
  color: var(--accent-color);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: transform 0.3s ease-out;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
}
.slide-fade-enter-to,
.slide-fade-leave-from {
  transform: translateX(0);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #0000004d;
  z-index: 1000;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
