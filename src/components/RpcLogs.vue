<script setup lang="ts">
import { logsStore } from "@stores/Logs";
import { ref, onUpdated, toRaw } from "vue";

function splitLog(log: any) {
  let keys = Object.keys(toRaw(log)).flat(Infinity) as string[];
  keys = keys.map((key) => {
    return `$: ${key}`;
  });
  let vals = Object.values(toRaw(log)).flat(Infinity) as string[];

  const obj = {} as any;
  keys.forEach((key, i) => {
    obj[key] = `${vals[i]}`;
  });
  console.log("obj", obj);
  return JSON.stringify(obj).slice(1, -1);
}

onUpdated(() => {
  console.log("2", toRaw(logsStore.logs));
});
</script>

<template>
  <div>
    <code class="code">
      <h3>Logs</h3>
      <span v-for="(log, i) in logsStore.logs" :key="log">
        <p>
          {{ log }}
        </p>
      </span>
    </code>
    <button @click="logsStore.clearLogs">Clear logs</button>
  </div>
</template>

<style scoped>
hr {
  margin: 0;
  border: 0;
  border-top: 1px solid rgb(92, 92, 92);
  width: 13rem;
}
h3 {
  margin: 1rem;
  text-align: left;
}
p {
  margin: 1rem;
  text-align: left;
}
div {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  width: 90%;
  margin-left: 1rem;
}

code {
  background-color: rgb(27, 26, 26);
  padding: 2px 4px;
  border-radius: 4px;
  color: #ffffff;
  width: 36rem;
  height: 50vh;
}
</style>
