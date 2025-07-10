<template>
  <div class="page-wrap">
    <dynamic-form :inputs="inputs" @submit="submitForm" :title="'Sign up'" class="form">
      <template v-slot:errors v-if="serviceError">
        <p>{{ serviceError }}</p>
      </template>
    </dynamic-form>
    <span>Already have an account?</span>
    <router-link to="/login">sign in</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import DynamicForm from '@/components/DynamicForm.vue'
import { registration } from '@/services/api/auth'
import { required, minLength, isEmail, isSame } from '@/utils/validations'
import type { Form, Input } from '@/types/form.types'

const serviceError = ref(null)

const inputs = ref<Input[]>([
  {
    type: 'email',
    placeholder: 'Email',
    field: 'email',
    value: '',
    validations: [
      {
        rule: (val: string) => required(val),
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
  {
    type: 'password',
    placeholder: 'Confirm password',
    field: 'passwordConfirm',
    value: '',
    validations: [
      {
        rule: (val: string) => required(val),
        errorMessage: 'Comfirm password is required',
      },
      {
        rule: (val: string) => minLength(val),
        errorMessage: 'Comfirm password must be at least 6 characters',
      },
      {
        rule: (val: string): boolean => isSame(val, password.value),
        errorMessage: 'Passwords are not the same',
      },
    ],
  },
])
const password = ref('')

const submitForm = async (formData: Form) => {
  serviceError.value = null
  try {
    const { email, password } = formData
    const user = await registration({ email, password })
    localStorage.setItem('uid', user.uid)

    // this.$store.commit('setUser', user)
    // this.$router.push('/')
  } catch (error) {
    if (typeof error === null) {
      serviceError.value = error as null
    }
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
