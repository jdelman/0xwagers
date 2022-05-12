export type SolidityType = 'uint' | 'uint8' | 'uint32' | 'uint128' | 'string';

export interface TAbiInputOutput {
  internalType: SolidityType;
  type: SolidityType;
  name: string;
}

export interface TAbiItem {
  inputs: Array<TAbiInputOutput>;
  outputs: Array<TAbiInputOutput>;
  stateMutability: 'nonpayable' | 'payable' | 'view';
  type: 'constructor' | 'function';
  name?: string;
}

export interface SolidityMetadata {
  contractName: string;
  abi: Array<TAbiItem>;
  bytecode: string;
}