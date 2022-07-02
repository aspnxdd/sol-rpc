<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { WalletMultiButton } from 'solana-wallets-vue';
</script>

<template>
  <div>
    <WalletMultiButton />
  </div>
</template>

<style scoped>
div {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
</style>
