<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { RpcMethods, RPCMethods } from '@lib/rpcMethods';
import { getParamNames, capitalize } from '@lib/utils';
import { useRpcStore, useLogsStore, useMethodsStore } from '@stores';
import { CommitmentWithoutDeprecated } from '@lib/types';
import { useWallet } from 'solana-wallets-vue';

const rpcStore = useRpcStore();
const methodStore = useMethodsStore();
const logsStore = useLogsStore();
const walletStore = useWallet();

const args = ref<any[]>([]);
const form = ref<any[]>([]);
const inputValue = ref('');
const commitment = ref<CommitmentWithoutDeprecated>('confirmed');
const DEFAULT_RPC = 'http://localhost:8800';
function getMethodArgs() {
  const f = new RpcMethods(rpcStore.url || DEFAULT_RPC, commitment.value)[
    methodStore.method as keyof RPCMethods
  ];
  const params = getParamNames(f) as Parameters<typeof f>;
  args.value = params;
}

async function runMethod() {
  const requestLog = `⚓ Sending request to ${methodStore.method}`;
  logsStore.setLogs(requestLog);
  const f = (await new RpcMethods(rpcStore.url!, commitment.value)[
    methodStore.method as keyof RPCMethods
  ](
    // @ts-ignore
    ...form.value,
  )) as Record<string, unknown>;

  const obj = {} as Record<string, unknown>;
  for (const [index, key] of Object.keys(f).entries()) {
    obj[key] = Object.values(f)[index];
  }
  if (f.error) {
    logsStore.setLogs(`⛔ Error: ${f.error}`);
  } else {
    logsStore.setLogs(`${JSON.stringify(obj, null, 2)}`);
  }
}
watch(methodStore, () => {
  if (methodStore.method) {
    getMethodArgs();
  }
});
const buttonContent = computed(() => {
  if (!rpcStore.url) {
    return '⚠️ Connect to an RPC';
  }
  if (!methodStore.method) {
    return '🧩 Select a method';
  }
  return '🚀 Send request to RPC node';
});

const buttonDisabled = computed(() => {
  return !rpcStore.url || !methodStore.method;
});
function setWalletAddress(index: number) {
  if (walletStore.publicKey.value) {
    inputValue.value = walletStore.publicKey.value.toBase58();
    form.value[index] = walletStore.publicKey.value.toBase58();
  }
}
</script>

<template>
  <section class="container">
    <div class="args">
      <h3>METHOD: {{ methodStore.method }}</h3>
      <hr />
      <span v-for="(arg, index) in args" :key="index">
        <label for="arg" />
        <input
          id="arg"
          type="text"
          :placeholder="`Enter ${arg}`"
          :value="inputValue"
          @change="(e) => (form[index] = (e.target as HTMLInputElement)?.value)"
          :key="index"
        />
        <div class="under-input">
          <i>{{ capitalize(arg) }}</i>
          <button
            v-if="arg === 'address'"
            @click="() => setWalletAddress(index)"
            class="wallet-address"
          >
            Use wallet address
          </button>
        </div>
      </span>
      <div>
        <h4>Commitment</h4>
        <div v-for="commitmentOpt in ['confirmed', 'finalized', 'processed']">
          <input
            @change="() => (commitment = commitmentOpt)"
            type="radio"
            :id="commitmentOpt"
            :name="commitmentOpt"
            class="commitment"
            :checked="commitment === commitmentOpt"
          />
          <label :for="commitmentOpt">{{ commitmentOpt }}</label
          ><br />
        </div>
      </div>
      <button @click="runMethod" :disabled="buttonDisabled">
        {{ buttonContent }}
      </button>
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
  height: 100%;
  width: 30vw;
  height: 79vh;
  padding-left: 1rem;
}
.args {
  width: 100%;
}
.args .under-input {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
input {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
}
hr {
  margin: 0;
  border: 0;
  border-top: 1px solid rgb(173, 173, 173);
  width: 96%;
}
h4 {
  text-align: left;
  font-size: large;
}
span {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  width: 90%;
}
span input {
  border-radius: 0.3rem;
  border: 1px solid rgb(173, 173, 173);
  padding: 0.5rem;
  width: 100%;
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
button {
  width: fit-content;
  background-color: var(--background-color-button);
  margin-top: 1rem;
  padding: 0.4rem;
  border-radius: 0.5rem;
  border: 0;
  color: whitesmoke;
  transition: all 0.2s ease-in-out;
  font-family: 'Roboto', sans-serif;
  width: 92%;
  font-weight: 700;
}
button:hover:not(:disabled) {
  background-color: var(--background-color-button-hover);
}
button:disabled {
  color: var(--color-button-disabled);
  cursor: not-allowed;
}
.commitment {
  transform: scale(1.2);
}
button.wallet-address {
  background-color: transparent;
  text-decoration: underline;
  border: 0;
  color: var(--color-button-disabled);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  width: fit-content;
  margin: 0;
  padding: 0;
}
button.wallet-address:hover {
  background-color: transparent;

  color: var(--color-button-disabled);
}
</style>
