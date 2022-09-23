require("@typechain/hardhat");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  solidity: "0.8.4",
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/zz2bJe58eeIWQGcrF2I9vxwYPjtqVHQh',
      accounts: [
        '55daece4c961b430e75eeedc4c2642e497541d3569e11377a8397f3ad47e7216',
      ]
    },
    matic: {
      url: 'https://polygon-mainnet.g.alchemy.com/v2/_N02XIL4uW0auoUg3yBr-iTHQVGmmet_',
      accounts: [
        '55daece4c961b430e75eeedc4c2642e497541d3569e11377a8397f3ad47e7216',
      ]
    },
    mumbai: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/RbJXIVlDGXX18rEORiFWHB5EG46H_OgI',
      accounts: [
        '55daece4c961b430e75eeedc4c2642e497541d3569e11377a8397f3ad47e7216',
      ]
    }
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    }
  }
};
