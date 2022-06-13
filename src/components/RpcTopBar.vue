<script setup lang="ts">
import { ref, onBeforeUpdate } from "vue";
import { rpcStore } from "@stores/RPC";
import { RpcMethods, RPCMethods } from "@lib/rpcMethods";
import { Connection } from "@solana/web3.js";
import { on } from "events";


</script>

<template>
  <span class="connected" v-if="rpcStore.url">
    RPC url: {{ rpcStore.url }}</span
  >
  <span v-else> Not connected </span>
</template>

<style scoped>
hr {
  margin: 0;
  border: 0;
  border-top: 1px solid rgb(92, 92, 92);
  width: 13rem;
}
h4 {
  margin: 0;
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
}
span.connected {
  background-color: #0f8000;
}
p {
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin: 0;
  width: 7rem;
  text-align: left;
}
code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
