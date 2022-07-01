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
const isError = ref(false);
const epochPercentage = ref(0);

async function isRpcEndpointValid() {
  try {
    if (!rpc.value) return false;
    const connection = new RpcMethods(rpc.value);

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
      isError.value = true;
      return;
    }
    rpcStore.setUrl(rpc.value);
    isError.value = false;
  } catch (err) {
    rpcStore.setUrl(null);
    isError.value = true;
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
      <span v-if="isError"> Invalid RPC endpoint</span>
      <span v-else> RPC url</span>
      <div>
        <img src="/url.png" width="16" />
        <input
          type="text"
          v-model="rpc"
          placeholder="https://api.devnet.solana.com/"
        />
      </div>
      <button @click="setRpcUrl">⚡ Set RPC node</button>
    </div>
    <Transition>
      <div class="stats" v-if="lastBlockhash && version && epochPercentage">
        <article>
          <span>🟦 Last reported block: </span>
          <p>{{ lastBlockhash }}</p>
        </article>
        <article>
          <span>🟩 Solana-core version: </span>
          <p>{{ version }}</p>
        </article>
        <article class="epoch">
          <span>🌐 Epoch: </span>
          <div class="progress">
            <p>{{ epochPercentage }}%</p>
            <!-- <progress id="file" :value="epochPercentage" max="100"></progress> -->
            <div
              role="progressbar"
              class="progress-bar"
              :style="{ '--width': `${epochPercentage}%` }"
            ></div>
          </div>
          <div class="eta">
            ETA
            <p>~{{ epochETA }}</p>
          </div>
        </article>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.progress-bar {
  background-color: #adb9bb;
  width: 4rem;
  border-radius: 6px;
  position: relative;
}
.progress-bar::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: var(--width);
  height: 100%;
  border-radius: 5px;
  background-color: rgb(52, 107, 209);
}
.container {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 90%;
  margin-left: 1rem;
  margin-top: 4rem;
  height: 10rem;
}

.container .input-bar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 1rem;
}
.container .input-bar > div {
  width: min(20rem, 60%);
  height: 3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-radius: 1rem;
  gap: 1rem;
  border: var(--background-color-input) 1px solid;
  padding: 0.5rem;
  background-color: var(--background-color-input);
  color: var(--text-color);
}
.container .input-bar > div:focus-within {
  border: 1px solid #adb9bb;
}
.container .input-bar > div img {
  filter: invert(100%);
}
.container .stats {
  margin-left: 0rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
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
  background-color: var(--background-color-input);

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
  gap: 0.5rem;
  font-size: medium;
  font-weight: 400;
}
.container .stats .epoch .eta p {
  margin: 0;
}
.container .stats article div {
  --padding: 0.5rem;
  width: 100%;
  padding-top: var(--padding);
  padding-bottom: var(--padding);
}

.container input {
  width: 100%;
  border-radius: 0.5rem;
  border: var(--background-color-input) 1.5px solid;
  background-color: var(--background-color-input);
  color: var(--text-color);
  outline: none;
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
  background-color: var(--background-color-button);
  margin-top: 0.5rem;
  padding: 0.4rem;
  padding-left: 0rem;
  padding-right: 1rem;
  border-radius: 0.5rem;
  border: 0;
  color: whitesmoke;
  width: min(10rem, 60%);
  transition: all 0.2s ease-in-out;
  font-family: "Roboto", sans-serif;
  font-size: 1.05rem;
}
button:hover {
  background-color: var(--background-color-button-hover);
}
</style>
