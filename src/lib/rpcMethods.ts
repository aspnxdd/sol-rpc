import * as web3 from "@solana/web3.js";
import { RpcError, Blockhash } from "@lib/types";

abstract class RPC {
  connection: web3.Connection;
  constructor(url: string) {
    this.connection = new web3.Connection(url!);
  }
}
export interface RPCMethods {
  getBalance: (address: string) => Promise<{ balance: number } | RpcError>;
  getLatestBlockhash: (address: string) => Promise<Blockhash | RpcError>;
  getAccountInfo: (
    address: string
  ) => Promise<web3.AccountInfo<Buffer> | null | RpcError>;
  getGenesisHash(): Promise<Record<string, string>>;
  getSupply(): Promise<web3.Supply | RpcError>;
}
export class RpcMethods extends RPC implements RPCMethods {
  constructor(url: string) {
    super(url);
  }

  async getBalance(address: string): Promise<{ balance: number } | RpcError> {
    try {
      console.log("getBalance", address);
      const balance = await this.connection.getBalance(
        new web3.PublicKey(address)
      );
      console.log(1, balance);
      return { balance };
    } catch (err) {
      console.log(err);
      return { error: (err as Error).message };
    }
  }

  public async getAccountInfo(
    address: string
  ): Promise<web3.AccountInfo<Buffer> | null | RpcError> {
    try {
      const accountInfo = await this.connection.getAccountInfo(
        new web3.PublicKey(address)
      );
      return accountInfo;
    } catch (err) {
      console.log(err);
      return { error: (err as Error).message };
    }
  }

  public async getLatestBlockhash(): Promise<Blockhash | RpcError> {
    try {
      const latestBlockhash = await this.connection.getLatestBlockhash();
      return latestBlockhash;
    } catch (err) {
      console.log(err);
      return { error: (err as Error).message };
    }
  }

  public async getGenesisHash(): Promise<
    Record<"genesisHash", string> | RpcError
  > {
    try {
      const genesisHash = await this.connection.getGenesisHash();
      return {
        genesisHash,
      };
    } catch (err) {
      console.log(err);
      return { error: (err as Error).message };
    }
  }

  public async getSupply(): Promise<web3.Supply | RpcError> {
    try {
      const supply = await this.connection.getSupply();
      return supply.value;
    } catch (err) {
      console.log(err);
      return { error: (err as Error).message };
    }
  }
}
