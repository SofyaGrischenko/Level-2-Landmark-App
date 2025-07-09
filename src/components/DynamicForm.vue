<template>
  <form>
    <h1 v-if="title" class="form__title">{{ title }}</h1>
    <div v-for="(input, index) in inputs" :key="index" class="form__inputs">
      <base-input
        v-model="input.value"
        :type="input.type"
        :placeholder="input.placeholder"
        :name="input.field"
      />
    </div>
    <base-button @click.prevent="handleSubmit">submit</base-button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from './UI/BaseButton.vue'
import BaseInput from './UI/BaseInput.vue'
import type { Input, Form } from '@/types/form.types'

const { inputs } = defineProps<{
  inputs: Input[]
  title: string
}>()

const emit = defineEmits<{ submit: [value: Form<Input[]>] }>()

const formData = ref<Form<Input[]>>({})

const handleSubmit = () => {
  emit('submit', formData.value)
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form__inputs {
  width: 35vw;
}

.form__title {
  text-align: center;
  font-size: 3rem;
  font-weight: 300;
  color: var(--text-color);
}
</style>
