import {useState, useEffect} from "react";
import { useMatches } from "remix";
import {
  getWager,
  getEventsForWagerByIndex,
  WagerEvent,
  OnChainWager
} from "~/wallet/WagerMultiWalletHelper";

import useWallet from "~/hooks/useWallet";
import { NetworkChainDetails } from "~/wallet/Networks";

export default function WagerAt() {
  const matches = useMatches();
  const index = matches.slice(-1)[0].params.hash!;

  const wallet = useWallet();

  const [events, setEvents] = useState<WagerEvent[]>([]);
  const [wager, setWager] = useState<OnChainWager | null>(null);

  const getWagerDetails = async () => {
    console.log('searching for index:', index);

    const [events, wager] = await Promise.all([
      getEventsForWagerByIndex(index),
      getWager(index),
    ]);

    console.log('wager=', wager);
    console.log('events=', events);

    setEvents(events);
    setWager(wager);
  };

  const betOutcome = async (outcome) => {
    
  };

  useEffect(() => {
    if (wallet.network && index) {
      getWagerDetails().catch((err) => {
        console.error('Error calling getWagerDetails:', err);
      });
    }
  }, [index, wallet.network]);

  if (!wager || !wager.state || !wallet.network) {
    // show loader?
    return null;
  }

  const network = wallet.network.toLowerCase();
  const explorerUrl = NetworkChainDetails[network].blockExplorerUrls[0];
  const currency = NetworkChainDetails[network].nativeCurrency.symbol;

  return (
    <section>
      <h2 className="text-xl mb-4">
        <span className="font-semibold">proposition:&nbsp;</span>
        {wager.proposition}
      </h2>
      <h3 className="mb-2"><span className="font-semibold">ends</span> {wager.endsAt.toLocaleString()}</h3>
      <h3 className="mb-2 font-semibold">outcomes</h3>
      {
        wager.outcomes.map((outcome, index) => (
          <div
            className="group flex rounded-lg outline outline-1 outline-gray-300 p-2 mb-3"
            key={index}
          >
            <span
              className="bg-gray-800 text-white p-2 h-full flex-none text-center inline-block rounded-md"
              style={{minWidth: '40px'}}
            >
              {index+1}
            </span>
            <span className="grow p-2 mx-2">
              {outcome}
              &middot;
              Total: {wager.totalsPerOutcome[index]} {currency}
            </span>
            <button
              id={`bet_${index}`}
              type="button"
              className="flex-none hover:text-red-500"
            >Bet</button>
          </div>
        ))
      }
      <h3 className="mb-2">details</h3>
      <h3 className="mb-2"><span className="font-semibold">owner's cut</span> {wager.vigBasisPoints}%</h3>
      <h3 className="mb-2 font-semibold">history</h3>
      <table className="rounded mt-4">
        <thead>
          <tr>
            <th>Time / Block ID</th>
            <th>Event</th>
          </tr>
        </thead>
        <tbody>
          {
            events.map((event) => {
              const txUrl = `${explorerUrl}tx/${event.transaction}`;
              return (
                <tr key={event.transaction}>
                  <td>
                    <a href={txUrl} target="_blank">{event.timestamp}</a>
                  </td>
                  <td>
                    {event.subject}
                    &nbsp;<span className="text-indigo-500 font-semibold">{event.verb}</span>
                    &nbsp;this wager
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </section>
  );
}