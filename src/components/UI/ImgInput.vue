<template>
  <div
    class="image-input"
    :class="{ 'drag-over': isDragging }"
    @dragover.prevent="onDragOver"
    @dragleave.prevent="onDragLeave"
    @drop.prevent="onDrop"
  >
    <input
      type="file"
      :name="name"
      ref="fileInput"
      accept="image/*"
      class="file-input"
      @change="onFileSelected"
    />

    <div v-if="!previewImage" class="drop-zone" @click="openFileDialog">
      <p>Drag&Drop photos here</p>
    </div>
    <div v-else class="preview-container">
      <img :src="previewImage" alt="Image preview" class="preview-img" />
      <button @click.stop="removeImage" class="remove-button">X</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const previewImage = defineModel<string>()

defineProps<{ name: string }>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)

const openFileDialog = () => {
  fileInput.value?.click()
}

const onFileSelected = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    handleFile(file)
  }
}

const onDragOver = () => {
  isDragging.value = true
}

const onDragLeave = () => {
  isDragging.value = false
}

const onDrop = (event: DragEvent) => {
  isDragging.value = false
  if (event.dataTransfer && event.dataTransfer.files[0]) {
    const file = event.dataTransfer.files[0]
    handleFile(file)
  }
}

const handleFile = (file: File) => {
  if (!file.type.startsWith('image/')) {
    console.error('File is not an image.')
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    const result = e.target?.result as string
    previewImage.value = result
    emit('update:modelValue', result)
  }
  reader.readAsDataURL(file)
}

const removeImage = () => {
  previewImage.value = ''
  if (fileInput.value) fileInput.value.value = ''
  emit('update:modelValue', '')
}
</script>

<style scoped>
.image-input {
  border: 2px dashed #ccc;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  min-width: 230px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #777;
  transition:
    border-color 0.3s,
    background-color 0.3s;
  position: relative;
}

.image-input.drag-over {
  border-color: var(--text-color);
  background-color: #f0f9f0;
}

.file-input {
  display: none;
}

.drop-zone {
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.remove-button {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: #00000080;
  color: #ffff;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 1.2rem;
  line-height: 24px;
  text-align: center;
  cursor: pointer;
}
</style>
