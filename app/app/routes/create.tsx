import {useState, useCallback, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import EditOutcomes from '~/components/outcomes/EditOutcomes';
import FallbackToConnectWalletButton from "~/components/FallbackToConnectWalletButton";
import Timeout from "~/components/Timeout";
import OwnersCut from "~/components/OwnersCut";

import {mintWager} from '~/wallet/Actions';
import useWallet from "~/hooks/useWallet";

export default function MintWager() {
  const navigate = useNavigate();
  const {network} = useWallet();

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

        if (key === 'timeout') {
          data[key] = Date.now() + (Number(value) * 24 * 60 * 60 * 60 * 1000);
        }
        else if (key === 'ownersCut') {
          data[key] = Number(value) * 1e5;
        }
        else {
          data[key] = value;
        }
      }
    }
    
    // TODO: validate

    /*
      this will return the ID of the wager - then we need
      to pass on the metadata to KV storage
    */
    const wagerId = await mintWager({
      network,
      ...data
    });
    if (wagerId === '0') {
      // there was an error
      return;
    }

    // send user to the page
    navigate(`/wager/${wagerId}`);
  };

  return (
    <section>
      <h2 className="text-xl mb-4 font-semibold">create a wager</h2>
      <form id="new_wager" disabled>
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
            title="Mint Wager"
            onClick={onSubmit}
            className="px-3 py-1.5 w-full rounded-lg outline outline-indigo-200 hover:outline-indigo-400 focus:outline-2 focus:outline-indigo-800 transition"
          />
        </div>
      </form>
    </section>
  )
}