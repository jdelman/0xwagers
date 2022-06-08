const { expect } = require('chai');
const BN = ethers.BigNumber;

let minBetString = '10000000000000000';

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

describe('Wager contract', function() {
  let Wager;
  let owner;
  let addr1;
  let addr2;
  let addr3;
  let wagerId;

  describe('Basic wager functionality', async function() {
    let minBet = BN.from(minBetString);

    before(async function() {
      WagerFactory = await ethers.getContractFactory("WagerMultiWallet");
      [owner, addr1, addr2, addr3] = await ethers.getSigners();

      Wager = await WagerFactory.deploy();
      
      const wagerTx = await Wager.mintWager(
        60 * 60 * 24 * 30,      // 30 days in seconds
        100,                     // owner takes a 0.1% cut
        'Will the Yankees win?',
        [
          ethers.utils.formatBytes32String('Yes'),
          ethers.utils.formatBytes32String('No'),
        ],
        '0x0000000000000000000000000000000000000000',
      );
      const wager = await wagerTx.wait();

      const mintEvent = wager.events.find((event) => event.event === 'MintedWager');
      const idHex = mintEvent.topics[1];
      wagerId = idHex;
    });

    it('Should not allow a bet below the minimum', async function() {
      await expect(Wager.connect(addr1).bet(wagerId, 0, {
        value: 0
      })).to.be.revertedWith('Bet must be greater than 0');
    });

    it('Should not allow the owner to bet', async function() {
      await expect(Wager.bet(wagerId, 0, {
        value: minBet
      })).to.be.revertedWith('Wager owner cannot partipate');
    });

    it('Should not allow betting on an invalid outcome', async function() {
      await expect(Wager.connect(addr1).bet(wagerId, 3, {
        value: minBet
      })).to.be.revertedWith('Invalid outcome');
    });

    it('Should allow normal bets', async function() {
      await Wager.connect(addr1).bet(wagerId, 0, {
        value: minBet
      });
      await Wager.connect(addr2).bet(wagerId, 1, {
        value: minBet
      });
    });

    it('Should not allow non-owner to close', async function() {
      await expect(Wager.connect(addr1).close(wagerId))
        .to.be.revertedWith('Only the owner can close the wager');
    });

    it('Should not allow a non-closed wager to resolve', async function() {
      await expect(Wager.resolve(wagerId, 1))
        .to.be.revertedWith('Wager must be closed to resolve');
    });

    it('Should allow owner to close', async function() {
      await Wager.close(wagerId);
      expect(getWagerObject(await Wager.getWager(wagerId)).state === 1);
    });

    it('Should not allow a non-owner to resolve', async function() {
      await expect(Wager.connect(addr1).resolve(wagerId, 0))
        .to.be.revertedWith('Only the owner can resolve the wager');
    });

    it('Should not allow the owner to resolve to an invalid outcome', async function() {
      await expect(Wager.resolve(wagerId, 2))
        .to.be.revertedWith('Invalid outcome');
    });

    it('Should transfer the owners cut upon resolution', async function() {
      const totalBeforeResolve = getWagerObject(await Wager.getWager(wagerId)).total;
      await Wager.resolve(wagerId, 1); // trying to be optimistic :)
      const expectedTotal = totalBeforeResolve
        .mul(BN.from('100'))
        .div(BN.from('100000'));
      await expect(expectedTotal === BN.from('19980000000000000'));
    });
  });

  // describe('ERC-20 wager', async function() {
  //   it('Should ')
  // });
});