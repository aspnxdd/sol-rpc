<script setup lang="ts">
import {
  RpcBar,
  RpcLogs,
  RpcMethodArgs,
  RpcMethods,
  RpcTopBar,
  Footer,
  ThemeToggler,
} from "@components";
</script>

<template>
  <RpcTopBar />
  <ThemeToggler />

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
  --text-color-secondary: rgb(127, 127, 127);
  --background-color-input: #fff;
  --background-color-button: #6495ed;
  --background-color-button-hover: #9bb4e2;
  --background-color-stats-card: #dfdfdf;
  --invert-percentage: 0%;
  --theme-toggler-hover: #e4e4e4;
  margin: 0;
  cursor: default;
  background-color: var(--background-color);
  color: var(--text-color);
}
body.dark-theme {
  --background-color: #282830;
  --text-color: #fff;
  --text-color-secondary: rgb(132, 132, 132);
  --background-color-input: #33333b;
  --background-color-button: #3d76e1;
  --background-color-button-hover: #7097e0;
  --background-color-stats-card: #6a6969;
  --invert-percentage: 100%;
  --theme-toggler-hover: #393939;
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
