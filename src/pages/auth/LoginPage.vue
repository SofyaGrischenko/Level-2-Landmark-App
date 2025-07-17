<template>
  <div class="page-wrap">
    <dynamic-form :inputs="inputs" :title="'Sign In'" class="form" @submit="handleFormSubmit">
      <template v-slot:errors v-if="serviceError">
        <p>{{ serviceError }}</p>
      </template>
    </dynamic-form>
    <span>New to this app?</span>
    <router-link to="/registration">sign up</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import DynamicForm from '@/components/DynamicForm.vue'
import { required, isEmail, minLength } from '@/utils/validations'
import { useUserStore } from '@/stores/user'
import router from '@/router/index'
import type { Input, Form } from '@/types/form.types'

const serviceError = ref<string | null>(null)
const userStore = useUserStore()

const inputs = ref<Input[]>([
  {
    type: 'email',
    placeholder: 'Email',
    field: 'email',
    value: '',
    validations: [
      {
        rule: (val: string): boolean => required(val),
        errorMessage: 'Email is required',
      },
      {
        rule: (val: string) => isEmail(val),
        errorMessage: 'Please enter a valid email address',
      },
    ],
  },
  {
    type: 'password',
    placeholder: 'Password',
    field: 'password',
    value: '',
    validations: [
      {
        rule: (val: string) => required(val),
        errorMessage: 'Password is required',
      },
      {
        rule: (val: string) => minLength(val),
        errorMessage: 'Password must be at least 6 characters',
      },
    ],
  },
])

const handleFormSubmit = async (formData: Form) => {
  serviceError.value = null
  try {
    const { email, password } = formData
    await userStore.login({ email, password })
    router.push('/')
  } catch (error) {
    serviceError.value = error as string
    console.error(error)
  }
}

watch(
  inputs,
  () => {
    serviceError.value = null
  },
  { deep: true },
)
</script>

<style scoped>
.page-wrap {
  width: 100%;
  height: 100vh;
  background-color: var(--button-text-color);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
