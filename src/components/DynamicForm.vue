<template>
  <form>
    <h1 v-if="title" class="form__title">{{ title }}</h1>
    <div class="form__error-wrapper">
      <p v-if="currentErrors?.length || slots.errors" class="form__error">
        {{ currentErrors[0] }}
        <slot name="errors" />
      </p>
    </div>
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
import { ref, useSlots, watch } from 'vue'
import BaseButton from './UI/BaseButton.vue'
import BaseInput from './UI/BaseInput.vue'
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
  /* height: 10vh; */
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

/* .sight-form{

} */
</style>
