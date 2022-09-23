/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  WagerMultiWallet,
  WagerMultiWalletInterface,
} from "../../contracts/WagerMultiWallet";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "CanceledWager",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "ClosedWager",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "MintedWager",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "outcome",
        type: "uint8",
      },
    ],
    name: "PlacedBet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "outcome",
        type: "uint8",
      },
    ],
    name: "ResolvedWager",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "outcome",
        type: "uint8",
      },
    ],
    name: "bet",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "outcome",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "betERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "cancel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "claimERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "close",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getOwnerCut",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getWager",
    outputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_endsAt",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "_vigBasisPoints",
        type: "uint32",
      },
      {
        internalType: "uint8",
        name: "_winningOutcome",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_total",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_state",
        type: "uint8",
      },
      {
        internalType: "uint256[]",
        name: "_totalsPerOutcome",
        type: "uint256[]",
      },
      {
        internalType: "string",
        name: "_proposition",
        type: "string",
      },
      {
        internalType: "bytes32[]",
        name: "_outcomes",
        type: "bytes32[]",
      },
      {
        internalType: "bool",
        name: "_isERC20",
        type: "bool",
      },
      {
        internalType: "address",
        name: "_erc20Token",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_endsAt",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "_vigBasisPoints",
        type: "uint32",
      },
      {
        internalType: "string",
        name: "_proposition",
        type: "string",
      },
      {
        internalType: "bytes32[]",
        name: "_outcomes",
        type: "bytes32[]",
      },
      {
        internalType: "address",
        name: "_erc20Address",
        type: "address",
      },
    ],
    name: "mintWager",
    outputs: [
      {
        internalType: "uint256",
        name: "wagerId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "outcome",
        type: "uint8",
      },
    ],
    name: "refund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "outcome",
        type: "uint8",
      },
    ],
    name: "refundERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_winningOutcome",
        type: "uint8",
      },
    ],
    name: "resolve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_winningOutcome",
        type: "uint8",
      },
    ],
    name: "resolveERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x6080604052600160005534801561001557600080fd5b50613635806100256000396000f3fe6080604052600436106100c25760003560e01c80637a2756f21161007f5780639c0e1608116100595780639c0e16081461027e578063b9e95306146102a7578063c437a0cd146102d0578063e6074166146102ec576100c2565b80637a2756f2146101d15780637b32cb83146102185780639556a87614610241576100c2565b80630aebeb4e146100c7578063379607f5146100f057806340e58ee5146101195780634b58e1ef14610142578063620e08071461016b57806370818b36146101a8575b600080fd5b3480156100d357600080fd5b506100ee60048036038101906100e991906124d8565b610315565b005b3480156100fc57600080fd5b50610117600480360381019061011291906124d8565b610506565b005b34801561012557600080fd5b50610140600480360381019061013b91906124d8565b610750565b005b34801561014e57600080fd5b50610169600480360381019061016491906125e4565b610950565b005b34801561017757600080fd5b50610192600480360381019061018d91906124d8565b610ba4565b60405161019f9190612d03565b60405180910390f35b3480156101b457600080fd5b506101cf60048036038101906101ca91906125a8565b610c02565b005b3480156101dd57600080fd5b506101f860048036038101906101f391906124d8565b610da8565b60405161020f9b9a99989796959493929190612a43565b60405180910390f35b34801561022457600080fd5b5061023f600480360381019061023a91906124d8565b611108565b005b34801561024d57600080fd5b5061026860048036038101906102639190612501565b611316565b6040516102759190612d03565b60405180910390f35b34801561028a57600080fd5b506102a560048036038101906102a091906125a8565b611539565b005b3480156102b357600080fd5b506102ce60048036038101906102c991906125a8565b611833565b005b6102ea60048036038101906102e591906125a8565b611aa5565b005b3480156102f857600080fd5b50610313600480360381019061030e91906125a8565b611df2565b005b600060016000838152602001908152602001600020905060016004811115610366577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8160060160009054906101000a900460ff1660048111156103b0577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b146103f0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103e790612c63565b60405180910390fd5b8060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610482576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161047990612ba3565b60405180910390fd5b60028160060160006101000a81548160ff021916908360048111156104d0577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b0217905550817f77ae8fc8e08d4c0aa22af4b1d8eb79ea25f8a25ef668dc106ccebf30ecc4fa7f60405160405180910390a25050565b600060016000838152602001908152602001600020905060036004811115610557577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8160060160009054906101000a900460ff1660048111156105a1577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b146105e1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105d890612b43565b60405180910390fd5b60008160040160008360020160049054906101000a900460ff1660ff1660ff1681526020019081526020016000205482600501548360030160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008560020160049054906101000a900460ff1660ff1660ff168152602001908152602001600020546106899190612ef9565b6106939190612ec8565b905060008260030160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008460020160049054906101000a900460ff1660ff1660ff168152602001908152602001600020819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015801561074a573d6000803e3d6000fd5b50505050565b6000600160008381526020019081526020016000209050600360048111156107a1577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8160060160009054906101000a900460ff1660048111156107eb577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b141561082c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161082390612ca3565b60405180910390fd5b8060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16148061088d5750806001015442115b6108cc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108c390612bc3565b60405180910390fd5b60048160060160006101000a81548160ff0219169083600481111561091a577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b0217905550817fd74a4b8ade6c5363624a7b190a92fb6681083d175935eb10a52c42a666d47ad960405160405180910390a25050565b6000600160008581526020019081526020016000209050600115158160090160009054906101000a900460ff161515146109bf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109b690612b83565b60405180910390fd5b600160048111156109f9577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8160060160009054906101000a900460ff166004811115610a43577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b14610a83576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a7a90612be3565b60405180910390fd5b8060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610b16576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b0d90612c83565b60405180910390fd5b60008211610b59576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b5090612b63565b60405180910390fd5b610b64848333611fd4565b837f646190cb1c009f742a0c26d77841b40eb1b30f574608b81f46cac9ec7027f40a8385604051610b96929190612d1e565b60405180910390a250505050565b6000806001600084815260200190815260200160002090506000620186a08260020160009054906101000a900463ffffffff1663ffffffff168360050154610bec9190612ef9565b610bf69190612ec8565b90508092505050919050565b6000600160008481526020019081526020016000209050600480811115610c52577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8160060160009054906101000a900460ff166004811115610c9c577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b14610cdc576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cd390612b23565b60405180910390fd5b60008160030160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008460ff1660ff16815260200190815260200160002054905060008260030160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008560ff1660ff16815260200190815260200160002081905550610da28482336120fd565b50505050565b60008060008060008060608060606000806000600160008e8152602001908152602001600020905060008160060160009054906101000a900460ff166004811115610e1c577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b905060008160ff1611610e64576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e5b90612c23565b60405180910390fd5b6000826008018054905067ffffffffffffffff811115610ead577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051908082528060200260200182016040528015610edb5781602001602082028036833780820191505090505b50905060005b83600801805490508160ff161015610f6a578360040160008260ff1660ff16815260200190815260200160002054828260ff1681518110610f4b577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010181815250508080610f62906130e4565b915050610ee1565b8360000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1684600101548560020160009054906101000a900463ffffffff168660020160049054906101000a900460ff16876005015487878a6007018b6008018c60090160009054906101000a900460ff168d60090160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683805461100d90613038565b80601f016020809104026020016040519081016040528092919081815260200182805461103990613038565b80156110865780601f1061105b57610100808354040283529160200191611086565b820191906000526020600020905b81548152906001019060200180831161106957829003601f168201915b50505050509350828054806020026020016040519081016040528092919081815260200182805480156110d857602002820191906000526020600020905b8154815260200190600101908083116110c4575b505050505092509e509e509e509e509e509e509e509e509e509e509e505050505091939597999b90929496989a50565b600060016000838152602001908152602001600020905060036004811115611159577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8160060160009054906101000a900460ff1660048111156111a3577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b146111e3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111da90612b43565b60405180910390fd5b60008160040160008360020160049054906101000a900460ff1660ff1660ff1681526020019081526020016000205482600501548360030160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008560020160049054906101000a900460ff1660ff1660ff1681526020019081526020016000205461128b9190612ef9565b6112959190612ec8565b905060008260030160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008460020160049054906101000a900460ff1660ff1660ff168152602001908152602001600020819055506113118382336120fd565b505050565b60008060008081548092919061132b9061309b565b9190505590506000600160008381526020019081526020016000209050338160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550868160020160006101000a81548163ffffffff021916908363ffffffff16021790555087816001018190555060018160060160006101000a81548160ff02191690836004811115611405577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b021790555085816007019080519060200190611422929190612226565b508481600801908051906020019061143b9291906122ac565b50600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16146114d55760018160090160006101000a81548160ff021916908315150217905550838160090160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506114f3565b60008160090160006101000a81548160ff0219169083151502179055505b817f5db77210a6c03744f0275ddaf8c6b7a11ef6cedbf37744f0e6088d2f816272dd3360405161152391906129f1565b60405180910390a2819250505095945050505050565b60006001600084815260200190815260200160002090506002600481111561158a577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8160060160009054906101000a900460ff1660048111156115d4577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b14611614576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161160b90612ce3565b60405180910390fd5b8060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146116a6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161169d90612c43565b60405180910390fd5b80600801805490508260ff16106116f2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116e990612b03565b60405180910390fd5b818160020160046101000a81548160ff021916908360ff160217905550600061171a84610ba4565b9050808260050160008282546117309190612f53565b925050819055508160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501580156117a1573d6000803e3d6000fd5b5060038260060160006101000a81548160ff021916908360048111156117f0577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b0217905550837fec00c3adb9d9cddd06595eb235dd7ef84a66cb4ea21afb71e1826cc437104e6b846040516118259190612d47565b60405180910390a250505050565b600060016000848152602001908152602001600020905060026004811115611884577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8160060160009054906101000a900460ff1660048111156118ce577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b1461190e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161190590612ce3565b60405180910390fd5b8060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146119a0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161199790612c43565b60405180910390fd5b818160020160046101000a81548160ff021916908360ff16021790555060006119c884610ba4565b9050808260050160008282546119de9190612f53565b92505081905550611a1484828460000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166120fd565b60038260060160006101000a81548160ff02191690836004811115611a62577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b0217905550837fec00c3adb9d9cddd06595eb235dd7ef84a66cb4ea21afb71e1826cc437104e6b84604051611a979190612d47565b60405180910390a250505050565b600060016000848152602001908152602001600020905060016004811115611af6577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8160060160009054906101000a900460ff166004811115611b40577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b14611b80576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611b7790612be3565b60405180910390fd5b8060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415611c13576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611c0a90612c83565b60405180910390fd5b60003411611c56576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611c4d90612b63565b60405180910390fd5b60008260ff1610158015611c73575080600801805490508260ff16105b611cb2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ca990612b03565b60405180910390fd5b348160030160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008460ff1660ff16815260200190815260200160002081905550348160040160008460ff1660ff1681526020019081526020016000206000828254611d3a9190612e72565b9250508190555034816005016000828254611d559190612e72565b92505081905550700100000000000000000000000000000000816005015410611db3576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611daa90612cc3565b60405180910390fd5b827f646190cb1c009f742a0c26d77841b40eb1b30f574608b81f46cac9ec7027f40a3484604051611de5929190612d1e565b60405180910390a2505050565b6000600160008481526020019081526020016000209050600480811115611e42577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8160060160009054906101000a900460ff166004811115611e8c577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b14611ecc576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ec390612b23565b60405180910390fd5b60008160030160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008460ff1660ff16815260200190815260200160002054905060008260030160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008560ff1660ff168152602001908152602001600020819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015611fcd573d6000803e3d6000fd5b5050505050565b6000600160008581526020019081526020016000209050600115158160090160009054906101000a900460ff16151514612043576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161203a90612c03565b60405180910390fd5b8060090160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd8330866040518463ffffffff1660e01b81526004016120a493929190612a0c565b602060405180830381600087803b1580156120be57600080fd5b505af11580156120d2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906120f691906124af565b5050505050565b6000600160008581526020019081526020016000209050600115158160090160009054906101000a900460ff1615151461216c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161216390612c03565b60405180910390fd5b8060090160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3084866040518463ffffffff1660e01b81526004016121cd93929190612a0c565b602060405180830381600087803b1580156121e757600080fd5b505af11580156121fb573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061221f91906124af565b5050505050565b82805461223290613038565b90600052602060002090601f016020900481019282612254576000855561229b565b82601f1061226d57805160ff191683800117855561229b565b8280016001018555821561229b579182015b8281111561229a57825182559160200191906001019061227f565b5b5090506122a891906122f9565b5090565b8280548282559060005260206000209081019282156122e8579160200282015b828111156122e75782518255916020019190600101906122cc565b5b5090506122f59190612316565b5090565b5b808211156123125760008160009055506001016122fa565b5090565b5b8082111561232f576000816000905550600101612317565b5090565b600061234661234184612d87565b612d62565b9050808382526020820190508285602086028201111561236557600080fd5b60005b85811015612395578161237b8882612431565b845260208401935060208301925050600181019050612368565b5050509392505050565b60006123b26123ad84612db3565b612d62565b9050828152602081018484840111156123ca57600080fd5b6123d5848285612ff6565b509392505050565b6000813590506123ec81613575565b92915050565b600082601f83011261240357600080fd5b8135612413848260208601612333565b91505092915050565b60008151905061242b8161358c565b92915050565b600081359050612440816135a3565b92915050565b600082601f83011261245757600080fd5b813561246784826020860161239f565b91505092915050565b60008135905061247f816135ba565b92915050565b600081359050612494816135d1565b92915050565b6000813590506124a9816135e8565b92915050565b6000602082840312156124c157600080fd5b60006124cf8482850161241c565b91505092915050565b6000602082840312156124ea57600080fd5b60006124f884828501612470565b91505092915050565b600080600080600060a0868803121561251957600080fd5b600061252788828901612470565b955050602061253888828901612485565b945050604086013567ffffffffffffffff81111561255557600080fd5b61256188828901612446565b935050606086013567ffffffffffffffff81111561257e57600080fd5b61258a888289016123f2565b925050608061259b888289016123dd565b9150509295509295909350565b600080604083850312156125bb57600080fd5b60006125c985828601612470565b92505060206125da8582860161249a565b9150509250929050565b6000806000606084860312156125f957600080fd5b600061260786828701612470565b93505060206126188682870161249a565b925050604061262986828701612470565b9150509250925092565b600061263f838361273d565b60208301905092915050565b600061265783836129b5565b60208301905092915050565b61266c81612f87565b82525050565b600061267d82612e04565b6126878185612e3f565b935061269283612de4565b8060005b838110156126c35781516126aa8882612633565b97506126b583612e25565b925050600181019050612696565b5085935050505092915050565b60006126db82612e0f565b6126e58185612e50565b93506126f083612df4565b8060005b83811015612721578151612708888261264b565b975061271383612e32565b9250506001810190506126f4565b5085935050505092915050565b61273781612f99565b82525050565b61274681612fa5565b82525050565b600061275782612e1a565b6127618185612e61565b9350612771818560208601613005565b61277a816131ca565b840191505092915050565b6000612792600f83612e61565b915061279d826131db565b602082019050919050565b60006127b5602383612e61565b91506127c082613204565b604082019050919050565b60006127d8603883612e61565b91506127e382613253565b604082019050919050565b60006127fb601a83612e61565b9150612806826132a2565b602082019050919050565b600061281e601c83612e61565b9150612829826132cb565b602082019050919050565b6000612841602283612e61565b915061284c826132f4565b604082019050919050565b6000612864603383612e61565b915061286f82613343565b604082019050919050565b6000612887601283612e61565b915061289282613392565b602082019050919050565b60006128aa602183612e61565b91506128b5826133bb565b604082019050919050565b60006128cd600d83612e61565b91506128d88261340a565b602082019050919050565b60006128f0602483612e61565b91506128fb82613433565b604082019050919050565b6000612913601b83612e61565b915061291e82613482565b602082019050919050565b6000612936601c83612e61565b9150612941826134ab565b602082019050919050565b6000612959602683612e61565b9150612964826134d4565b604082019050919050565b600061297c600883612e61565b915061298782613523565b602082019050919050565b600061299f601f83612e61565b91506129aa8261354c565b602082019050919050565b6129be81612fcf565b82525050565b6129cd81612fcf565b82525050565b6129dc81612fd9565b82525050565b6129eb81612fe9565b82525050565b6000602082019050612a066000830184612663565b92915050565b6000606082019050612a216000830186612663565b612a2e6020830185612663565b612a3b60408301846129c4565b949350505050565b600061016082019050612a59600083018e612663565b612a66602083018d6129c4565b612a73604083018c6129d3565b612a80606083018b6129e2565b612a8d608083018a6129c4565b612a9a60a08301896129e2565b81810360c0830152612aac81886126d0565b905081810360e0830152612ac0818761274c565b9050818103610100830152612ad58186612672565b9050612ae561012083018561272e565b612af3610140830184612663565b9c9b505050505050505050505050565b60006020820190508181036000830152612b1c81612785565b9050919050565b60006020820190508181036000830152612b3c816127a8565b9050919050565b60006020820190508181036000830152612b5c816127cb565b9050919050565b60006020820190508181036000830152612b7c816127ee565b9050919050565b60006020820190508181036000830152612b9c81612811565b9050919050565b60006020820190508181036000830152612bbc81612834565b9050919050565b60006020820190508181036000830152612bdc81612857565b9050919050565b60006020820190508181036000830152612bfc8161287a565b9050919050565b60006020820190508181036000830152612c1c8161289d565b9050919050565b60006020820190508181036000830152612c3c816128c0565b9050919050565b60006020820190508181036000830152612c5c816128e3565b9050919050565b60006020820190508181036000830152612c7c81612906565b9050919050565b60006020820190508181036000830152612c9c81612929565b9050919050565b60006020820190508181036000830152612cbc8161294c565b9050919050565b60006020820190508181036000830152612cdc8161296f565b9050919050565b60006020820190508181036000830152612cfc81612992565b9050919050565b6000602082019050612d1860008301846129c4565b92915050565b6000604082019050612d3360008301856129c4565b612d4060208301846129e2565b9392505050565b6000602082019050612d5c60008301846129e2565b92915050565b6000612d6c612d7d565b9050612d78828261306a565b919050565b6000604051905090565b600067ffffffffffffffff821115612da257612da161319b565b5b602082029050602081019050919050565b600067ffffffffffffffff821115612dce57612dcd61319b565b5b612dd7826131ca565b9050602081019050919050565b6000819050602082019050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b6000612e7d82612fcf565b9150612e8883612fcf565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115612ebd57612ebc61310e565b5b828201905092915050565b6000612ed382612fcf565b9150612ede83612fcf565b925082612eee57612eed61313d565b5b828204905092915050565b6000612f0482612fcf565b9150612f0f83612fcf565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615612f4857612f4761310e565b5b828202905092915050565b6000612f5e82612fcf565b9150612f6983612fcf565b925082821015612f7c57612f7b61310e565b5b828203905092915050565b6000612f9282612faf565b9050919050565b60008115159050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600063ffffffff82169050919050565b600060ff82169050919050565b82818337600083830152505050565b60005b83811015613023578082015181840152602081019050613008565b83811115613032576000848401525b50505050565b6000600282049050600182168061305057607f821691505b602082108114156130645761306361316c565b5b50919050565b613073826131ca565b810181811067ffffffffffffffff821117156130925761309161319b565b5b80604052505050565b60006130a682612fcf565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156130d9576130d861310e565b5b600182019050919050565b60006130ef82612fe9565b915060ff8214156131035761310261310e565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f496e76616c6964206f7574636f6d650000000000000000000000000000000000600082015250565b7f5761676572206d7573742062652063616e63656c656420666f7220612072656660008201527f756e640000000000000000000000000000000000000000000000000000000000602082015250565b7f5761676572206d757374206265207265736f6c766564202d20746865206f776e60008201527f65722073686f756c642063616c6c207265736f6c766528290000000000000000602082015250565b7f426574206d7573742062652067726561746572207468616e2030000000000000600082015250565b7f4d75737420626520616e204552433230207374796c6520776167657200000000600082015250565b7f4f6e6c7920746865206f776e65722063616e20636c6f7365207468652077616760008201527f6572000000000000000000000000000000000000000000000000000000000000602082015250565b7f596f75206d75737420626520746865206f776e6572206f66207468697320776160008201527f676572206f7220706173742074696d656f757400000000000000000000000000602082015250565b7f5761676572206d757374206265206f70656e0000000000000000000000000000600082015250565b7f5468697320776167657220646f6573206e6f7420737570706f7274204552433260008201527f3000000000000000000000000000000000000000000000000000000000000000602082015250565b7f496e76616c696420776167657200000000000000000000000000000000000000600082015250565b7f4f6e6c7920746865206f776e65722063616e207265736f6c766520746865207760008201527f6167657200000000000000000000000000000000000000000000000000000000602082015250565b7f5374617465206d757374206265206f70656e20746f20636c6f73650000000000600082015250565b7f5761676572206f776e65722063616e6e6f742070617274697061746500000000600082015250565b7f57616765722063616e6e6f742062652063616e63656c6564206f6e636520726560008201527f736f6c7665640000000000000000000000000000000000000000000000000000602082015250565b7f6f766572666c6f77000000000000000000000000000000000000000000000000600082015250565b7f5761676572206d75737420626520636c6f73656420746f207265736f6c766500600082015250565b61357e81612f87565b811461358957600080fd5b50565b61359581612f99565b81146135a057600080fd5b50565b6135ac81612fa5565b81146135b757600080fd5b50565b6135c381612fcf565b81146135ce57600080fd5b50565b6135da81612fd9565b81146135e557600080fd5b50565b6135f181612fe9565b81146135fc57600080fd5b5056fea2646970667358221220c356cab812ceeaadbda846604c8eddf29e425027f7470486e0047ce938b6167064736f6c63430008040033";

type WagerMultiWalletConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: WagerMultiWalletConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class WagerMultiWallet__factory extends ContractFactory {
  constructor(...args: WagerMultiWalletConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<WagerMultiWallet> {
    return super.deploy(overrides || {}) as Promise<WagerMultiWallet>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): WagerMultiWallet {
    return super.attach(address) as WagerMultiWallet;
  }
  override connect(signer: Signer): WagerMultiWallet__factory {
    return super.connect(signer) as WagerMultiWallet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WagerMultiWalletInterface {
    return new utils.Interface(_abi) as WagerMultiWalletInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): WagerMultiWallet {
    return new Contract(address, _abi, signerOrProvider) as WagerMultiWallet;
  }
}