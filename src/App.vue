<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import RpcMethods from "@components/RpcMethods.vue";
import Wallet from "@components/Wallet.vue";
import RpcBar from "@components/RpcBar.vue";
import RpcMethodArgs from "@components/RpcMethodArgs.vue";
import RpcLogs from "@components/RpcLogs.vue";
import RpcTopBar from "@components/RpcTopBar.vue";
</script>

<template>
  <RpcTopBar />

  <RpcBar />
  <div class="grid">
    <RpcMethods />
    <RpcMethodArgs />
    <RpcLogs />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
html,
* {
  font-family: "Roboto", sans-serif;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.5rem;
}
</style>
