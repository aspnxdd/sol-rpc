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
  getGenesisHash(): Promise<Record<"genesisHash", string> | RpcError>;
  getSupply(): Promise<web3.Supply | RpcError>;
  getBlock(slot: string): Promise<web3.BlockResponse | null | RpcError>;
  getBlockHeight(): Promise<Record<"blockHeight", number> | RpcError>;
  getBlockProduction(): Promise<
    web3.RpcResponseAndContext<web3.BlockProduction> | RpcError
  >;
  getBlockSignatures(slot: number): Promise<web3.BlockSignatures | RpcError>;
  getClusterNodes(): Promise<web3.ContactInfo[] | RpcError>;
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
      if (!accountInfo) throw new Error("Account not found");

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

  public async getBlock(
    slot: string
  ): Promise<web3.BlockResponse | null | RpcError> {
    try {
      const block = await this.connection.getBlock(parseInt(slot), {
        commitment: "confirmed",
      });
      if (!block) throw new Error("Block not found");
      return block;
    } catch (err) {
      console.log(err);
      return { error: (err as Error).message };
    }
  }

  public async getBlockHeight(): Promise<
    Record<"blockHeight", number> | RpcError
  > {
    try {
      const blockHeight = await this.connection.getBlockHeight();
      return { blockHeight };
    } catch (err) {
      console.log(err);
      return { error: (err as Error).message };
    }
  }

  public async getBlockProduction(): Promise<
    web3.RpcResponseAndContext<web3.BlockProduction> | RpcError
  > {
    try {
      const blockProduction = await this.connection.getBlockProduction();
      return blockProduction;
    } catch (err) {
      console.log(err);
      return { error: (err as Error).message };
    }
  }

  public async getBlockSignatures(
    slot: number
  ): Promise<web3.BlockSignatures | RpcError> {
    try {
      const blockSignature = await this.connection.getBlockSignatures(slot);
      return blockSignature;
    } catch (err) {
      console.log(err);
      return { error: (err as Error).message };
    }
  }

  public async getClusterNodes(): Promise<web3.ContactInfo[] | RpcError> {
    try {
      const clusterNodes = await this.connection.getClusterNodes();
      return clusterNodes;
    } catch (err) {
      console.log(err);
      return { error: (err as Error).message };
    }
  }
}
