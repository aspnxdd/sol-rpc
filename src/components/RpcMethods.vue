<script setup lang="ts">
import { ref, watch } from "vue";
import { Methods } from "../stores/Method";
import { useRpcStore, useMethodsStore } from "@stores";
import { debounce } from "@lib/utils";
const rpcStore = useRpcStore();
const methodStore = useMethodsStore();
const methods = ref<Methods[]>([
  "getVersion",
  "getBalance",
  "getAccountInfo",
  "getLatestBlockhash",
  "getGenesisHash",
  "getSupply",
  "getBlock",
  "getBlockHeight",
  "getBlockProduction",
  "getBlockSignatures",
  "getClusterNodes",
  "getEpochInfo",
  "getEpochSchedule",
  "getFeeForMessage",
  "getFirstAvailableBlock",
  "getInflationGovernor",
  "getInflationReward",
  "getSignatureStatus",
  "getSignatureStatuses",
  "getSignaturesForAddress",
  "getMinimumBalanceForRentExemption",
]);
const methodsFiltered = ref<Methods[]>(methods.value);
const searchQuery = ref<string>("");

const queryFn = debounce((query: string) => {
  if (query == "") {
    methodsFiltered.value = methods.value;
    return;
  }
  methodsFiltered.value = methods.value.filter((method) =>
    method.toLowerCase().includes(query.toLowerCase())
  );
  return;
}, 300);

watch(searchQuery, queryFn);
const searchIcon = ref("&#9906;");
</script>

<template>
  <section class="container">
    <div>
      <span class="methods-container">
        <h2>Methods</h2>
        <span class="search-bar" v-if="rpcStore.url">
          <p v-html="searchIcon"></p>
          <input type="search" v-model="searchQuery" />
        </span>
      </span>
      <div class="methods">
        <span
          v-for="method in methodsFiltered"
          v-if="rpcStore.url"
          @click="() => methodStore.setMethod(method)"
        >
          <p>{{ method }}</p>
          <strong>></strong>
        </span>
        <h4 v-else>Enter a valid RPC url</h4>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  width: 30vw;
  height: 79vh;
}
.search-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3rem;
  border: 1px solid #9ca3af;
  border-radius: 0.5rem;
  background-color: #fefefe;
  padding-left: 1rem;
}
.search-bar input {
  font-size: 1.05rem;
}
.search-bar :not(input) {
  transform: rotateZ(-45deg) scale(1.9);
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.methods-container {
  display: flex;
  gap: 2rem;
  align-items: center;
}
.methods-container input {
  width: 100%;
  height: 1rem;
  padding: 0.6rem;
  border: 0;
  outline: white;
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
  height: 73vh;
  overflow-y: scroll;
}
.methods span {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-left: 1rem;
  border: #c3cbd4 1.5px solid;
}

.methods span strong {
  padding-right: 1rem;
  transform: scaleY(1.5) scaleX(0.9);
  color: rgb(5, 52, 122);
}
.methods span p {
  margin: 0;
  width: 100%;
  height: 100%;
  text-align: left;
  cursor: default;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-weight: bold;
}
.methods span:hover {
  background-color: #e1ecf7;
}
</style>
