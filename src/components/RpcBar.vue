<script setup lang="ts">
import { Connection } from "@solana/web3.js";
import { rpcStore } from "@stores/RPC";
import { computed, ref } from "vue";
const rpc = ref<string>(rpcStore.url);
const error = ref(false);
async function isRpcEndpointValid() {
  try {
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
      if (res) {
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
  <span v-if="error"> Invalid RPC endpoint</span>

  <span v-else> RPC url: {{ rpcStore.url }}</span>
  <input
    type="text"
    v-model="rpc"
    placeholder="https://api.devnet.solana.com/"
  />
  <button @click="() => setRpcUrl">Set</button>
</template>

<style scoped>
* {
  position: relative;
  display: flex;
  width: 90%;
  margin-left: 1rem;
}
button {
  width: fit-content;
  background-color: cornflowerblue;
  margin-top: 1rem;
  padding: 0.4rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgb(45, 90, 173);
  transition: all 0.2s ease-in-out;
  font-family: "Roboto", sans-serif;
}
button:hover {
  background-color: rgb(155, 180, 226);
}
</style>
