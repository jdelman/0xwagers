import { BigNumber, utils } from 'ethers';
import Wallet from '~/wallet/Wallet';

import WagerMultiWalletSpec from "~/contracts/WagerMultiWallet.json";

const stateMap = [
  'invalid',
  'open',
  'closed',
  'resolved',
  'canceled'
];

const eventToVerb = {
  'MintedWager': 'minted',
  'PlacedBet': 'placed a bet',
  'ClosedWager': 'closed',
  'ResolvedWager': 'resolved',
  'CanceledWager': 'canceled',
};

const wagerTransformers = {
  _endsAt: (value: BigNumber) => new Date(Number(value)),
  _outcomes: (outcomes: Array<string>) => outcomes
    .map((outcome) => utils.parseBytes32String(outcome)),
  _total: (value: BigNumber) => Number(value),
  _totalsPerOutcome: (totals: Array<BigNumber>) =>
    totals.map((total) => total.toString()),
  _vigBasisPoints: (value: number) => value / 1e5,
  _state: (value: number) => stateMap[value],
};

export interface OnChainWager {
  owner: string;
  endsAt: Date;
  proposition: string;
  outcomes: Array<string>;
  state: string;
  total: number;
  totalsPerOutcome: Array<number>;
  vigBasisPoints: number;
  winningOutcome: number;
}

export interface WagerEvent {
  transaction: string;
  timestamp: Date | string; // ideally this is a timestamp, but it's going to have to be the block ID fr now
  subject: string; // address or resolved ENS name
  verb: string; // minted, etc.
  amount?: {
    currency: string;
    amount: number | string;
  };
  outcome?: string;
}

export async function getWager(index: number | string): Promise<OnChainWager> {
  const wagerDetails = await Wallet.contracts.WagerMultiWallet
    .getWager(Number(index));

  // do some formatting
  const out = {};
  for (const key of Object.keys(wagerDetails)) {
    if (!key.startsWith('_')) continue;

    let val = wagerDetails[key];
    if (wagerTransformers[key]) {
      val = wagerTransformers[key](val);
    }
    out[key.substring(1)] = val;    
  }

  return out as OnChainWager;
}

export async function getEventsForWagerByIndex(
  index: number | string
): Promise<Array<WagerEvent>> {
  const topic = `0x${String(index).padStart(64, '0')}`;

  const eventsRaw = await
    Wallet.contracts.WagerMultiWallet.queryFilter(
      {
        topics: [
          [],
          topic
        ]
      }
    );

  const events: Array<WagerEvent> = [];

  // transform to an array of WagerEvent
  for (const _event of eventsRaw) {
    console.log('_event=', _event);
    const name = Wallet.topicMappings.WagerMultiWallet[_event.topics[0]];
    if (!name) {
      console.warn('missing topic mapping for', _event.topics[0]);
      continue;
    }

    const verb: string = eventToVerb[name] ?? name;
    
    let address: string;
    let addressRaw = '[missing]';
    if (verb === 'minted') {
      addressRaw = utils.hexStripZeros(_event.data);
    }
    address = await Wallet.getENSName(addressRaw) ?? addressRaw;

    const event = {
      transaction: _event.transactionHash,
      timestamp: String(_event.blockNumber),
      subject: address,
      verb,
    };

    events.push(event);
  }

  return events;
}