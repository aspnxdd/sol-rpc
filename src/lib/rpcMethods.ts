import * as web3 from "@solana/web3.js";
import { rpcStore } from "@stores/RPC";

abstract class RPC {
  connection: web3.Connection;
  constructor() {
    this.connection = new web3.Connection(rpcStore.url);
  }
}
type Address = string;
export interface RPCMethods {
  getBalance: (address: string) => Promise<number>;
  getLatestBlockhash: (address: string) => Promise<
    Readonly<{
      blockhash: string;
      lastValidBlockHeight: number;
    }>
  >;
  getAccountInfo: (
    address: Address
  ) => Promise<web3.AccountInfo<Buffer> | null>;
  getGenesisHash(): Promise<Record<string, string>>;
  getSupply(): Promise<web3.Supply>;
}
export class RpcMethods extends RPC implements RPCMethods {
  constructor() {
    super();
  }

  async getBalance(address: string): Promise<number> {
    console.log("getBalance");
    const balance = await this.connection.getBalance(
      new web3.PublicKey(address)
    );
    return balance;
  }

  public async getAccountInfo(
    address: Address
  ): Promise<web3.AccountInfo<Buffer> | null> {
    const accountInfo = await this.connection.getAccountInfo(
      new web3.PublicKey(address)
    );
    return accountInfo;
  }

  public async getLatestBlockhash(): Promise<
    Readonly<{
      blockhash: string;
      lastValidBlockHeight: number;
    }>
  > {
    const latestBlockhash = await this.connection.getLatestBlockhash();
    return latestBlockhash;
  }

  public async getGenesisHash(): Promise<Record<string, string>> {
    const genesisHash = await this.connection.getGenesisHash();
    return {
      genesisHash,
    };
  }

  public async getSupply(): Promise<web3.Supply> {
    const supply = await this.connection.getSupply();
    return supply.value;
  }
}
