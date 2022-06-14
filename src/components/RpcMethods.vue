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
  <div class="container">
    <div>
      <h3>Methods:</h3>
      <div class="methods">
        <span v-for="method in methods" v-if="rpcStore.url">
          <p @click="() => methodStore.setMethod(method)">{{ method }}</p>
          <strong>></strong>
        </span>
        <h4 v-else>Enter a valid RPC url</h4>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  height: 100%;
  width: 30vw;
  height: 79vh;
}
.container > div {
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  width: 90%;
}
.methods {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
span {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-left: 1rem;
  border: #e1ecf7 1.5px solid;
}

span strong {
  padding-right: 1rem;
  transform: scaleY(1.5) scaleX(0.9);
  color: rgb(5, 52, 122);
}
span p {
  margin: 0;
  width: 100%;
  text-align: left;
  cursor: default;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-weight: bold;
}
</style>
