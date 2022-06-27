<script setup lang="ts">
import { useRpcStore } from "@stores";
import { RpcMethods } from "@lib/rpcMethods";
import { ref } from "vue";
import { castToDesiredType } from "@lib/utils";
import { RpcError, Blockhash } from "@lib/types";

const rpcStore = useRpcStore();
const rpc = ref<string | null>(rpcStore.url);
const lastBlockhash = ref<number | null>(null);
const error = ref(false);

async function isRpcEndpointValid() {
  try {
    if (!rpc.value) return false;
    const connection = new RpcMethods(rpc.value);
    console.log("connection", connection.connection.rpcEndpoint);

    const blockhash = await connection.getLatestBlockhash();
    console.log("blockhash", blockhash);
    if (castToDesiredType<Blockhash, RpcError>(blockhash)) {
      lastBlockhash.value = blockhash.lastValidBlockHeight;
    }
    if(lastBlockhash.value) {
      return true;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
}

const setRpcUrl = async () => {
  try {
    const res = await isRpcEndpointValid();
    if (!res) {
      rpcStore.setUrl(null);
      error.value = true;
      return;
    }
    rpcStore.setUrl(rpc.value);
    error.value = false;
  } catch (err) {
    rpcStore.setUrl(null);

    error.value = true;
  }
};
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
    <div>
      <button @click="setRpcUrl">Set RPC node</button>
      <span v-if="lastBlockhash"
        >&#10064; Last reported block: {{ lastBlockhash }}</span
      >
    </div>
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
.container > div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 1rem;
  gap: 2rem;
}
.container input {
  width: 100%;
  border-radius: 0.5rem;
  border: #b3b6b9 1.5px solid;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}
.container > div > span {
  margin-top: 0.5rem;
  font-size: medium;
  font-weight: bold;
}
.container > span {
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
