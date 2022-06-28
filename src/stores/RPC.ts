import { defineStore } from "pinia";
import { CommitmentWithoutDeprecated } from "@lib/types";
const useRpcStore = defineStore("rpcStore", {
  state: () => ({
    url: null as null | string,
    commitment: undefined as undefined | CommitmentWithoutDeprecated,
  }),
  actions: {
    setUrl(newUrl: string | null) {
      console.log("setUrl", newUrl);
      this.url = newUrl;
    },
    setCommitment(newCommitment: CommitmentWithoutDeprecated) {
      this.commitment = newCommitment;
    },
  },
});
export default useRpcStore;
