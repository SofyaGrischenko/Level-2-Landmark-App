<template>
  <div class="rating-container">
    <span class="rating-label">rating:</span>
    <div
      v-for="i in max"
      :key="i"
      @click="setRating(i)"
      @mouseHover="hoverRating(i)"
      @mouseleave="resetHover"
      :class="['star', i <= (isHovered ? hoverValue : Number(rating)) ? 'filled' : '']"
    >
      ★
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const rating = defineModel<string>({ default: '0' })
const { maxStar } = defineProps<{ maxStar?: number }>()
const isHovered = ref<boolean>(false)
const hoverValue = ref<number>(0)
const max = ref<number>(maxStar ? maxStar : 5)

const hoverRating = (rate: number) => {
  isHovered.value = true
  hoverValue.value = rate
}

const setRating = (rate: number) => {
  rating.value = rate.toString()
}

const resetHover = () => {
  isHovered.value = false
  hoverValue.value = 0
}
</script>

<style scoped>
.rating-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.star {
  font-size: 3rem;
  cursor: pointer;
  margin: 2px;
  color: #dedede;
  cursor: pointer;
  align-items: center;
}

.filled {
  color: gold;
}

.rating-label {
  font-size: 1.5rem;
  color: var(--text-color);
}
</style>
