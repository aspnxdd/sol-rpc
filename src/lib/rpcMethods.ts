import * as web3 from '@solana/web3.js';
import { RpcError, Blockhash, CommitmentWithoutDeprecated } from '@lib/types';

abstract class RPC {
  connection: web3.Connection;
  commitment?: CommitmentWithoutDeprecated;
  constructor(url: string, commitmentOpt?: CommitmentWithoutDeprecated) {
    this.connection = new web3.Connection(url!);
    this.commitment = commitmentOpt;
  }
}
export interface RPCMethods {
  getBalance: (address: string) => Promise<{ balance: number } | RpcError>;
  getLatestBlockhash: (address: string) => Promise<Blockhash | RpcError>;
  getAccountInfo: (
    address: string,
  ) => Promise<web3.AccountInfo<Buffer> | null | RpcError>;
  getGenesisHash(): Promise<Record<'genesisHash', string> | RpcError>;
  getSupply(): Promise<web3.Supply | RpcError>;
  getBlock(slot: string): Promise<web3.BlockResponse | null | RpcError>;
  getBlockHeight(): Promise<Record<'blockHeight', number> | RpcError>;
  getBlockProduction(): Promise<
    web3.RpcResponseAndContext<web3.BlockProduction> | RpcError
  >;
  getBlockSignatures(slot: string): Promise<web3.BlockSignatures | RpcError>;
  getClusterNodes(): Promise<web3.ContactInfo[] | RpcError>;
  getEpochInfo(): Promise<web3.EpochInfo | RpcError>;
  getEpochSchedule(): Promise<web3.EpochSchedule | RpcError>;
  getFeeForMessage(
    message: string,
  ): Promise<web3.RpcResponseAndContext<number> | RpcError>;
  getFirstAvailableBlock(): Promise<
    Record<'firstAvailableBlock', number> | RpcError
  >;
  getInflationGovernor(): Promise<web3.InflationGovernor | RpcError>;
  getInflationReward(
    addresses: string,
    epoch?: number | undefined,
  ): Promise<(web3.InflationReward | null)[] | RpcError>;
  getSignatureStatus(
    signature: string,
  ): Promise<
    web3.RpcResponseAndContext<web3.SignatureStatus | null> | RpcError
  >;
  getSignatureStatuses(
    signatures: string[],
  ): Promise<
    web3.RpcResponseAndContext<(web3.SignatureStatus | null)[]> | RpcError
  >;
  getSignaturesForAddress(
    address: string,
  ): Promise<web3.ConfirmedSignatureInfo[] | RpcError>;

  getMinimumBalanceForRentExemption(
    datalength: number,
  ): Promise<Record<'rent', number> | RpcError>;
  getVersion(): Promise<web3.Version | RpcError>;
  getRecentPerformanceSamples(): Promise<web3.PerfSample[] | RpcError>;
  getLargestAccounts(
    filter?: string,
  ): Promise<web3.RpcResponseAndContext<web3.AccountBalancePair[]> | RpcError>;

  getTokenLargestAccounts(
    mintAddress: string,
  ): Promise<
    web3.RpcResponseAndContext<web3.TokenAccountBalancePair[]> | RpcError
  >;
  getMultipleAccountsInfo(
    mintAddresses: string,
  ): Promise<(web3.AccountInfo<Buffer> | null)[] | RpcError>;
}
export class RpcMethods extends RPC implements RPCMethods {
  constructor(url: string, commitmentOpt?: CommitmentWithoutDeprecated) {
    super(url, commitmentOpt);
  }

  async getBalance(address: string): Promise<{ balance: number } | RpcError> {
    try {
      const balance = await this.connection.getBalance(
        new web3.PublicKey(address),
        this.commitment as web3.Commitment,
      );
      return { balance };
    } catch (err) {
      console.log(err);
      return { error: (err as Error).message };
    }
  }

  public async getAccountInfo(
    address: string,
  ): Promise<web3.AccountInfo<Buffer> | null | RpcError> {
    try {
      const accountInfo = await this.connection.getAccountInfo(
        new web3.PublicKey(address),
        this.commitment as web3.Commitment,
      );
      if (!accountInfo) throw new Error('Account not found');

      return accountInfo;
    } catch (err) {
      console.log(err);
      return { error: (err as Error).message };
    }
  }

  public async getLatestBlockhash(): Promise<Blockhash | RpcError> {
    try {
      const latestBlockhash = await this.connection.getLatestBlockhash(
        this.commitment as web3.Commitment,
      );
      return latestBlockhash;
    } catch (err) {
      console.log(err);
      return { error: (err as Error).message };
    }
  }

  public async getGenesisHash(): Promise<
    Record<'genesisHash', string> | RpcError
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
      const supply = await this.connection.getSupply(
        this.commitment as web3.Commitment,
      );
      return supply.value;
    } catch (err) {
      console.log(err);
      return { error: (err as Error).message };
    }
  }

  public async getBlock(
    slot: string,
  ): Promise<web3.BlockResponse | null | RpcError> {
    try {
      const block = await this.connection.getBlock(parseInt(slot), {
        commitment: 'confirmed',
      });
      if (!block) throw new Error('Block not found');
      return block;
    } catch (err) {
      console.log(err);
      return { error: (err as Error).message };
    }
  }

  public async getBlockHeight(): Promise<
    Record<'blockHeight', number> | RpcError
  > {
    try {
      const blockHeight = await this.connection.getBlockHeight(
        this.commitment as web3.Commitment,
      );
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
      const blockProduction = await this.connection.getBlockProduction(
        this.commitment as web3.Commitment,
      );
      return blockProduction;
    } catch (err) {
      console.log(err);
      return { error: (err as Error).message };
    }
  }

  public async getBlockSignatures(
    slot: string,
  ): Promise<web3.BlockSignatures | RpcError> {
    try {
      const blockSignature = await this.connection.getBlockSignatures(
        parseInt(slot),
      );
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

  public async getEpochInfo(): Promise<web3.EpochInfo | RpcError> {
    try {
      const epochInfo = await this.connection.getEpochInfo(
        this.commitment as web3.Commitment,
      );
      return epochInfo;
    } catch (err) {
      console.log(err);
      return { error: (err as Error).message };
    }
  }

  public async getEpochSchedule(): Promise<web3.EpochSchedule | RpcError> {
    try {
      const epochSchedule = await this.connection.getEpochSchedule();
      return epochSchedule;
    } catch (err) {
      console.log(err);
      return { error: (err as Error).message };
    }
  }

  public async getFeeForMessage(
    message: string,
  ): Promise<web3.RpcResponseAndContext<number> | RpcError> {
    try {
      const _message = web3.Message.from(new TextEncoder().encode(message));
      const feeForMessage = await this.connection.getFeeForMessage(
        _message,
        this.commitment as web3.Commitment,
      );
      return feeForMessage;
    } catch (err) {
      console.log(err);
      return { error: (err as Error).message };
    }
  }

  public async getFirstAvailableBlock(): Promise<
    Record<'firstAvailableBlock', number> | RpcError
  > {
    try {
      const firstAvailableBlock =
        await this.connection.getFirstAvailableBlock();
      return { firstAvailableBlock };
    } catch (err) {
      console.log(err);
      return { error: (err as Error).message };
    }
  }

  public async getInflationGovernor(): Promise<
    web3.InflationGovernor | RpcError
  > {
    try {
      const inflationGovernor = await this.connection.getInflationGovernor(
        this.commitment as web3.Commitment,
      );
      return inflationGovernor;
    } catch (err) {
      console.log(err);
      return { error: (err as Error).message };
    }
  }

  public async getInflationReward(
    addresses: string,
    epoch?: number | undefined,
  ): Promise<(web3.InflationReward | null)[] | RpcError> {
    try {
      const _addresses = addresses
        .split(',')
        .map((address) => new web3.PublicKey(address));

      const inflationReward = await this.connection.getInflationReward(
        _addresses,
        epoch,
        this.commitment as web3.Commitment,
      );
      return inflationReward;
    } catch (err) {
      console.log(err);
      return { error: (err as Error).message };
    }
  }

  public async getSignatureStatus(
    signature: string,
  ): Promise<
    web3.RpcResponseAndContext<web3.SignatureStatus | null> | RpcError
  > {
    try {
      const status = await this.connection.getSignatureStatus(signature);
      return status;
    } catch (err) {
      console.log(err);
      return { error: (err as Error).message };
    }
  }

  public async getSignatureStatuses(
    signatures: string[],
  ): Promise<
    web3.RpcResponseAndContext<(web3.SignatureStatus | null)[]> | RpcError
  > {
    try {
      const statuses = await this.connection.getSignatureStatuses(signatures);
      return statuses;
    } catch (err) {
      console.log(err);
      return { error: (err as Error).message };
    }
  }

  public async getSignaturesForAddress(
    address: string,
  ): Promise<web3.ConfirmedSignatureInfo[] | RpcError> {
    try {
      const signature = await this.connection.getSignaturesForAddress(
        new web3.PublicKey(address),
      );
      return signature;
    } catch (err) {
      console.log(err);
      return { error: (err as Error).message };
    }
  }

  public async getMinimumBalanceForRentExemption(
    datalength: number,
  ): Promise<Record<'rent', number> | RpcError> {
    try {
      const rent = await this.connection.getMinimumBalanceForRentExemption(
        Number(datalength),
        this.commitment as web3.Commitment,
      );
      return { rent };
    } catch (err) {
      console.log(err);
      return { error: (err as Error).message };
    }
  }

  public async getVersion(): Promise<web3.Version | RpcError> {
    try {
      const version = await this.connection.getVersion();
      return version;
    } catch (err) {
      console.log(err);
      return { error: (err as Error).message };
    }
  }

  public async getRecentPerformanceSamples(): Promise<
    web3.PerfSample[] | RpcError
  > {
    try {
      const samples = await this.connection.getRecentPerformanceSamples();
      return samples;
    } catch (err) {
      console.log(err);
      return { error: (err as Error).message };
    }
  }

  public async getLargestAccounts(
    filter?: string,
  ): Promise<web3.RpcResponseAndContext<web3.AccountBalancePair[]> | RpcError> {
    try {
      const config = {
        filter: (filter as web3.LargestAccountsFilter) ?? undefined,
        commitment: this.commitment,
      } as web3.GetLargestAccountsConfig;
      const largestAccounts = await this.connection.getLargestAccounts(config);
      return largestAccounts;
    } catch (err) {
      console.log(err);
      return { error: (err as Error).message };
    }
  }

  public async getTokenLargestAccounts(
    mintAddress: string,
  ): Promise<
    web3.RpcResponseAndContext<web3.TokenAccountBalancePair[]> | RpcError
  > {
    try {
      const largestAccounts = await this.connection.getTokenLargestAccounts(
        new web3.PublicKey(mintAddress),
        this.commitment as web3.Commitment,
      );
      return largestAccounts;
    } catch (err) {
      console.log(err);
      return { error: (err as Error).message };
    }
  }

  public async getMultipleAccountsInfo(
    mintAddresses: string,
  ): Promise<(web3.AccountInfo<Buffer> | null)[] | RpcError> {
    try {
      const _mintAddresses = mintAddresses
        .split(',')
        .map((address) => new web3.PublicKey(address));
      const largestAccounts = await this.connection.getMultipleAccountsInfo(
        _mintAddresses,
        this.commitment as web3.Commitment,
      );
      return largestAccounts;
    } catch (err) {
      console.log(err);
      return { error: (err as Error).message };
    }
  }
}
