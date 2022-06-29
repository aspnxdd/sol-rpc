<script setup lang="ts">
import {
  RpcBar,
  RpcLogs,
  RpcMethodArgs,
  RpcMethods,
  RpcTopBar,
} from "@components";
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
  font-family: "Inter", sans-serif;
  box-sizing: content-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  margin: 0;
  cursor: default;
  background-color: #f5f5f5dc;
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
