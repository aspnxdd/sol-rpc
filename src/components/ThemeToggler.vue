<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useThemeStore } from '@stores';

const darkTheme = useThemeStore();

const moonImg = './moon.svg';
const sunImg = './sun.svg';

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
const themeImg = computed(() => {
  return darkTheme.theme ? sunImg : moonImg;
});
onMounted(() => {
  // cache images in browser
  const moon = new Image();
  moon.src = moonImg;
  const sun = new Image();
  sun.src = sunImg;
  const theme = localStorage.getItem('sol-rpc-theme');
  darkTheme.theme = theme === Theme.Dark;
  darkTheme.theme && document.body.classList.add('dark-theme');
});
</script>

<template>
  <Transition>
    <button @click="toggleTheme">
      <div>
        <img :src="themeImg" />
      </div>
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
  top: 0;
  right: 0;
  margin: 0;
  padding: 1rem;
  margin-top: 6.8rem;
  margin-right: 1.5rem;
  background-color: transparent;
  border: 1px solid var(--text-color-secondary);
  font-size: 1.2rem;
  width: 1rem;
  height: 1rem;
  outline: none;
  border-radius: 25%;
}
button:hover {
  background-color: var(--theme-toggler-hover);
}
div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
img {
  filter: invert(var(--invert-percentage));
  width: 1rem;
  height: 1rem;
}
</style>
