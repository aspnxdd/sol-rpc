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
  <div class="container">
    <code>
      <h3>Logs</h3>
      <span v-for="(log, i) in logsStore.logs" :key="log">
        <p v-if="log.includes('Error')" class="error">
          {{ log }}
        </p>
        <p v-else-if="log.includes('Sending request to')">
          {{ log }}
        </p>
        <p v-else>
          ✅ Node response:<pre>{{ log }}</pre>
        </p>
      </span>
    <button @click="logsStore.clearLogs">Clear logs</button>
    </code>
  </div>
</template>

<style scoped>
.container {
   margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  min-width: 39vw;
  height: 79vh;

}
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
  padding: 0.2rem;
}

p.error {
  background-color: rgba(255, 0, 0, 0.315);
  border-top: 1px solid red;
  border-bottom: 1px solid red;
}
p pre {
  margin-left:1rem;
  background-color: rgb(48, 48, 48);
  padding:0.5rem;
  border-radius: 0.5rem;
  text-overflow: clip;
  white-space: pre-wrap;
  word-wrap: break-word;
}


code {
  background-color: rgb(27, 26, 26);
  border-radius: 4px;
  color: #ffffff;
  width:100%;
  height:100%;
  overflow: scroll;
  position: relative;
}
code button {
  position: absolute;
  bottom: 0;
  left:0;
  margin:0.5rem;
}
</style>
