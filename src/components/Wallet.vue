<script setup lang="ts">
import { useWallet } from 'solana-wallets-vue';
import { computed, ref, watch } from 'vue';
import { useThemeStore } from '@stores';

const walletStore = useWallet();

const installedWallets = computed(() =>
  walletStore.wallets.value.filter((w) => w.readyState === 'Installed'),
);
const wallets = ref(installedWallets.value);

const modalOpen = ref(false);
const dropdownOpen = ref(false);
interface WalletProps {
  options: {
    trimEnd: boolean;
  };
}
const darkTheme = useThemeStore();

const props = defineProps<WalletProps>();

async function selectWallet(wallet: string) {
  walletStore.select(wallets.value.find((w) => w.name === wallet)?.name!);
  await walletStore.connect();
}

globalThis.addEventListener('click', (ev) => {
  if (
    dropdownOpen.value &&
    (ev.target as HTMLElement).className !== 'wallet-dropdown' &&
    (ev.target as HTMLElement).className !== 'pubkey' &&
    (ev.target as HTMLElement).id !== 'wallet-image'
  ) {
    dropdownOpen.value = !dropdownOpen.value;
  }
});
const darkThemeColors = {
  bg: '#000',
  text: '#fff',
  hoverWallet: '#2f2f2f',
  bgHover: '#1f1f1f',
};
const lightThemeColors = {
  bg: '#f0f0f0',
  text: '#000',
  hoverWallet: '#e0e0e0',
  bgHover: '#e0e0e0',
};

const publicKey = computed(() =>
  props.options.trimEnd
    ? `${walletStore.publicKey.value?.toBase58().slice(0, 8)}...`
    : `${walletStore.publicKey.value
        ?.toBase58()
        .slice(0, 4)}...${walletStore.publicKey.value?.toBase58().slice(-4)}`,
);

function copyPubkeyToClipboard() {
  if (walletStore.publicKey.value) {
    navigator.clipboard.writeText(walletStore.publicKey.value?.toBase58());
  }
}

watch(walletStore.connected, () => {
  if (walletStore.connected.value) {
    modalOpen.value = false;
  }
});

function handleCloseModal(ev: MouseEvent) {
  if (ev.target === ev.currentTarget) {
    modalOpen.value = false;
  }
}
</script>

<template>
  <button v-if="!walletStore.publicKey.value" @click="modalOpen = true">
    Connect
  </button>
  <button
    class="pubkey"
    @click="dropdownOpen = !dropdownOpen"
    v-if="walletStore.publicKey.value"
  >
    <img id="wallet-image" :src="walletStore.wallet.value?.icon" width="20" />
    {{ publicKey }}
    <Transition>
      <div
        class="wallet-dropdown"
        v-if="walletStore.publicKey.value && dropdownOpen"
      >
        <span @click="copyPubkeyToClipboard">Copy address</span>
        <span @click="walletStore.disconnect">Disconnect</span>
      </div>
    </Transition>
  </button>
  <Transition>
    <div class="modal" v-if="modalOpen" @click="handleCloseModal">
      <div class="wallet-floating">
        <h1>Wallets</h1>
        <div class="wallets" v-for="wallet in wallets">
          <span @click="selectWallet(wallet.name)"
            ><img width="20" :src="wallet.icon" />
            <p>{{ wallet.name }}</p></span
          >
        </div>
        <button v-if="wallets.length==installedWallets.length" @click="wallets = walletStore.wallets.value">View more 👇</button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
button {
  z-index: 5;
  position: absolute;
  top: 3rem;
  right: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  background-color: v-bind(
    'darkTheme.theme ? darkThemeColors.bg   : lightThemeColors.bg        '
  );
  color: v-bind(
    'darkTheme.theme ? darkThemeColors.text : lightThemeColors.text'
  );
}
button:hover {
  background-color: v-bind(
    'darkTheme.theme ? darkThemeColors.bgHover : lightThemeColors.bgHover'
  );
}
.pubkey {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}
.wallet-floating {
  width: 20rem;
  padding: 1rem;
  padding-left: 3rem;
  margin-bottom: 10rem;
  border-radius: 0.5rem;
  background-color: v-bind(
    'darkTheme.theme ? darkThemeColors.bg   : lightThemeColors.bg        '
  );
  color: v-bind(
    'darkTheme.theme ? darkThemeColors.text : lightThemeColors.text'
  );
}
.wallet-floating button {
  position: static;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  background-color: v-bind(
    'darkTheme.theme ? darkThemeColors.bg   : lightThemeColors.bg        '
  );
  color: v-bind(
    'darkTheme.theme ? darkThemeColors.text : lightThemeColors.text'
  );
}
.wallet-floating button:hover {
  background-color: v-bind(
    'darkTheme.theme ? darkThemeColors.hoverWallet : lightThemeColors.hoverWallet'
  );
}
.wallet-dropdown {
  z-index: 15;
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 2.5rem;
  right: 0rem;
  gap: 1rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
  width: 100%;
  padding: 0.5rem;
  background-color: v-bind(
    'darkTheme.theme ? darkThemeColors.bg : lightThemeColors.bg'
  );
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
}
.wallets {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: white;
  min-height: 2rem;
  font-weight: bold;
  margin: 0;
  padding: 0;
  z-index: 10;
}

.wallets span {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  width: 70%;
  padding-left: 1rem;
  padding-right: 1rem;
  gap: 0.5rem;
  color: v-bind(
    'darkTheme.theme ? darkThemeColors.text : lightThemeColors.text'
  );
}

.wallets span:hover {
  border-radius: 0.5rem;
  background-color: v-bind(
    'darkTheme.theme ? darkThemeColors.hoverWallet : lightThemeColors.hoverWallet'
  );
}
.wallet-dropdown span {
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: v-bind(
    'darkTheme.theme ? darkThemeColors.bg : lightThemeColors.bg'
  );
  color: v-bind(
    'darkTheme.theme ? darkThemeColors.text : lightThemeColors.text'
  );
}
.wallet-dropdown span:hover {
  background-color: v-bind(
    'darkTheme.theme ? darkThemeColors.hoverWallet : lightThemeColors.hoverWallet'
  );
}
</style>
