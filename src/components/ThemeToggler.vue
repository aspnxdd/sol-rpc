<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { onMounted, ref } from 'vue';
const darkTheme = ref(true);
function toggleTheme() {
  darkTheme.value = !darkTheme.value;
  document.body.classList.toggle('dark-theme');
  localStorage.setItem('sol-rpc-theme', darkTheme.value ? 'dark' : 'light');
}
const themeImg = computed(() => {
  return darkTheme.value ? './sun.svg' : './moon.svg';
});
onMounted(() => {
  const moon = new Image();
  moon.src = './moon.svg';
  const sun = new Image();
  sun.src = './sun.svg';
  const theme = localStorage.getItem('sol-rpc-theme');
  darkTheme.value = theme === 'dark';
  darkTheme.value && document.body.classList.add('dark-theme');
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
