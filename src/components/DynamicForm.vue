<template>
  <form>
    <h1 v-if="title" class="form__title">{{ title }}</h1>
    <div class="form__error-wrapper">
      <p v-if="currentErrors?.length || slots.errors" class="form__error">
        {{ currentErrors[0] }}
        <slot name="errors" />
      </p>
    </div>
    <div class="form__inputs">
      <template v-for="(input, index) in inputs" :key="index">
        <base-input
          v-if="input.type !== 'textarea' && input.type !== 'file'"
          v-model="input.value"
          :type="input.type"
          :placeholder="input.placeholder"
          :name="input.field"
        />
        <textarea
          v-else-if="input.type === 'textarea'"
          v-model="input.value"
          :type="input.type"
          :placeholder="input.placeholder"
          :name="input.field"
          class="input"
        ></textarea>

        <img-input
          v-else-if="input.type === 'file'"
          v-model="input.value"
          :type="input.type"
          :name="input.field"
        />
      </template>
    </div>
    <base-button @click.prevent="handleSubmit">submit</base-button>
  </form>
</template>

<script setup lang="ts">
import { ref, useSlots, watch } from 'vue'
import BaseButton from './UI/BaseButton.vue'
import BaseInput from './UI/BaseInput.vue'
import ImgInput from './UI/ImgInput.vue'
import type { Input, Form } from '@/types/form.types'

const { inputs } = defineProps<{
  inputs: Input[]
  title: string
}>()

const emit = defineEmits<{ submit: [value: Form] }>()

const slots = useSlots()

const currentErrors = ref<string[]>([])

const handleSubmit = () => {
  currentErrors.value = []

  const formData = inputs.reduce((acc, input) => {
    if (input?.validations?.length) {
      for (const { rule, errorMessage } of input.validations) {
        if (rule && !rule(input.value)) {
          currentErrors.value.push(errorMessage)
        }
      }
    }
    acc[input.field] = input.value
    return acc
  }, {} as Form)

  if (!currentErrors.value.length) {
    emit('submit', formData)
  }
}

watch(
  () => inputs,
  () => (currentErrors.value = []),
  { deep: true },
)
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 25px;
  min-width: 300px;
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

.form__error-wrapper {
  justify-content: center;
  display: flex;
}

.form__error {
  max-width: 400px;
  margin: 10px;
  padding: 5px;
  border: 2px solid #d31717;
  border-radius: 12px;
  font-weight: 800;
  font-size: 20px;
  color: #ca1313;
  display: inherit;
  justify-content: center;
  align-items: center;
  text-align: center;
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

.form__inputs textarea {
  resize: none;
  max-width: 40vw;
  min-width: 230px;
  min-height: 20vh;
}
</style>
