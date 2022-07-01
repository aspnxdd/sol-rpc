import { RpcMethods } from "@lib/rpcMethods";
import { defineStore } from "pinia";

export type Methods = keyof RpcMethods &
  Exclude<keyof RpcMethods, "connection"> &
  Exclude<keyof RpcMethods, "rpcUrl">;


 const useMethodsStore = defineStore("methodsStore", {
  state: () => ({
    method: null as null | string,
  }),
  actions: {
    setMethod(selectedMethod: Methods|null) {
      this.method = selectedMethod;
    },
  },
});

export default useMethodsStore;
