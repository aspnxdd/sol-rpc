<script setup lang="ts">
import {  useLogsStore } from "@stores";
const logsStore = useLogsStore();

function downloadLogs() {
  const blob = new Blob([logsStore.logs.toString()], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "logs.txt";
  link.click();
  URL.revokeObjectURL(url);
}
</script>

<template>
  <section class="container">
    <code>
      <div class="sticky">
        <h3>Logs</h3>
        <button @click="downloadLogs">🔽 Download logs</button>
        <button @click="logsStore.clearLogs">🧹 Clear logs</button>
      </div>
      <span v-for="log in logsStore.logs" :key="log">
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
    </code>
  </section>
</template>

<style scoped>
.container {
   margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  width: 39vw;
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
  font-family: Consolas,monaco,monospace; 
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
  font-family: Consolas,monaco,monospace; 
}
code {
  background-color: rgb(27, 26, 26);
  border-radius: 4px;
  color: #ffffff;
  width:100%;
  height:100%;
  position: relative;
  overflow-x: hidden;
  overflow-y: scroll;
}

code .sticky {
  position: sticky;
  top:0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right:1rem;
  background-color: rgb(20, 19, 19);

}
code .sticky button {
  background-color: rgb(202, 202, 202);
  color: #000000;
  border-radius: 0.5rem;
  border: 0;
  padding: 0.4rem;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.1s ease-in-out;
}
code .sticky button:hover {
  background-color: rgb(148, 148, 148);

}
h3{
  height:100%;
}
</style>
