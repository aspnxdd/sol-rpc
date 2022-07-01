<script setup lang="ts">
import { useRpcStore } from "@stores";
import { computed } from "@vue/reactivity";
import { ref } from "vue";
const rpcStore = useRpcStore();
const darkTheme = ref(false);
function toggleTheme() {
  darkTheme.value = !darkTheme.value;
  document.body.classList.toggle("dark-theme");
}
const themeImg = computed(() => {
  return darkTheme.value ? "./sun.svg" : "./moon.svg";
});
</script>

<template>
  <Transition>
    <span class="connected" v-if="rpcStore.url">
      ⚪ RPC url: {{ rpcStore.url }}</span
    >
    <span v-else> ⛔ Not connected </span>
  </Transition>
  <button @click="toggleTheme"><img :src="themeImg" /></button>
</template>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

span {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 2rem;
  color: white;
  background-color: #801111;
  font-weight: bold;
}
span.connected {
  background-color: #0f8000;
}
button {
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 4rem;
  background-color: transparent;
  border: none;
  font-size: 1.2rem;
}
img {
  filter: invert(100%);
  margin-top:0.3rem;
  width: 1.2rem;
}
</style>
