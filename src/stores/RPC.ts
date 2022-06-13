import { reactive } from "vue";
interface RPC {
  url: string;
  setUrl(url: string): void;
}

export const rpcStore: RPC = reactive({
  url: "",
  setUrl(newUrl: string) {
    this.url = newUrl;
  },
});
