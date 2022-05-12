export type NETWORK = 'mainnet' | 'ropsten';
export type STATE = 0 | 1 | 2 | 3;

export interface WagerItem {
  network: NETWORK;
  address: string;
  owner: string;

  proposition: string;
  outcomes: Array<string>;
  state: STATE;
  endsAt: number;
  ownerPct: number;
  winningOutcome: string;
  metadataUri: string;
};

export interface WagerConfig {

}

export const states = {
  0: 'Open',
  1: 'Closed',
  2: 'Resolved',
  3: 'Canceled'
};
