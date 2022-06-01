import {BigNumber as BN, utils} from 'ethers';
// import {create as ipfsCreate} from 'ipfs-core';

import { WagerItem } from "~/types/WagerItem";
import Wallet from "~/wallet/Wallet";

import WagerMultiWalletSpec from "~/contracts/WagerMultiWallet.json";

interface MintWagerArgs {
  timeout: number;
  ownersCut: number;
  outcomes: Array<string>;
  proposition: string;
  meta: any;
  isLazyMint: boolean;
  network: string;
}

export async function mintWager(args: MintWagerArgs): Promise<string> {
  const {
    timeout,
    ownersCut,
    outcomes,
    proposition,
    meta,
    isLazyMint,
    network,
  } = args;

  console.log('args=', args);

  // determine address for network
  // Client - create
  console.log('network=', network)
  const address = WagerMultiWalletSpec.contractAddresses[network.toLowerCase()];
  if (!address) {
    console.error('Missing address for network:', network);
    return '0';
  }

  // post this metadata to IPFS
  const metadata: Partial<WagerItem> = {
    proposition,
    outcomes,
    ownersCut,
    timeout,
    isLazyMint,
    network,
    address,
    ...meta,
  };

  // TODO: right now ipfs is being loaded via a script tag
  // because the npm dependency is expecting node polyfills
  // const ipfs = await Ipfs.create();
  // console.log('ipfs=', ipfs);

  // let resp;
  // try {
  //   resp = await ipfs.add(JSON.stringify(metadata), {
  //     cidVersion: 1,
  //     hashAlg: 'sha2-256',
  //   });
  // } catch (e) {
  //   console.error('error creating ipfs metadata:', e);
  //   return '0';
  // }

  // const metadataUri = `ipfs://${resp.cid}`;

  // Wallet.loadContract(
  //   'WagerMultiWallet',
  //   address,
  //   WagerMultiWalletSpec.abi,
  // );

  let tx;
  try {
    tx = await Wallet.contracts.WagerMultiWallet.mintWager(
      BN.from(timeout),
      BN.from(ownersCut),
      // metadataUri,
      proposition,
      outcomes.map((outcome) => utils.formatBytes32String(outcome)),
    );
  } catch (e) {
    // do something
    console.error('Error minting wager:', e);
    return '0';
  }
  console.log('tx=', tx);
  const result = await tx.wait();
  
  // we should expect to get the ID of the wager from the events/logs
  const mintEvent = result.events.find((event) => event.event === 'MintedWager');
  if (!mintEvent) {
    // something went wrong?
    return '0';
  }

  const idHex = mintEvent.topics[1];
  const idStr = BN.from(idHex).toString();

  return idStr;
  // This has ot be server
  // write metadata to KV_store 
  const key = `wager-${tx.address}`;
  metadata.metadataUri = metadataUri;

  await WAGERS_KV.put(key, JSON.stringify(metadata));

  return String(resp.cid);
}