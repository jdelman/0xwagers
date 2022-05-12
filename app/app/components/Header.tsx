import { useContext } from 'react';
import {NavLink} from 'remix';

import { WalletContext } from '~/contexts/WalletContext';
import FallbackToConnectWalletButton from './FallbackToConnectWalletButton';
import Wallet from '~/wallet/Wallet';

const buttonClasses =
  'px-3 py-1.5 mx-1 rounded-lg outline outline-2 outline-gray-50 hover:outline-indigo-200 transition';

export default function Header() {
  const {walletInfo} = useContext(WalletContext);

  console.log(walletInfo);

  const getActiveButtonClass = (props: any) => !props.isActive 
    ? buttonClasses
    : `${buttonClasses} bg-indigo-200 outline-offset`;

  const onClickDisconnect = () => {
    Wallet.disconnect();
  };

  return (
    <header className="bg-gray-50 p-2 mx-auto mb-3">
      <nav className="flex items-center justify-between mx-auto max-w-full">
        <div className="flex items-center space-x-2">
          <NavLink
            end={true}
            to="/"
            className={(props) => {
              const buttonClass = getActiveButtonClass(props);
              return `${buttonClass}`;
            }}
          >🏠<span className="hidden md:inline">&nbsp;home</span></NavLink>
          <NavLink to="all" className={getActiveButtonClass}>
            📜<span className="hidden md:inline">&nbsp;all wagers</span>
          </NavLink>
          { walletInfo.isConnected && (
            <>
              <NavLink to="mine" className={getActiveButtonClass}>
                🐸<span className="hidden md:inline">&nbsp; my wagers</span>
              </NavLink>
              <NavLink to="create" className={getActiveButtonClass}>
                📝<span className="hidden md:inline">&nbsp; create</span>
              </NavLink>
            </> )
          }
          <NavLink to="debug" className={getActiveButtonClass}>
            🧠<span className="hidden md:inline">&nbsp;debug</span>
          </NavLink>
        </div>
        <div className="flex items-center space-x-2">
          <FallbackToConnectWalletButton
            onClick={onClickDisconnect}
            title={`Disconnect from ${walletInfo.network}`}
            className="px-3 py-1.5 mx-1 rounded-lg outline outline-indigo-200 hover:outline-indigo-400 transition"
          />
        </div>
      </nav>
    </header>
  );
}