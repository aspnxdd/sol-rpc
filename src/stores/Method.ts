import { reactive } from "vue";
import { RpcMethods } from "@lib/rpcMethods";

export type Methods = keyof RpcMethods &
  Exclude<keyof RpcMethods, "connection"> &
  Exclude<keyof RpcMethods, "rpcUrl">;

interface Method {
  method: Methods | "";
  setMethod(url: Methods): void;
}

export const methodStore = reactive<Method>({
  method: "",
  setMethod(selectedMethod: Methods) {
    this.method = selectedMethod;
  },
});
