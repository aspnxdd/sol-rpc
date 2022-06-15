import * as web3 from "@solana/web3.js";

abstract class RPC {
  connection: web3.Connection;
  constructor(url: string) {
    this.connection = new web3.Connection(url!);
  }
}
type Address = string;
export interface RPCMethods {
  getBalance: (address: string) => Promise<{ balance: number; error?: string }>;
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
  constructor(url: string) {
    super(url);
  }

  async getBalance(
    address: string
  ): Promise<{ balance: number; error?: string }> {
    try {
      console.log("getBalance", address);
      const balance = await this.connection.getBalance(
        new web3.PublicKey(address)
      );
      console.log(1, balance);
      return { balance };
    } catch (err) {
      console.log(err);
      return { balance: 0, error: (err as Error).message };
    }
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
