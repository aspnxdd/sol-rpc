import { defineStore } from "pinia";

const useRpcStore = defineStore("rpcStore", {
  state: () => ({
    url: null as null | string,
  }),
  actions: {
    setUrl(newUrl: string) {
      console.log("new url", newUrl);
      this.url = newUrl;
    },
  },
});
export default useRpcStore;
