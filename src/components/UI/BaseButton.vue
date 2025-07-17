<template>
  <button class="base-button">
    <slot class="button-text"/>
  </button>
</template>

<style scoped>
.base-button {
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1.7rem;
  font-weight: 500;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--text-color);
  text-underline-offset: 5px;
}

.base-button:hover {
  text-decoration: underline;
}

.base-button:active {
  font-weight: 600;
}
</style>
