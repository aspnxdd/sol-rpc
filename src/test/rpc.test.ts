import { describe, expect, test } from 'vitest';
import { RpcMethods } from '@lib/rpcMethods';
import * as web3 from '@solana/web3.js';

const API = 'https://api.devnet.solana.com/';

describe('RPC methods', () => {
  test('should connect to RPC node', async () => {
    const connection = new RpcMethods('http://localhost:8545');
    expect(connection.connection).toBeDefined();
  });

  test('should fail return getting latest blockhash', async () => {
    const connection = new RpcMethods('http://localhost:8545');
    expect(
      async () => await connection.getLatestBlockhash(),
    ).rejects.toThrowError();
  });

  test('should return genesis hash', async () => {
    const connection = new RpcMethods(API);
    const genesisHash = await connection.getGenesisHash();
    expect(genesisHash).toBeDefined();
  });

  test('should return balance 0', async () => {
    const keypair = new web3.Keypair();
    const connection = new RpcMethods(API);
    const supply = await connection.getBalance(keypair.publicKey.toBase58());
    expect((supply as { balance: number }).balance).toBe(0);
  });
});
