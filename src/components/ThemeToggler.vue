<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { useThemeStore } from '@stores';
import { Sun, Moon } from '@components';
const darkTheme = useThemeStore();

enum Theme {
  Dark = 'dark',
  Light = 'light',
}
Object.freeze(Theme);

function toggleTheme() {
  darkTheme.theme = !darkTheme.theme;
  document.body.classList.toggle('dark-theme');
  localStorage.setItem(
    'sol-rpc-theme',
    darkTheme.theme ? Theme.Dark : Theme.Light,
  );
}
const themeComponent = computed(() => (darkTheme.theme ? Sun : Moon));
</script>

<template>
  <Transition>
    <button @click="toggleTheme">
      <component :is="themeComponent" />
    </button>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

button {
  position: absolute;
  top: 6.8rem;
  right: 1.5rem;
  margin: 0;
  padding: 0.4rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: 1px solid var(--text-color-secondary);
  font-size: 1.2rem;
  outline: none;
  border-radius: 25%;
}
button:hover {
  background-color: var(--theme-toggler-hover);
}
</style>
