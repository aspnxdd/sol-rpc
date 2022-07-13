<script setup lang="ts">
import { RpcMethods } from '@lib/rpcMethods';
import { RpcError } from '@lib/types';
import { castToDesiredType } from '@lib/utils';
import { PerfSample } from '@solana/web3.js';
import { useRpcStore } from '@stores';
import { ref, watch, computed } from 'vue';

const rpcStore = useRpcStore();
const averageTps = ref<null | number>(null);
const MIN_TPS = 2500;

async function getNetworkPerformance() {
  const samples = await new RpcMethods(
    rpcStore.url!,
  ).getRecentPerformanceSamples();
  if (castToDesiredType<PerfSample[], RpcError>(samples)) {
    const tpsList = samples.reduce((acc, sample) => {
      const tps = sample.numTransactions / sample.samplePeriodSecs;
      return acc + tps;
    }, 0);
    averageTps.value = tpsList / samples.length;
  }
}
watch(rpcStore, () => {
  getNetworkPerformance();
});
const tps = computed(() => averageTps.value?.toFixed() ?? 'N/A');
const networkPerformanceText = computed(() =>
  averageTps.value && averageTps?.value > MIN_TPS ? '' : '⚠️',
);
</script>

<template>
  <Transition>
    <span class="connected" v-if="rpcStore.url">
      ⚪ RPC url: {{ rpcStore.url }}
      <p>
        ⚡Network performance: {{ networkPerformanceText
        }}<text>{{ tps }} TPS</text>
      </p>
    </span>
    <span v-else> ⛔ Not connected </span>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

span {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  gap: 2rem;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  color: white;
  min-height: 2rem;
  background-color: #801111;
  font-weight: bold;
  margin: 0;
  padding: 0;
}
span p {
  margin: 0.4rem;
  padding: 0;
}
span p text {
  color: rgb(255, 255, 0);
}
span.connected {
  background-color: #0f8000;
}
</style>
