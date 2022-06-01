import {
  ethers,
  providers,
  Contract,
  utils
} from "ethers";
import { NetworkChainDetails, TNetworkName } from "./Networks";

// TODO: WMW-specific, move
import WagerMultiWalletSpec from "~/contracts/WagerMultiWallet.json";

// import {} from '@metamask/providers';

export interface TWalletInfo {
  myBalance?: string;
  jdBalance?: string;
  address?: string;
  isConnected?: boolean;
  network?: string;
  error?: string;
  ensName?: string;
}

export type ProviderType = 'metamask' | 'walletconnect';

export enum EthereumCommands {
  ADD_CHAIN = 'wallet_addEthereumChain',
  SWITCH_CHAIN = 'wallet_switchEthereumChain',
  REQUEST_ACCOUNTS = 'eth_requestAccounts',
};

class WalletManager {
  public provider?: providers.Web3Provider;
  public contracts: { [name: string]: Contract };
  public topicMappings: {
    [prop: string]: {
      [prop: string]: string
    }
  };
  public _network?: TNetworkName | undefined;

  private _signer?: providers.JsonRpcSigner;
  private _alchemyProvider: providers.AlchemyProvider;
  private _listeners: Array<{type: string, event: any}>;

  constructor() {
    this._listeners = [];
    this._alchemyProvider = new ethers.providers.AlchemyProvider(
      'homestead',
      'mH_MTHV-oDh4b9tRba5NtUD8w-GKfpXr' // TODO: make an environment variable
    );

    this.contracts = {};
    this.topicMappings = {};
    this._network = undefined;
  }

  public get signer() {
    return this._signer!
  }

  public set network(network: string) {
    this._network = network as TNetworkName;
    if (network) {
      console.log('network=', network);
      this.loadDefaultContracts();
    }
  }

  public get network() {
    return this._network! as TNetworkName;
  }

  subscribe() {
    this.provider?.on('network', (newNetwork: any, oldNetwork: any) => {
      if (oldNetwork) {
        // see https://docs.ethers.io/v5/single-page/#/v5/concepts/best-practices/
        // auto-refresh on network change
        window.location.reload();
      }

      this.triggerEvent('network', newNetwork);
    });
  }

  triggerEvent(type: string, event: any) {
    for (const listener of this._listeners) {
      listener(type, event);
    }
  }

  addListener(callback: (type: string, event: any) => void) {
    this._listeners.push(callback);
  }

  disconnect() {
    this.signer = undefined;
    this.provider = undefined;
 
    this.resetProvider();
    this.triggerEvent('disconnect', {});
  }

  async loadProviderIfAvailable() {
    const existingProvider = window.localStorage.getItem('provider');
    if (existingProvider) {
      // try to connect
      await this.setProvider(existingProvider as ProviderType);
    }
  }

  saveProvider(providerType: ProviderType) {
    window.localStorage.setItem('provider', providerType);
  }

  saveNetwork(networkType: TNetworkName) {
    window.localStorage.setItem('network', networkType);
  }

  resetNetwork() {
    window.localStorage.removeItem('network');
  }

  resetProvider() {
    window.localStorage.removeItem('provider');
  }

  loadContract(name: string, address: string, abi: any) {
    const contract = new ethers.Contract(
      address,
      abi,
      this.signer
    );

    this.contracts[name] = contract;

    // create event/topic mappings
    this.topicMappings[name] = {};
    for (const entry of abi) {
      if (entry.type === 'event') {
        const joinedArgs = entry.inputs
          .map((input: any) => input.internalType).join(',');
          const eventName = entry.name;
          const eventSignature = `${eventName}(${joinedArgs})`;
          console.log('using event signature=', eventSignature);
          const eventSignatureHashed = utils.keccak256(
            utils.toUtf8Bytes(eventSignature)
          );
          this.topicMappings[name][eventSignatureHashed] = eventName;
      }
    }
  }

  async sendTransaction(transaction: any): Promise<boolean> {
    this.triggerEvent('resetError', {});

    try {
      if (!this._signer) return false;
      this._signer.sendTransaction(transaction);
    }
    catch (e) {
      // TODO: this isn't really a type error...
      this.triggerEvent('setError', (e as TypeError).message);
      return false;
    }
    return true;
  }

  async switchChain(chain: TNetworkName) {
    const chainDetails = NetworkChainDetails[chain];

    try {
      console.log('[switchChain] attempting to call switch_chain');
      await window.ethereum.request({
        method: EthereumCommands.SWITCH_CHAIN,
        params: [{
          chainId: chainDetails.chainId,
        }],
      });
    } catch (switchChainError: any) {
      console.log('switchChainError:', switchChainError, switchChainError.code);
      // try to add it
      if (switchChainError.code === 4902) {
        try {
          await window.ethereum.request({
            method: EthereumCommands.ADD_CHAIN,
            params: [chainDetails]
          })
        } catch (addChainError: any) {
          throw addChainError;
        }
      }
    }

    this.network = chain;
  }

  async getWalletAddress(): Promise<{address: string, ensName: string | null}> {
    const address = await this._signer!.getAddress();
    const ensName = await this.getENSName(address);

    return {
      address,
      ensName
    };
  }

  async getENSName(address: string): Promise<string | null> {
    // use alchemy to get the name
    return this._alchemyProvider.lookupAddress(address);
  }

  async setProvider(providerType: ProviderType): Promise<boolean> {
    let provider;
    if (providerType === 'metamask') {
      if (!window.ethereum) {
        this.resetProvider();
        return false;
      }

      provider = new ethers.providers.Web3Provider(window.ethereum);

      try {
        await provider.send(EthereumCommands.REQUEST_ACCOUNTS, []);
      } catch (e) {
        console.error('Error calling eth_requestAccounts:', e);
        return false;
      }
      console.log('after requestaccounts');

      this.provider = provider;
      this._signer = provider.getSigner();

      this.subscribe();

      this.saveProvider('metamask');
      return true;
    }
    else {
      console.error('Unsupported provider:', providerType);
      this.resetProvider();
      return false;
    }
  }

  // WagerMultiWallet implementation, should be a diff class

  loadDefaultContracts() {
    const address = WagerMultiWalletSpec.contractAddresses[this.network!.toLowerCase()];
    console.log('loading WagerMultiWallet on network', this.network, 'with address', address);
    this.loadContract('WagerMultiWallet', address, WagerMultiWalletSpec.abi);
  }


}

export default (new WalletManager());