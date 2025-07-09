<template>
  <div class="page-wrap">
    <DynamicForm :inputs="inputs" class="form" @submit="handleFormSubmit" :title="'Sign Up'" />
  </div>
</template>

<script setup lang="ts">
import DynamicForm from '@/components/DynamicForm.vue'
import { registration } from '@/services/api/auth'
import type { Input } from '@/types/Input'
import type {User} from '@/types/user.types'

const inputs: Input[] = [
  {
    type: 'text',
    placeholder: 'Email',
    name: 'email',
  },
  {
    type: 'password',
    placeholder: 'Password',
    name: 'password',
  },
  {
    type: 'password',
    placeholder: 'Confirm password',
    name: 'confirmPassword',
  },
]

const handleFormSubmit = (formData: User) => {
  registration(formData)
  console.log('Form data:', formData)
}
</script>

<style scoped>
.page-wrap {
  width: 100%;
  height: 100vh;
  background-color: var(--button-text-color);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
