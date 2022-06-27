import { defineStore } from "pinia";

const useRpcStore = defineStore("rpcStore", {
  state: () => ({
    url: null as null | string,
  }),
  actions: {
    setUrl(newUrl: string | null) {
      console.log("setUrl", newUrl);
      this.url = newUrl;
    },
  },
});
export default useRpcStore;
