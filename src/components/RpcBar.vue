<script setup lang="ts">
import { Connection } from "@solana/web3.js";
import { useRpcStore } from "@stores";

import { computed, ref } from "vue";

const rpcStore = useRpcStore();
const rpc = ref<string | null>(rpcStore.url);
const error = ref(false);
async function isRpcEndpointValid() {
  try {
    if (!rpc.value) return false;
    const connection = new Connection(rpc.value);
    await connection.getLatestBlockhash();
    return true;
  } catch (e) {
    console.error(e);
    console.log("err");
    return false;
  }
}

const setRpcUrl = computed(() => {
  console.log("set");
  isRpcEndpointValid()
    .then((res) => {
      if (res && rpc.value) {
        rpcStore.setUrl(rpc.value);
        error.value = false;
      } else {
        error.value = true;
      }
    })
    .catch(() => {
      error.value = true;
    });
});
</script>

<template>
  <div class="container">
    <span v-if="error"> Invalid RPC endpoint</span>

    <span v-else> RPC url: {{ rpcStore.url }}</span>
    <input
      type="text"
      v-model="rpc"
      placeholder="https://api.devnet.solana.com/"
    />
    <button @click="() => setRpcUrl">Set RPC node</button>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-left: 1rem;
  margin-top: 4rem;
}
.container input {
  width: 100%;
  border-radius: 0.5rem;
  border: #b3b6b9 1.5px solid;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}
span {
  margin-bottom: 0.5rem;
  font-weight: bold;
}
button {
  width: fit-content;
  background-color: cornflowerblue;
  margin-top: 0.5rem;
  padding: 0.4rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0.5rem;
  border: 0;
  color: whitesmoke;
  width: min(8rem, 30%);
  transition: all 0.2s ease-in-out;
  font-family: "Roboto", sans-serif;
}
button:hover {
  background-color: rgb(155, 180, 226);
}
</style>
