export default function Index() {
  return (
    <main>
      <h1 className="text-xl">welcome to 0xwagers</h1>
      <p className="mt-2 mb-2">0xwagers is a dapp written for ETH & ETH-compatible blockchains.</p>
      <p className="mt-2 mb-2">
        You can use it to place wagers. A wager consists of a proposition and outcomes.
        The creator of a wager sets the proposition and outcomes and is its "oracle,"
        who decides the outcome. Bettors must meet the minimum bet and then send funds
        to the contract, which holds it in escrow until the oracle decides the outcome
        or the wager times out.
      </p>
      <p className="mt-2 mb-2">
        Once a wager is resolved, a predetermined "vig" is sent to the oracle, and bettors
        who whose the winning outcome can claim() their funds.
      </p>
    </main>
  );
}
