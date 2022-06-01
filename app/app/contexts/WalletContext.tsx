import { createContext, useState, useEffect } from "react";
import Wallet, {
  TWalletInfo
} from '~/wallet/Wallet';
import { 
  NetworkNameMap,
  TNetworkName
} from '~/wallet/Networks';
import { ReactSetState } from "~/types/util";

export type TWalletContext = {
  isWalletModalOpen: boolean;
  setIsWalletModalOpen: (isWalletModalOpen: boolean) => void;
  walletInfo: TWalletInfo;
  setWalletInfo: ReactSetState<TWalletInfo>;
};

export const WalletContext = createContext<TWalletContext>({
  isWalletModalOpen: false,
  setIsWalletModalOpen: (isWalletModalOpen: boolean) => { },
  walletInfo: {isConnected: false},
  setWalletInfo: () => {}
});

interface WalletContextProviderProps {
  children: React.ReactNode;
}

export const WalletContextProvider = (props: WalletContextProviderProps) => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [walletInfo, setWalletInfo] = useState({
    isConnected: false,
  } as TWalletInfo);

  const value: TWalletContext = {
    isWalletModalOpen,
    setIsWalletModalOpen,
    walletInfo,
    setWalletInfo,
  };

  const getWalletAddress = async () => {
    const addresses = await Wallet.getWalletAddress();
    setWalletInfo((info) => {
      const newInfo: Partial<TWalletInfo> = { address: addresses.address };
      if (addresses.ensName) {
        newInfo.ensName = addresses.ensName;
      }
      return {...info, ...newInfo};
    });
  };

  useEffect(() => {
    Wallet.addListener((type: string, event: any) => {
      const newInfo: TWalletInfo = {};
      if (type === 'network') {
        const network = NetworkNameMap[event.name as TNetworkName];
        newInfo.network = network;
        newInfo.isConnected = true;
        newInfo.error = '';
        Wallet.network = network;
        getWalletAddress();
      }
      else if (type === 'disconnect') {
        newInfo.isConnected = false;
        newInfo.address = '';
        newInfo.jdBalance = undefined;
        newInfo.myBalance = undefined;
        newInfo.error = '';
      }
      else if (type === 'setError') {
        newInfo.error = event.toString();
      }
      else if (type === 'resetError') {
        newInfo.error = '';
      }

      console.log('calling set wallet info:', newInfo);
      setWalletInfo(info => ({ ...info, ...newInfo }));
    });

    Wallet.loadProviderIfAvailable();
  }, []);

  return (
    <WalletContext.Provider value={ value }>
      { props.children }
    </WalletContext.Provider>
  );
} 