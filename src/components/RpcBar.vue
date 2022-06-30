<script setup lang="ts">
import { useRpcStore } from "@stores";
import { RpcMethods } from "@lib/rpcMethods";
import { ref, computed } from "vue";
import { castToDesiredType, parseTime } from "@lib/utils";
import { RpcError, Blockhash } from "@lib/types";
import { Version, EpochInfo } from "@solana/web3.js";

const rpcStore = useRpcStore();
const rpc = ref<string | null>(rpcStore.url);
const lastBlockhash = ref<number | null>(null);
const version = ref<null | string>(null);
const error = ref(false);
const epochPercentage = ref(0);

async function isRpcEndpointValid() {
  try {
    if (!rpc.value) return false;
    const connection = new RpcMethods(rpc.value);
    console.log("connection", connection.connection.rpcEndpoint);

    const blockhash = await connection.getLatestBlockhash();
    version.value = ((await connection.getVersion()) as Version)["solana-core"];
    if (castToDesiredType<Blockhash, RpcError>(blockhash)) {
      lastBlockhash.value = blockhash.lastValidBlockHeight;
    }
    const epochInfo = await connection.getEpochInfo();

    if (castToDesiredType<EpochInfo, RpcError>(epochInfo)) {
      epochPercentage.value = Number(
        ((epochInfo.slotIndex / epochInfo.slotsInEpoch) * 100).toFixed(1)
      );
    }
    if (lastBlockhash.value) {
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

const epochETA = computed(() => {
  const eta = (10 / 3) * 24 - epochPercentage.value * 0.8;
  return parseTime(eta);
});
</script>

<template>
  <section class="container">
    <div class="input-bar">
      <span v-if="error"> Invalid RPC endpoint</span>
      <span v-else> RPC url</span>
      <input
        type="text"
        v-model="rpc"
        placeholder="https://api.devnet.solana.com/"
      />
      <button @click="setRpcUrl">Set RPC node</button>
    </div>
    <div class="stats">
      <article v-if="lastBlockhash">
        <span>&#10064; Last reported block: </span>
        <p>{{ lastBlockhash }}</p>
      </article>
      <article v-if="version">
        <span>&#10095; Solana-core version: </span>
        <p>{{ version }}</p>
      </article>
      <article v-if="epochPercentage" class="epoch">
        <span>&#x2680; Epoch: </span>
        <div class="progress">
          <p>{{ epochPercentage }}%</p>
          <progress id="file" value="32" max="100">32%</progress>
        </div>
        <div class="eta">
          ETA
          <p>~{{ epochETA }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.container {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 90%;
  margin-left: 1rem;
  margin-top: 4rem;
}

.container .input-bar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 1rem;
}
.container .stats {
  margin-left: 00rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 1rem;
  gap: 2rem;
}
.container .stats article {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: #dfdfdf;
  padding: 1.2rem;
  border-radius: 0.5rem;
  width: 11rem;
  height: 9.5rem;
}
.container .stats article span {
  font-size: medium;
  font-weight: 400;
}
.container .stats .epoch {
  font-size: 1.2rem;
  gap: 0rem;

  font-weight: bold;
}
.container .stats .epoch .progress {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
}
.container .stats .epoch .eta {
  display: flex;
  width: 100%;
  flex-direction: row;
  gap:0.5rem;
  font-size: medium;
  font-weight: 400;
}
.container .stats .epoch .eta p {
  margin: 0;
}
.container .stats article progress {
  --padding: 0.5rem;
  width: 100%;
  padding-top: var(--padding);
  padding-bottom: var(--padding);
}
.container input {
  width: min(20rem, 60%);

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
  width: min(8rem, 60%);
  transition: all 0.2s ease-in-out;
  font-family: "Roboto", sans-serif;
}
button:hover {
  background-color: rgb(155, 180, 226);
}
</style>
