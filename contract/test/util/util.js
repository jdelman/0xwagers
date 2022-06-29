const BN = ethers.BigNumber;

const defaultBet = '10000000000000000';

function getWagerObject(wagerArr) {
  const args = [
    'owner',
    'endsAt',
    'vigBasisPoints',
    'winningOutcome',
    'total',
    'state',
    'totalsPerOutcome',
    'proposition',
    'outcomes',
    'isERC20',
    'erc20Token',
  ];

  const out = {};

  for (let i = 0; i < wagerArr.length; i++) {
    out[args[i]] = wagerArr[i];
  }

  return out;
}

async function getDefaultWagerTx(contract, erc20TokenAddress = '0x0000000000000000000000000000000000000000') {
  const wagerTx = await contract.mintWager(
    60 * 60 * 24 * 30,      // 30 days in seconds
    100,                     // owner takes a 0.1% cut
    'Will the Yankees win?',
    [
      ethers.utils.formatBytes32String('Yes'),
      ethers.utils.formatBytes32String('No'),
    ],
    erc20TokenAddress,
  );
  const wager = await wagerTx.wait();
  return wager;
}

module.exports = {
  defaultBet,
  getWagerObject,
  getDefaultWagerTx,
};