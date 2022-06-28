<script setup lang="ts">
import { ref, onBeforeUpdate } from "vue";
import { RpcMethods, RPCMethods } from "@lib/rpcMethods";
import { getParamNames, capitalize } from "@lib/utils";
import { useRpcStore, useLogsStore, useMethodsStore } from "@stores";
import { CommitmentWithoutDeprecated } from "@lib/types";

const rpcStore = useRpcStore();
const methodStore = useMethodsStore();
const logsStore = useLogsStore();
const args = ref<any[]>([]);
const form = ref<any[]>([]);
const commitment = ref<CommitmentWithoutDeprecated>("confirmed");
function getMethods() {
  const f = new RpcMethods(rpcStore.url!, commitment.value)[
    methodStore.method as keyof RPCMethods
  ];
  const params = getParamNames(f) as Parameters<typeof f>;
  console.log("pa", params);
  args.value = params;
}
async function runMethod() {
  const requestLog = `⚓ Sending request to ${methodStore.method}`;
  logsStore.setLogs(requestLog);

  const f = (await new RpcMethods(rpcStore.url!, commitment.value)[
    methodStore.method as keyof RPCMethods
  ](
    // @ts-ignore
    ...form.value
  )) as Record<string, any>;

  console.log("f", f);

  const obj = {} as Record<string, any>;
  for (const [index, key] of Object.keys(f).entries()) {
    obj[key] = Object.values(f)[index];
  }
  if (f.error) {
    logsStore.setLogs(`⛔ Error: ${f.error}`);
  } else {
    logsStore.setLogs(`${JSON.stringify(obj, null, 2)}`);
  }
}
onBeforeUpdate(() => {
  if (methodStore.method) {
    getMethods();
  }
});
</script>

<template>
  <section class="container">
    <div class="args" v-if="methodStore.method">
      <h3>METHOD: {{ methodStore.method }}</h3>
      <hr />
      <span v-for="(arg, index) in args" :key="index">
        <label for="arg" />
        <input
          id="arg"
          type="text"
          :placeholder="`Enter ${arg}`"
          @change="(e) => (form[index] = (e.target as HTMLInputElement)?.value)"
          :key="index"
        />
        {{ capitalize(arg) }}
      </span>
      <div>
        <h4>Commitment</h4>
        <div v-for="commitmentOpt in ['confirmed', 'finalized', 'processed']">
          <input
            @change="() => (commitment = commitmentOpt)"
            type="radio"
            :id="commitmentOpt"
            :name="commitmentOpt"
            :checked="commitment === commitmentOpt"
          />
          <label :for="commitmentOpt">{{ commitmentOpt }}</label
          ><br />
        </div>
      </div>
      <button @click="runMethod">🚀 Send request to RPC node</button>
    </div>
    <div v-else></div>
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
  background-color: cornflowerblue;
  margin-top: 1rem;
  padding: 0.4rem;
  border-radius: 0.5rem;
  border: 0;
  color: whitesmoke;
  transition: all 0.2s ease-in-out;
  font-family: "Roboto", sans-serif;
  width: 92%;
}
button:hover {
  background-color: rgb(155, 180, 226);
}
</style>
