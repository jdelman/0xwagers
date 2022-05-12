import {useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';

import {WalletContext} from '~/contexts/WalletContext';

export default function useWallet() {
  const navigate = useNavigate();
  const { walletInfo } = useContext(WalletContext);

  // useEffect(() => {
  //   if (!walletInfo.isConnected) {
  //     // go home
  //     navigate('/');
  //   }
  // }, [walletInfo.isConnected]);

  return walletInfo;
}