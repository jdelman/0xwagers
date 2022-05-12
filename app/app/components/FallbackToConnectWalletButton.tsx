import {useState, useCallback, useContext} from "react";

import Wallet from "~/wallet/Wallet";
import { WalletContext } from "~/contexts/WalletContext";
// fuck this
const NOOP = () => { };

interface FallbackToConnectWalletButtonProps {
  title: string;
  onClick?: any;
  [prop: string]: any;
}

export default function FallbackToConnectWalletButton(props: FallbackToConnectWalletButtonProps) {
  const { setIsWalletModalOpen, walletInfo } = useContext(WalletContext);

  const connectWalletHandler = useCallback(() => {
    // setIsWalletModalOpen(true);
    Wallet.setProvider('metamask').then(result => console.log('setProviderResult:', result));
  }, []);

  const { title, onClick, ...rest } = props;

  const buttonTitle = walletInfo.isConnected
    ? title
    : 'Connect Wallet';

  const resolvedOnClick = onClick || NOOP;
  const onClickHandler = walletInfo.isConnected
    ? resolvedOnClick
    : connectWalletHandler;
  
  return (
    <button
      {...rest}
      type="button"
      onClick={onClickHandler}
    >{buttonTitle}</button>
  );
}