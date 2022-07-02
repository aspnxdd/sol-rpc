import { Commitment } from '@solana/web3.js';

export type RpcError = { error: string };
export type Blockhash = Readonly<{
  blockhash: string;
  lastValidBlockHeight: number;
}>;

export type CommitmentWithoutDeprecated = Omit<
  Commitment,
  'recent' | 'single' | 'singleGossip' | 'root' | 'max'
>;
