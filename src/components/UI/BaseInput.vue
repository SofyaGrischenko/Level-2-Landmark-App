<template>
  <div class="input-wrap">
    <input v-model="model" :type :placeholder :name class="input" />
  </div>
</template>

<script setup lang="ts">
const model = defineModel<string>()

defineProps<{
  type: string
  placeholder: string
  name: string
}>()
</script>

<style scoped>
.input-wrap {
  display: flex;
  line-height: 28px;
  align-items: center;
  position: relative;
  min-width: 230px;
}

.input {
  width: 100%;
  height: 60px;
  line-height: 25px;
  padding: 0.6rem;
  border: 2px solid transparent;
  border-radius: 8px;
  outline: none;
  background-color: #f3f3f4;
  color: var(--text-color);
  transition: 0.3s ease;
  font-weight: 300;
  font-size: 1.5em;
}

.input::placeholder {
  color: #9e9ea7;
}

.input:focus,
input:hover {
  outline: none;
  border-color: var(--button-color);
  background-color: #fff;
  box-shadow: 0 0 3px 3px rgba(28, 165, 37, 0.467);
}
</style>
