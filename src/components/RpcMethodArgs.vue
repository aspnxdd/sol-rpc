<script setup lang="ts">
import { ref, onBeforeUpdate, toRaw } from "vue";
import { methodStore } from "@stores/Method";
import { RpcMethods, RPCMethods } from "@lib/rpcMethods";
import { getParamNames, capitalize } from "@lib/utils";
import { logsStore } from "@stores/Logs";

const args = ref<any[]>([]);
const form = ref<any[]>([]);
function getMethods() {
  const f = new RpcMethods()[methodStore.method as keyof RPCMethods];
  const params = getParamNames(f) as Parameters<typeof f>;
  console.log("pa", params);
  args.value = params;
}
async function runMethod() {
  const f = (await new RpcMethods()[methodStore.method as keyof RPCMethods](
    ...form.value
  )) as Record<string, any>;
  console.log("f", f);

  logsStore.setLogs(JSON.parse(JSON.stringify(f)));
  console.log(123,toRaw(logsStore.logs))
}
onBeforeUpdate(() => {
  if (methodStore.method) {
    getMethods();
  }
});
</script>

<template>
  <div>
    <div class="args" v-if="methodStore.method">
      <h4>METHOD: {{ methodStore.method }}</h4>
      <hr />
      <span v-for="(arg, index) in args" :key="index">
        <label for="arg" />
        {{ capitalize(arg) }}
        <input
          id="arg"
          type="text"
          :placeholder="`Enter ${arg}`"
          @change="(e) => (form[index] = (e.target as HTMLInputElement)?.value)"
          :key="index"
        />
      </span>
      <button @click="runMethod">Go</button>
    </div>
  </div>
</template>

<style scoped>
hr {
  margin: 0;
  border: 0;
  border-top: 1px solid rgb(92, 92, 92);
  width: 13rem;
}
h4 {
  margin: 0;
  width: 14rem;
  text-align: left;
}
span {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  width: 90%;
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
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgb(45, 90, 173);
  transition: all 0.2s ease-in-out;
  font-family: "Roboto", sans-serif;
}
button:hover {
  background-color: rgb(155, 180, 226);
}
</style>
