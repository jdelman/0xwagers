import {useState, useCallback} from "react";

// fuck this
const NOOP = () => { };

interface FallbackToConnectWalletButtonProps {
  title: string;
  onClick?: any;
  [prop: string]: any;
}

export default function FallbackToConnectWalletButton(props: FallbackToConnectWalletButtonProps) {
  const [isConnected, setIsConnected] = useState(false);

  const connectWalletHandler = useCallback(() => {
    console.log('got here');
    setIsConnected(true);
  }, []);

  const { title, onClick, ...rest } = props;

  const buttonTitle = isConnected
    ? title
    : 'Connect Wallet';

  const resolvedOnClick = onClick || NOOP;
  const onClickHandler = isConnected
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