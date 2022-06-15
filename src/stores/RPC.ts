import { defineStore } from "pinia";

const useRpcStore = defineStore("rpcStore", {
  state: () => ({
    url: null as null | string,
  }),
  actions: {
    setUrl(newUrl: string) {
      this.url = newUrl;
    },
  },
});
export default useRpcStore;
