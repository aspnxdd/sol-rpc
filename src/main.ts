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
} from '@solana/wallet-adapter-wallets';

const walletOptions = {
  wallets: [
    new PhantomWalletAdapter(),
    new SlopeWalletAdapter(),
    new SolflareWalletAdapter({ network: WalletAdapterNetwork.Devnet }),
  ],
  autoConnect: true,
};
const pinia = createPinia();
const app = createApp(App);
app.use(pinia, SolanaWallets, walletOptions).mount('#app');
