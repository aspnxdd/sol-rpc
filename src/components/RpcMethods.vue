<script setup lang="ts">
import { ref } from "vue";
import { methodStore, Methods } from "@stores/Method";
import { rpcStore } from "@stores/RPC";

const methods = ref<Methods[]>([
  "getBalance",
  "getAccountInfo",
  "getLatestBlockhash",
  "getGenesisHash",
  "getSupply",
]);
</script>

<template>
  <div>
    <h3>Methods:</h3>
    <span v-for="method in methods" v-if="rpcStore.url">
      <p @click="() => methodStore.setMethod(method)">{{ method }}</p>
    </span>
    <span v-else> Enter a valid RPC url </span>
  </div>
</template>

<style scoped>
div {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  width: 90%;
  margin-left: 1rem;
}
p {
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin: 0;
  width: 10rem;
  text-align: left;
  cursor: default;
}
code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
