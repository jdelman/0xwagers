import {useContext} from "react";
import {WalletContext} from "~/contexts/WalletContext";

export default function TransactionError() {
  const {walletInfo} = useContext(WalletContext);

  if (!walletInfo.error) return null;

  return (
    <div className="red-200">
      {walletInfo.error}
    </div>
  );
}