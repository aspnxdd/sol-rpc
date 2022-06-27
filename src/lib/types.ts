export type RpcError = { error: string };
export type Blockhash = Readonly<{
  blockhash: string;
  lastValidBlockHeight: number;
}>;