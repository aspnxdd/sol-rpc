<script setup lang="ts">
import { ref, watch } from 'vue';
import { Methods } from '../stores/Method';
import { useMethodsStore } from '@stores';
import { debounce } from '@lib/utils';
const methodStore = useMethodsStore();
const methods = ref<Methods[]>([
  'getVersion',
  'getBalance',
  'getAccountInfo',
  'getLatestBlockhash',
  'getGenesisHash',
  'getSupply',
  'getBlock',
  'getBlockHeight',
  'getBlockProduction',
  'getBlockSignatures',
  'getClusterNodes',
  'getEpochInfo',
  'getEpochSchedule',
  'getFeeForMessage',
  'getFirstAvailableBlock',
  'getInflationGovernor',
  'getInflationReward',
  'getSignatureStatus',
  'getSignatureStatuses',
  'getSignaturesForAddress',
  'getMinimumBalanceForRentExemption',
  'getRecentPerformanceSamples',
  'getLargestAccounts',
  'getTokenLargestAccounts',
  'getMultipleAccountsInfo',
]);
const methodsFiltered = ref<Methods[]>(methods.value);
const searchQuery = ref<string>('');

const queryFn = debounce((query: string) => {
  if (query == '') {
    methodsFiltered.value = methods.value;
    return;
  }
  methodsFiltered.value = methods.value.filter((method) =>
    method.toLowerCase().includes(query.toLowerCase()),
  );
  return;
}, 300);
function setMethod(method: Methods) {
  methodStore.setMethod(method);
}
function clearSearchbar() {
  searchQuery.value = '';
}
watch(searchQuery, queryFn);
const searchIcon = ref('&#9906;');
</script>

<template>
  <section class="container">
    <div>
      <span class="methods-container">
        <h2>Methods</h2>
        <span class="search-bar">
          <p v-html="searchIcon"></p>
          <input type="search" v-model="searchQuery" />
          <button @click="clearSearchbar">&#x2715;</button>
        </span>
      </span>
      <div class="methods">
        <span
          v-for="method in methodsFiltered"
          @click="() => setMethod(method)"
          :class="{
            selected: method === methodStore.method,
          }"
        >
          <p>{{ method }}</p>
          <strong>></strong>
        </span>
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
  border-radius: 0.5rem;
  background-color: var(--background-color-input);
  padding-left: 1rem;
  border: var(--background-color-input) 1px solid;
}
.search-bar:focus-within {
  border: 1px solid #adb9bb;
}
.search-bar input {
  font-size: 1.05rem;
  margin-right: -1.3rem;
  width: 100%;
  background-color: var(--background-color-input);
  color: var(--text-color);
}

.search-bar :not(input, button) {
  transform: rotateZ(-45deg) scale(1.9);
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.search-bar button {
  background-color: transparent;
  border: 0;
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-size: 1.05rem;
  font-weight: bolder;
  transition: transform 0.2s ease-in-out;
  margin-right: 0.5rem;
  color: var(--text-color);
}
.search-bar button:hover {
  transform: rotateZ(-90deg) scale(1.1);
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
  margin-right: 1rem;
  border: var(--background-color-input) 2.3px solid;
  background-color: var(--background-color-input);
  color: var(--text-color);
  transition: all 0.05s ease-in-out;
}

.methods span strong {
  padding-right: 1rem;
  transform: scaleY(1.5) scaleX(0.9);
  color: rgb(5, 52, 122);
  color: var(--text-color);
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
.methods span:hover,
.methods span.selected {
  border: var(--text-color-secondary) 2.3px solid;
}
</style>
