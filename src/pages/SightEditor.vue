<template>
  <div class="page-wrap">
    <app-map class="map" />
    <dynamic-form :inputs="inputs" :title="'Sight'" class="form task-form" />
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
    placeholder: 'Title',
    field: 'title',
    value: '',
    validations: [
      {
        rule: (val: string): boolean => required(val),
        errorMessage: 'Title is required',
      },
      {
        rule: (val: string): boolean => maxLength(val),
        errorMessage: 'Title is too long',
      },
    ],
  },

  {
    type: 'textarea',
    placeholder: 'Description...',
    field: 'description',
    value: '',
    validations: [],
  },
  {
    type: 'file',
    placeholder: 'Your photo',
    field: 'SightImg',
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
  gap: 10vh;
}

.task-form {
  min-height: 70vh;
  width: fit-content;
}

.map {
  width: 30vw;
  height: 50vh;
  border-radius: 40px;
}

@media (max-width: 800px) {
  .page-wrap {
    flex-direction: column;
    gap: 5vh;
    height: auto;
    padding: 20px 0;
  }

  .map {
    width: 80vw;
    height: 40vh;
    margin-bottom: 5vh;
  }

  .task-form {
    width: 100%;
    min-height: auto;
    justify-content: center;
    align-items: center;
  }
}
</style>
