import {useState, useCallback, useEffect} from "react";
import { Form, ActionFunction, useActionData, useTransition, useFetcher } from "remix";

import EditOutcomes from '~/components/outcomes/EditOutcomes';
import FallbackToConnectWalletButton from "~/components/FallbackToConnectWalletButton";
import Timeout from "~/components/Timeout";
import OwnersCut from "~/components/OwnersCut";
import Wallet from "~/wallet/Wallet";
import {WagerWalletFactory} from "~/contracts/WagerWallet";

import useWallet from "~/hooks/useWallet";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  console.log('got formdata=', Object.fromEntries(formData));
  return ['1', '2'];
};

function submit(formData) {

}

export default function CreateWager() {
  // const result = useActionData();
  // console.log('result=', result);
  // const transition = useTransition();
  const fetcher = useFetcher();

  useEffect(() => {
    const {type, submission, state, data} = fetcher;
    console.log('fetcher=', fetcher);
  }, [fetcher]);

  const onSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    const formData = new FormData(document.getElementById('new_wager') as HTMLFormElement);
    const data: any = {};
    for (const entry of formData.entries()) {
      let [key, value] = entry;
      if (key.endsWith('[]')) {
        key = key.slice(0, -2);
        if (!data[key]) {
          data[key] = [];
        }
        data[key].push(value);
      }
      else {
        data[key] = value;
      }

      
    }
    
    // 

    //
    let deployTx;
    try {
      const factory = WagerWalletFactory.connect(Wallet.signer);
      deployTx = await factory.deploy(
        
      );
    } catch (e) {
      console.error('error posting');
    }

    
  };

  return (
    <section>
      <h2 className="text-xl mb-4 font-semibold">create a wager</h2>
      <form id="new_wager">
        <fieldset className="mb-3">
          <label
            htmlFor="proposition"
            className="block mb-2 font-semibold"
          >proposition</label>
          <textarea
            id="proposition"
            name="proposition"
            className="p-3 outline outline-1 outline-gray-200 hover:outline-gray-300 focus:outline-2 focus:outline-indigo-800 rounded-lg w-full"
          />
        </fieldset>
        <EditOutcomes />
        <Timeout />
        <OwnersCut />
        <div className="w-full mt-6">
          <FallbackToConnectWalletButton
            id="submit"
            type="submit"
            title="Deploy Wager"
            onClick={onSubmit}
            className="px-3 py-1.5 w-full rounded-lg outline outline-indigo-200 hover:outline-indigo-400 focus:outline-2 focus:outline-indigo-800 transition"
          />
        </div>
      </form>
    </section>
  )
}