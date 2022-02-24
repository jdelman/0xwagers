const { expect } = require('chai');
const BN = ethers.BigNumber;

let minBetString = '10000000000000000';

describe('Wager contract', function() {
  let Wager;
  let hardhatWager;
  let owner;
  let addr1;
  let addr2;
  let addr3;

  describe('Basic wager functionality', async function() {
    let minBet = BN.from(minBetString);

    before(async function() {
      Wager = await ethers.getContractFactory("Wager");
      [owner, addr1, addr2, addr3] = await ethers.getSigners();
      hardhatWager = await Wager.deploy(
        'Russia-Ukraine war',
        [
          'Russia goes to war with Ukraine',
          'Russia does not go to war with Ukraine',
        ],
        minBet,      // 0.01 ether
        60 * 60 * 24 * 30,      // 30 days in seconds
        2,                      // max number of bettors
        100                     // owner takes a 0.1% cut
      );
    });

    it('Should not allow a bet below the minimum', async function() {
      await expect(hardhatWager.connect(addr1).bet(0, {
        value: 0
      })).to.be.revertedWith('Bet must be at least the minimum');
    });

    it('Should not allow the owner to bet', async function() {
      await expect(hardhatWager.bet(0, {
        value: minBet
      })).to.be.revertedWith('Wager owner cannot partipate');
    });

    it('Should not allow betting on an invalid outcome', async function() {
      await expect(hardhatWager.connect(addr1).bet(3, {
        value: minBet
      })).to.be.revertedWith('Invalid outcome');
    });

    it('Should allow normal bets', async function() {
      await hardhatWager.connect(addr1).bet(0, {
        value: minBet
      });
      await hardhatWager.connect(addr2).bet(1, {
        value: minBet
      });
    });

    it('Should not allow more than the max number of bettors', async function() {
      await expect(hardhatWager.connect(addr3).bet(0, {
        value: minBet
      })).to.be.revertedWith('Too many bettors');
    });

    it('Should not allow non-owner to close', async function() {
      await expect(hardhatWager.connect(addr1).close())
        .to.be.revertedWith('Only the owner can close the wager');
    });

    it('Should not allow a non-closed wager to resolve', async function() {
      await expect(hardhatWager.resolve(0))
        .to.be.revertedWith('Wager must be closed to resolve');
    });

    it('Should allow owner to close', async function() {
      await hardhatWager.close();
      expect(await hardhatWager.getWagerState() === 1);
    });

    it('Should not allow a non-owner to resolve', async function() {
      await expect(hardhatWager.connect(addr1).resolve(0))
        .to.be.revertedWith('Only the owner can resolve the wager');
    });

    it('Should not allow the owner to resolve to an invalid outcome', async function() {
      await expect(hardhatWager.resolve(2))
        .to.be.revertedWith('Invalid outcome');
    });

    it('Should transfer the owners cut upon resolution', async function() {
      const totalBeforeResolve = await hardhatWager.total();
      await hardhatWager.resolve(1); // trying to be optimistic :)
      const expectedTotal = totalBeforeResolve
        .mul(BN.from('100'))
        .div(BN.from('100000'));
      await expect(expectedTotal === BN.from('19980000000000000'));
    });

    it('Should just work', async function() {
      
    });
  });
});