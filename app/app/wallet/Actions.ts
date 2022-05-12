import {BigNumber as BN, ethers} from 'ethers';
import * as IPFS from 'ipfs-core';

import { WagerItem } from "~/types/WagerItem";
import Wallet from "~/wallet/Wallet";

import { abi as WagerWalletAbi} from "~/contracts/WagerWallet";

export default async function createWager(
  endsAt: number,
  ownerPct: number,
  outcomes: Array<string>,
  proposition: string,
  meta: any,
  isLazyMint: boolean,
): Promise<boolean> {
  // post this metadata to IPFS
  const metadata: Partial<WagerItem> = {
    proposition,
    outcomes,
    ownerPct,
    endsAt,
    isLazyMint,
    ...meta,
  };

  const ipfs = await IPFS.create();
  
  let resp;
  try {
    resp = await ipfs.add(JSON.stringify(metadata), {
      cidVersion: 1,
      hashAlg: 'sha2-256',
    });
  } catch (e) {
    console.error('error creating ipfs metadata:', e);
    return false;
  }

  const metadataUri = `https://ipfs.io/ipfs/${resp.cid}`;

  Wallet.loadContract(
    'WagerWallet',
    'TBD',
    WagerWalletAbi
  );

  let transaction;
  try {
    transaction = Wallet.contracts['WagerWallet'].deploy(
      BN.from(endsAt),
      BN.from(ownerPct),
      metadataUri,
    );
  } catch (e) {
    // do something
    console.error('Error deploying Wallet Wager contract:', e);
    return false;
  }

  // write metadata to KV_store 
  const key = `wager-${transaction.address}`;
  metadata.metadataUri = metadataUri;

  await WAGERS_KV.put(key, JSON.stringify(metadata));

  return true;
}