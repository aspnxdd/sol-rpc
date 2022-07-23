<script setup lang="ts">
import { useThemeStore } from '@stores';
import { computed } from 'vue';

const darkTheme = useThemeStore();
const color = computed(() => (!darkTheme.theme ? '#000' : '#fff'));
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    :stroke="color"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
</template>

<style scoped>
svg {
  position: relative;
  margin: 0;
  padding: 0;
}
</style>
