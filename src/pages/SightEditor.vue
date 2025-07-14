<template>
  <div class="page-wrap">
    <app-map class="map"/>
    <dynamic-form :inputs="inputs" :title="'Marker'" class="sight-form"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DynamicForm from '@/components/DynamicForm.vue'
import AppMap from '@/components/UI/AppMap.vue'
import { maxLength, required } from '@/utils/validations'
import type { Input } from '@/types/form.types'

const inputs = ref<Input[]>([
  {
    type: 'text',
    placeholder: 'title',
    field: 'title',
    value: '',
    validations: [
      {
        rule: (val: string) => required(val),
        errorMessage: 'Title cannot be empty',
      },
      {
        rule: (val: string) => maxLength(val),
        errorMessage: 'Title must be less than 100 characters',
      },
    ],
  },
  {
    type: 'textarea',
    placeholder: 'Add a description',
    field: 'description',
    value: '',
    validations: [],
  },
])
</script>

<style scoped>
.page-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  height: 100vh;
  width: 100vw;
}

.task-form {
  min-height: 70vh;
}

.map{
  width: 30vw;
  height: 50vh;
  border-radius: 40px;
}
</style>
