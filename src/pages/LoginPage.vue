<template>
  <div class="page-wrap">
    <DynamicForm :inputs="inputs" class="form" :title="'Sign In'" @submit="handleFormSubmit" />
  </div>
</template>

<script setup lang="ts">
import DynamicForm from '@/components/DynamicForm.vue'
import { registration } from '@/services/api/auth'
import type { Input, Form } from '@/types/form.types'
import type { User } from '@/types/user.types'

const inputs: Input[] = [
  {
    type: 'email',
    placeholder: 'Email',
    name: 'email',
  },
  {
    type: 'password',
    placeholder: 'Password',
    name: 'password',
  },
]

const handleFormSubmit = (formData: Form<Input[]>) => {
  registration(formData as unknown as User)
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
