<script setup lang="ts">
import {
  RpcBar,
  RpcLogs,
  RpcMethodArgs,
  RpcMethods,
  RpcTopBar,
  Footer,
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
  <Footer />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
*,
*::after,
*::before {
  font-family: "Inter", sans-serif;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  --background-color: #f5f5f5dc;
  --text-color: #333;
  --background-color-input: #fff;
  --background-color-button: #6495ed;
  --background-color-button-hover: #9bb4e2;
  --background-color-stats-card: #dfdfdf;
  margin: 0;
  cursor: default;
  background-color: var(--background-color);
  color: var(--text-color);
}
body.dark-theme {
  --background-color: rgb(66, 66, 66);
  --text-color: #fff;
  --background-color-input: rgb(90, 90, 90);
  --background-color-button: #3d76e1;
  --background-color-button-hover: #7097e0;
  --background-color-stats-card: #6a6969;
}
html {
  height: 100vh;
  scroll-behavior: smooth;
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
