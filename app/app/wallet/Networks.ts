export const NetworkNameMap = {
  'homestead': 'Mainnet',
  'ropsten': 'Ropsten',
  'matic': 'Polygon',
  'maticmum': 'Polygon Mumbai',
};

export const NetworkChainDetails: {[prop: string]: any} = {
  'matic': {
    chainId: '0x89', // '137',
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://polygon-rpc.com'],
    blockExplorerUrls: ['https://www.polygonscan.com/'],
  },
  'maticmum': {
    chainId: '0x13881',
    chainName: 'Polygon Mumbai Testnet',
    nativeCurrency: {
      name: 'tMATIC',
      symbol: 'tMATIC',
      decimals: 18,
    },
    rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
  },
  'homestead': {
    chainId: '0x01',
  },
  'ropsten': {
    chainId: '0x03',
  },
};

export type TNetworkName = 'homestead' | 'ropsten' | 'matic' | 'maticmum';
