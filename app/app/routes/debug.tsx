import {useCallback, useEffect, useContext} from 'react';
import { BigNumber, BigNumber as BN, utils, ethers } from 'ethers';

import Wallet, { TWalletInfo } from '~/wallet/Wallet';
import { WalletContext } from '~/contexts/WalletContext';
import TransactionError from '~/components/TransactionError';
import {abi as WagerWalletAbi} from '~/contracts/WagerWallet';
import DebugContract from '~/components/debug/DebugContract';
import { TAbiItem } from '~/types/solidity';

import { emojiValid } from '~/util/encode';

export default function Debug() {
  const {walletInfo, setWalletInfo} = useContext(WalletContext);

  console.log('debug walletinfo=', walletInfo);

  const getWalletInfo = useCallback(async () => {
    if (!walletInfo.isConnected || !walletInfo.address) return;

    console.log('trying to get wallet info');
    console.log('getting balances');
    let [myBalanceBN, jdBalanceBN] = await Promise.all([
      Wallet.provider!.getBalance(walletInfo.address),
      Wallet.provider!.getBalance('0x3678fdd3E21bB485487642AB6d2cdF30A2Ea25C1') // jdelman.eth,
    ]);
    console.log('got balances:', myBalanceBN, jdBalanceBN);
    const myBalance = utils.formatEther(myBalanceBN);
    const jdBalance = utils.formatEther(jdBalanceBN);
    console.log('calling setwalletinfo...!!!');
    setWalletInfo((info) => ({
      ...info,
      myBalance,
      jdBalance,
    }));
  }, [walletInfo.isConnected, walletInfo.address]);

  const sendSimpleTransaction = async () => {
    const destAddress = document.getElementById('destAddress').value;
    const amount = document.getElementById('amount').value;
    const tx = await Wallet.sendTransaction({
      to: destAddress,
      value: utils.parseEther(amount)
    });
    console.log(tx);
  };

  const onSubmitWagerContractForm = async (formId: string) => {
    const form = document.getElementById(formId);
    if (!form) return;
    const fd = new FormData(form as HTMLFormElement);
    const dataObj: any = {};
    const args: Array<any> = [];
    for (const entry of fd.entries()) {
      const [key, value] = entry;
      if (key.includes('arg-')) {
        args.push(value);
      }
      else {
        dataObj[entry[0]] = entry[1];
      }
    }

    const contract = new ethers.Contract(
      dataObj.contractAddress,
      WagerWalletAbi,
      Wallet.signer
    );

    const functionArgs: Array<any> = [...args];
    if (dataObj.value) {
      functionArgs.push({ value: utils.parseEther(dataObj.value) });
    }

    console.log('calling', dataObj['contractMethod'], 'with arguments:', args);

    let tx;
    try {
      tx = await contract[dataObj['contractMethod']](...functionArgs);
    } catch (e) {
      console.error('error w/transaction:', e);
    }

    // TODO: use abi outputs to parse

    console.log('success!', String(tx));
  };

  useEffect(() => {
    getWalletInfo();
  }, [walletInfo.isConnected, walletInfo.address]);

  console.log('emjiValid=', emojiValid.length);

  if (!walletInfo.isConnected) {
    return <div>connect your wallet</div>
  }

  if (!walletInfo.address) {
    return <div>loading</div>;
  }

  let addressString = '';
  if (walletInfo.ensName) {
    addressString = `${walletInfo.ensName} (${walletInfo.address})`;
  }
  else {
    addressString = walletInfo.address;
  }

  return (
    <div>
      <p>address: { addressString }</p>
      <p>your balance: { walletInfo.myBalance } eth</p>
      <p>jd balance: { walletInfo.jdBalance } eth</p>
      <div className="mt-3">
        <p>send a simple transaction</p>
        <input
          className="rounded-md p-2 outline outline-1 mx-2"
          placeholder="destination address"
          name="destAddress"
          id="destAddress"
        />
        <input
          className="rounded-md p-2 outline outline-1 mx-2"
          placeholder="amount"
          type="number"
          name="amount"
          id="amount"
        />a
        <button
          type="button"
          onClick={sendSimpleTransaction}
          className="rounded-md p-2 outline outline-1 hover:outline-indigo-800"
        >send</button>
      </div>
      <hr className="mt-6 mb-6" />
      <div className="mt-3">
        <p>call a method on a wager contract</p>
        <DebugContract
          formId="wagerContractForm"
          abi={WagerWalletAbi as TAbiItem[]}
          onSubmit={onSubmitWagerContractForm}
          defaultContractAddress={"0xf29c57A737CA5a74F795B8Ed95e06e0655C1C014"}
        />
      </div>
      <div>
        <TransactionError />
      </div>
    </div>
  );
}