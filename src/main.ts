import { createApp } from 'vue';
import App from './App.vue';
import SolanaWallets from 'solana-wallets-vue';
import 'solana-wallets-vue/styles.css';
import { createPinia } from 'pinia';

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

import {
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter
} from '@solana/wallet-adapter-wallets';

const walletOptions = {
  wallets: [
    new PhantomWalletAdapter(),
    new SlopeWalletAdapter(),
    new SolflareWalletAdapter(),
    new SolletExtensionWalletAdapter(),
    new SolletWalletAdapter()
  ],
  autoConnect: true,
};
import { initWallet } from 'solana-wallets-vue';
initWallet(walletOptions);
const pinia = createPinia();
const app = createApp(App);
app.use(pinia, SolanaWallets, walletOptions).mount('#app');
