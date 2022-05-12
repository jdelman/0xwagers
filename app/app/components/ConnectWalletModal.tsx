import {useContext} from 'react';
import ReactModal from 'react-modal';
import { WalletContext } from '~/contexts/WalletContext';

export default function ConnectWalletModal() {
  const {
    isWalletModalOpen,
    setIsWalletModalOpen
  } = useContext(WalletContext);

  const onClose = () => {
    setIsWalletModalOpen(false);
  };

  return (
    <ReactModal
      isOpen={isWalletModalOpen}
      onRequestClose={onClose}
    >
      <h2>Connect wallet</h2>
      <ul className="wallets">
        <li>MetaMask</li>
        <li>WalletConnect</li>
      </ul>
    </ReactModal>
  )
}