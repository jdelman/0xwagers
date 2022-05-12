require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/rVfnb68OlzTvS4koKi4CGGSc9w8ZczzO',
      accounts: [
        'fe4becbc694498d2103827e035fb2692687ef159b5aeab9f6324089984093030',
      ]
    },
    matic: {
      url: 'https://polygon-mainnet.g.alchemy.com/v2/_N02XIL4uW0auoUg3yBr-iTHQVGmmet_',
      accounts: [
        'fe4becbc694498d2103827e035fb2692687ef159b5aeab9f6324089984093030',
      ]
    },
    mumbai: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/RbJXIVlDGXX18rEORiFWHB5EG46H_OgI',
      accounts: [
        'fe4becbc694498d2103827e035fb2692687ef159b5aeab9f6324089984093030',
      ]
    }
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 100,
    }
  }
};
