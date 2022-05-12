import {ethers} from 'ethers';

const WagerWalletContractMetadata = {
  "_format": "hh-sol-artifact-1",
  "contractName": "WagerWallet",
  "sourceName": "contracts/WagerWallet.sol",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_endsAt",
          "type": "uint256"
        },
        {
          "internalType": "uint32",
          "name": "_vigBasisPoints",
          "type": "uint32"
        },
        {
          "internalType": "string",
          "name": "_metadataURI",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "outcome",
          "type": "uint8"
        }
      ],
      "name": "bet",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "cancel",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "claim",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "close",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "endsAt",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getOwnerCut",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "metadataURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "outcome",
          "type": "uint8"
        }
      ],
      "name": "refund",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "_winningOutcome",
          "type": "uint8"
        }
      ],
      "name": "resolve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "winningOutcome",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "bytecode": "0x60806040526000600360046101000a81548160ff0219169083600381111562000051577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b02179055503480156200006357600080fd5b5060405162001d0e38038062001d0e833981810160405281019062000089919062000263565b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600360006101000a81548163ffffffff021916908363ffffffff1602179055508260018190555080600290805190602001906200010992919062000113565b5050505062000490565b828054620001219062000381565b90600052602060002090601f01602090048101928262000145576000855562000191565b82601f106200016057805160ff191683800117855562000191565b8280016001018555821562000191579182015b828111156200019057825182559160200191906001019062000173565b5b509050620001a09190620001a4565b5090565b5b80821115620001bf576000816000905550600101620001a5565b5090565b6000620001da620001d484620002fb565b620002d2565b905082815260208101848484011115620001f357600080fd5b620002008482856200034b565b509392505050565b600082601f8301126200021a57600080fd5b81516200022c848260208601620001c3565b91505092915050565b60008151905062000246816200045c565b92915050565b6000815190506200025d8162000476565b92915050565b6000806000606084860312156200027957600080fd5b6000620002898682870162000235565b93505060206200029c868287016200024c565b925050604084015167ffffffffffffffff811115620002ba57600080fd5b620002c88682870162000208565b9150509250925092565b6000620002de620002f1565b9050620002ec8282620003b7565b919050565b6000604051905090565b600067ffffffffffffffff8211156200031957620003186200041c565b5b62000324826200044b565b9050602081019050919050565b6000819050919050565b600063ffffffff82169050919050565b60005b838110156200036b5780820151818401526020810190506200034e565b838111156200037b576000848401525b50505050565b600060028204905060018216806200039a57607f821691505b60208210811415620003b157620003b0620003ed565b5b50919050565b620003c2826200044b565b810181811067ffffffffffffffff82111715620003e457620003e36200041c565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b620004678162000331565b81146200047357600080fd5b50565b62000481816200033b565b81146200048d57600080fd5b50565b61186e80620004a06000396000f3fe60806040526004361061009c5760003560e01c80638da5cb5b116100645780638da5cb5b1461014e5780638ddf4137146101795780639b34ae03146101a4578063a0270dbc146101cf578063d0821b0e146101f8578063ea8a1af0146102145761009c565b806303ee438c146100a157806304e799bd146100cc5780630a09284a146100f557806343d726d6146101205780634e71d92d14610137575b600080fd5b3480156100ad57600080fd5b506100b661022b565b6040516100c39190611145565b60405180910390f35b3480156100d857600080fd5b506100f360048036038101906100ee9190610f1a565b6102b9565b005b34801561010157600080fd5b5061010a61047c565b60405161011791906112c7565b60405180910390f35b34801561012c57600080fd5b50610135610482565b005b34801561014357600080fd5b5061014c610625565b005b34801561015a57600080fd5b50610163610846565b604051610170919061112a565b60405180910390f35b34801561018557600080fd5b5061018e61086a565b60405161019b91906112c7565b60405180910390f35b3480156101b057600080fd5b506101b96108aa565b6040516101c691906112e2565b60405180910390f35b3480156101db57600080fd5b506101f660048036038101906101f19190610f1a565b6108bd565b005b610212600480360381019061020d9190610f1a565b610b09565b005b34801561022057600080fd5b50610229610d56565b005b60028054610238906114aa565b80601f0160208091040260200160405190810160405280929190818152602001828054610264906114aa565b80156102b15780601f10610286576101008083540402835291602001916102b1565b820191906000526020600020905b81548152906001019060200180831161029457829003601f168201915b505050505081565b6003808111156102f2577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600360049054906101000a900460ff16600381111561033a577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b1461037a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161037190611167565b60405180910390fd5b6000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008360ff1660ff1681526020019081526020016000205490506000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008460ff1660ff168152602001908152602001600020819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610477573d6000803e3d6000fd5b505050565b60015481565b600060038111156104bc577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600360049054906101000a900460ff166003811115610504577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b14610544576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161053b90611227565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146105d2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105c9906111a7565b60405180910390fd5b6001600360046101000a81548160ff0219169083600381111561061e577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b0217905550565b6002600381111561065f577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600360049054906101000a900460ff1660038111156106a7577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b146106e7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106de90611187565b60405180910390fd5b600060056000600360059054906101000a900460ff1660ff1660ff16815260200190815260200160002054600654600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000600360059054906101000a900460ff1660ff1660ff1681526020019081526020016000205461078591906113a0565b61078f919061136f565b90506000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000600360059054906101000a900460ff1660ff1660ff168152602001908152602001600020819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610842573d6000803e3d6000fd5b5050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080620186a0600360009054906101000a900463ffffffff1663ffffffff1660065461089791906113a0565b6108a1919061136f565b90508091505090565b600360059054906101000a900460ff1681565b600160038111156108f7577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600360049054906101000a900460ff16600381111561093f577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b1461097f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610976906112a7565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610a0d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a0490611207565b60405180910390fd5b80600360056101000a81548160ff021916908360ff1602179055506000610a3261086a565b90508060066000828254610a4691906113fa565b9250508190555060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610ab3573d6000803e3d6000fd5b506002600360046101000a81548160ff02191690836003811115610b00577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b02179055505050565b60006003811115610b43577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600360049054906101000a900460ff166003811115610b8b577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b14610bcb576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bc2906111e7565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610c5a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c5190611247565b60405180910390fd5b34600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008360ff1660ff1681526020019081526020016000208190555034600560008360ff1660ff1681526020019081526020016000206000828254610cde9190611319565b925050819055503460066000828254610cf79190611319565b9250508190555070010000000000000000000000000000000060065410610d53576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d4a90611287565b60405180910390fd5b50565b60026003811115610d90577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600360049054906101000a900460ff166003811115610dd8577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b1415610e19576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e1090611267565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480610e74575060015442115b610eb3576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610eaa906111c7565b60405180910390fd5b60038060046101000a81548160ff02191690836003811115610efe577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b0217905550565b600081359050610f1481611821565b92915050565b600060208284031215610f2c57600080fd5b6000610f3a84828501610f05565b91505092915050565b610f4c8161142e565b82525050565b6000610f5d826112fd565b610f678185611308565b9350610f77818560208601611477565b610f8081611569565b840191505092915050565b6000610f98602383611308565b9150610fa38261157a565b604082019050919050565b6000610fbb603883611308565b9150610fc6826115c9565b604082019050919050565b6000610fde602283611308565b9150610fe982611618565b604082019050919050565b6000611001603383611308565b915061100c82611667565b604082019050919050565b6000611024601283611308565b915061102f826116b6565b602082019050919050565b6000611047602483611308565b9150611052826116df565b604082019050919050565b600061106a601b83611308565b91506110758261172e565b602082019050919050565b600061108d601c83611308565b915061109882611757565b602082019050919050565b60006110b0602683611308565b91506110bb82611780565b604082019050919050565b60006110d3600883611308565b91506110de826117cf565b602082019050919050565b60006110f6601f83611308565b9150611101826117f8565b602082019050919050565b61111581611460565b82525050565b6111248161146a565b82525050565b600060208201905061113f6000830184610f43565b92915050565b6000602082019050818103600083015261115f8184610f52565b905092915050565b6000602082019050818103600083015261118081610f8b565b9050919050565b600060208201905081810360008301526111a081610fae565b9050919050565b600060208201905081810360008301526111c081610fd1565b9050919050565b600060208201905081810360008301526111e081610ff4565b9050919050565b6000602082019050818103600083015261120081611017565b9050919050565b600060208201905081810360008301526112208161103a565b9050919050565b600060208201905081810360008301526112408161105d565b9050919050565b6000602082019050818103600083015261126081611080565b9050919050565b60006020820190508181036000830152611280816110a3565b9050919050565b600060208201905081810360008301526112a0816110c6565b9050919050565b600060208201905081810360008301526112c0816110e9565b9050919050565b60006020820190506112dc600083018461110c565b92915050565b60006020820190506112f7600083018461111b565b92915050565b600081519050919050565b600082825260208201905092915050565b600061132482611460565b915061132f83611460565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611364576113636114dc565b5b828201905092915050565b600061137a82611460565b915061138583611460565b9250826113955761139461150b565b5b828204905092915050565b60006113ab82611460565b91506113b683611460565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156113ef576113ee6114dc565b5b828202905092915050565b600061140582611460565b915061141083611460565b925082821015611423576114226114dc565b5b828203905092915050565b600061143982611440565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60005b8381101561149557808201518184015260208101905061147a565b838111156114a4576000848401525b50505050565b600060028204905060018216806114c257607f821691505b602082108114156114d6576114d561153a565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000601f19601f8301169050919050565b7f5761676572206d7573742062652063616e63656c656420666f7220612072656660008201527f756e640000000000000000000000000000000000000000000000000000000000602082015250565b7f5761676572206d757374206265207265736f6c766564202d20746865206f776e60008201527f65722073686f756c642063616c6c207265736f6c766528290000000000000000602082015250565b7f4f6e6c7920746865206f776e65722063616e20636c6f7365207468652077616760008201527f6572000000000000000000000000000000000000000000000000000000000000602082015250565b7f596f75206d75737420626520746865206f776e6572206f66207468697320776160008201527f676572206f7220706173742074696d656f757400000000000000000000000000602082015250565b7f5761676572206d757374206265206f70656e0000000000000000000000000000600082015250565b7f4f6e6c7920746865206f776e65722063616e207265736f6c766520746865207760008201527f6167657200000000000000000000000000000000000000000000000000000000602082015250565b7f5374617465206d757374206265206f70656e20746f20636c6f73650000000000600082015250565b7f5761676572206f776e65722063616e6e6f742070617274697061746500000000600082015250565b7f57616765722063616e6e6f742062652063616e63656c6564206f6e636520726560008201527f736f6c7665640000000000000000000000000000000000000000000000000000602082015250565b7f6f766572666c6f77000000000000000000000000000000000000000000000000600082015250565b7f5761676572206d75737420626520636c6f73656420746f207265736f6c766500600082015250565b61182a8161146a565b811461183557600080fd5b5056fea26469706673582212207e720bd1a2395488eb7e7422b6c23a50cf6f8f001d1bc71fa92778b69ad0b53c64736f6c63430008040033",
  "deployedBytecode": "0x60806040526004361061009c5760003560e01c80638da5cb5b116100645780638da5cb5b1461014e5780638ddf4137146101795780639b34ae03146101a4578063a0270dbc146101cf578063d0821b0e146101f8578063ea8a1af0146102145761009c565b806303ee438c146100a157806304e799bd146100cc5780630a09284a146100f557806343d726d6146101205780634e71d92d14610137575b600080fd5b3480156100ad57600080fd5b506100b661022b565b6040516100c39190611145565b60405180910390f35b3480156100d857600080fd5b506100f360048036038101906100ee9190610f1a565b6102b9565b005b34801561010157600080fd5b5061010a61047c565b60405161011791906112c7565b60405180910390f35b34801561012c57600080fd5b50610135610482565b005b34801561014357600080fd5b5061014c610625565b005b34801561015a57600080fd5b50610163610846565b604051610170919061112a565b60405180910390f35b34801561018557600080fd5b5061018e61086a565b60405161019b91906112c7565b60405180910390f35b3480156101b057600080fd5b506101b96108aa565b6040516101c691906112e2565b60405180910390f35b3480156101db57600080fd5b506101f660048036038101906101f19190610f1a565b6108bd565b005b610212600480360381019061020d9190610f1a565b610b09565b005b34801561022057600080fd5b50610229610d56565b005b60028054610238906114aa565b80601f0160208091040260200160405190810160405280929190818152602001828054610264906114aa565b80156102b15780601f10610286576101008083540402835291602001916102b1565b820191906000526020600020905b81548152906001019060200180831161029457829003601f168201915b505050505081565b6003808111156102f2577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600360049054906101000a900460ff16600381111561033a577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b1461037a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161037190611167565b60405180910390fd5b6000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008360ff1660ff1681526020019081526020016000205490506000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008460ff1660ff168152602001908152602001600020819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610477573d6000803e3d6000fd5b505050565b60015481565b600060038111156104bc577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600360049054906101000a900460ff166003811115610504577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b14610544576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161053b90611227565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146105d2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105c9906111a7565b60405180910390fd5b6001600360046101000a81548160ff0219169083600381111561061e577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b0217905550565b6002600381111561065f577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600360049054906101000a900460ff1660038111156106a7577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b146106e7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106de90611187565b60405180910390fd5b600060056000600360059054906101000a900460ff1660ff1660ff16815260200190815260200160002054600654600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000600360059054906101000a900460ff1660ff1660ff1681526020019081526020016000205461078591906113a0565b61078f919061136f565b90506000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000600360059054906101000a900460ff1660ff1660ff168152602001908152602001600020819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610842573d6000803e3d6000fd5b5050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080620186a0600360009054906101000a900463ffffffff1663ffffffff1660065461089791906113a0565b6108a1919061136f565b90508091505090565b600360059054906101000a900460ff1681565b600160038111156108f7577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600360049054906101000a900460ff16600381111561093f577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b1461097f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610976906112a7565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610a0d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a0490611207565b60405180910390fd5b80600360056101000a81548160ff021916908360ff1602179055506000610a3261086a565b90508060066000828254610a4691906113fa565b9250508190555060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610ab3573d6000803e3d6000fd5b506002600360046101000a81548160ff02191690836003811115610b00577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b02179055505050565b60006003811115610b43577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600360049054906101000a900460ff166003811115610b8b577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b14610bcb576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bc2906111e7565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610c5a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c5190611247565b60405180910390fd5b34600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008360ff1660ff1681526020019081526020016000208190555034600560008360ff1660ff1681526020019081526020016000206000828254610cde9190611319565b925050819055503460066000828254610cf79190611319565b9250508190555070010000000000000000000000000000000060065410610d53576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d4a90611287565b60405180910390fd5b50565b60026003811115610d90577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600360049054906101000a900460ff166003811115610dd8577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b1415610e19576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e1090611267565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480610e74575060015442115b610eb3576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610eaa906111c7565b60405180910390fd5b60038060046101000a81548160ff02191690836003811115610efe577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b0217905550565b600081359050610f1481611821565b92915050565b600060208284031215610f2c57600080fd5b6000610f3a84828501610f05565b91505092915050565b610f4c8161142e565b82525050565b6000610f5d826112fd565b610f678185611308565b9350610f77818560208601611477565b610f8081611569565b840191505092915050565b6000610f98602383611308565b9150610fa38261157a565b604082019050919050565b6000610fbb603883611308565b9150610fc6826115c9565b604082019050919050565b6000610fde602283611308565b9150610fe982611618565b604082019050919050565b6000611001603383611308565b915061100c82611667565b604082019050919050565b6000611024601283611308565b915061102f826116b6565b602082019050919050565b6000611047602483611308565b9150611052826116df565b604082019050919050565b600061106a601b83611308565b91506110758261172e565b602082019050919050565b600061108d601c83611308565b915061109882611757565b602082019050919050565b60006110b0602683611308565b91506110bb82611780565b604082019050919050565b60006110d3600883611308565b91506110de826117cf565b602082019050919050565b60006110f6601f83611308565b9150611101826117f8565b602082019050919050565b61111581611460565b82525050565b6111248161146a565b82525050565b600060208201905061113f6000830184610f43565b92915050565b6000602082019050818103600083015261115f8184610f52565b905092915050565b6000602082019050818103600083015261118081610f8b565b9050919050565b600060208201905081810360008301526111a081610fae565b9050919050565b600060208201905081810360008301526111c081610fd1565b9050919050565b600060208201905081810360008301526111e081610ff4565b9050919050565b6000602082019050818103600083015261120081611017565b9050919050565b600060208201905081810360008301526112208161103a565b9050919050565b600060208201905081810360008301526112408161105d565b9050919050565b6000602082019050818103600083015261126081611080565b9050919050565b60006020820190508181036000830152611280816110a3565b9050919050565b600060208201905081810360008301526112a0816110c6565b9050919050565b600060208201905081810360008301526112c0816110e9565b9050919050565b60006020820190506112dc600083018461110c565b92915050565b60006020820190506112f7600083018461111b565b92915050565b600081519050919050565b600082825260208201905092915050565b600061132482611460565b915061132f83611460565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611364576113636114dc565b5b828201905092915050565b600061137a82611460565b915061138583611460565b9250826113955761139461150b565b5b828204905092915050565b60006113ab82611460565b91506113b683611460565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156113ef576113ee6114dc565b5b828202905092915050565b600061140582611460565b915061141083611460565b925082821015611423576114226114dc565b5b828203905092915050565b600061143982611440565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60005b8381101561149557808201518184015260208101905061147a565b838111156114a4576000848401525b50505050565b600060028204905060018216806114c257607f821691505b602082108114156114d6576114d561153a565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000601f19601f8301169050919050565b7f5761676572206d7573742062652063616e63656c656420666f7220612072656660008201527f756e640000000000000000000000000000000000000000000000000000000000602082015250565b7f5761676572206d757374206265207265736f6c766564202d20746865206f776e60008201527f65722073686f756c642063616c6c207265736f6c766528290000000000000000602082015250565b7f4f6e6c7920746865206f776e65722063616e20636c6f7365207468652077616760008201527f6572000000000000000000000000000000000000000000000000000000000000602082015250565b7f596f75206d75737420626520746865206f776e6572206f66207468697320776160008201527f676572206f7220706173742074696d656f757400000000000000000000000000602082015250565b7f5761676572206d757374206265206f70656e0000000000000000000000000000600082015250565b7f4f6e6c7920746865206f776e65722063616e207265736f6c766520746865207760008201527f6167657200000000000000000000000000000000000000000000000000000000602082015250565b7f5374617465206d757374206265206f70656e20746f20636c6f73650000000000600082015250565b7f5761676572206f776e65722063616e6e6f742070617274697061746500000000600082015250565b7f57616765722063616e6e6f742062652063616e63656c6564206f6e636520726560008201527f736f6c7665640000000000000000000000000000000000000000000000000000602082015250565b7f6f766572666c6f77000000000000000000000000000000000000000000000000600082015250565b7f5761676572206d75737420626520636c6f73656420746f207265736f6c766500600082015250565b61182a8161146a565b811461183557600080fd5b5056fea26469706673582212207e720bd1a2395488eb7e7422b6c23a50cf6f8f001d1bc71fa92778b69ad0b53c64736f6c63430008040033",
  "linkReferences": {},
  "deployedLinkReferences": {}
};

export const abi = WagerWalletContractMetadata.abi;

export const WagerWalletFactory = new ethers.ContractFactory(
  abi,
  WagerWalletContractMetadata.bytecode,
);

export function getWagerContract(forAddress: string) {
  return new ethers.Contract(
    forAddress,
    abi,
  );
}

export default WagerWalletFactory;