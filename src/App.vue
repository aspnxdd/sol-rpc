<script setup lang="ts">
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
*,
*::after,
*::before {
  font-family: "Roboto", sans-serif;
  box-sizing: content-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  margin:0;
}
html {
  height: 100vh;
}
#app {
  display: flex;
  flex-direction: column;

}
.grid {
  display: flex;
  width: 100%;

}

.grid > div {
  border: #e1ecf7 2px solid;
}
.grid > div:nth-child(1n + 2) {
  border-left: 0;
}
</style>
