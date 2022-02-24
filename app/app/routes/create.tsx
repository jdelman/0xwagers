import {useState, useCallback, useEffect} from "react";
import EditOutcomes from '~/components/outcomes/EditOutcomes';
import FallbackToConnectWalletButton from "~/components/FallbackToConnectWalletButton";
import Timeout from "~/components/Timeout";

export default function CreateWager() {
  const submit = useCallback((event) => {
    const form = document.forms[0];
    const formData = new FormData(form!);
    for (const entry of formData.entries()) {
      console.log(entry);
    }
  }, []);

  return (
    <section>
      <h2>create a wager</h2>
      <form id="new_wager">
        <fieldset>
          <label htmlFor="proposition">proposition</label>
          <input type="text" id="proposition" name="proposition"></input>
        </fieldset>

        <EditOutcomes />

        <Timeout />

        <fieldset>
          <label htmlFor="maxNumberOfBettors">maximum number of bettors</label>
          <input
            type="number"
            id="maxNumberOfBettors"
            name="maxNumberOfBettors"
            defaultValue={100}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="ownersCut">oracle's cut</label>
          <input
            type="number"
            id="ownersCut"
            name="ownersCut"
            defaultValue={0.01}
            min={0}
            max={5}
          />
          %
        </fieldset>

        <FallbackToConnectWalletButton
          id="submit"
          onClick={submit}
          title="submit"
        />
      </form>
    </section>
  )
}