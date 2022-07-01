<script setup lang="ts">
import { useRpcStore } from "@stores";
const rpcStore = useRpcStore();
</script>

<template>
  <Transition>
    <span class="connected" v-if="rpcStore.url">
      ⚪ RPC url: {{ rpcStore.url }}</span
    >
    <span v-else> ⛔ Not connected </span>
  </Transition>
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
</style>
