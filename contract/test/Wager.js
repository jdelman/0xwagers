const { expect } = require('chai');
const BN = ethers.BigNumber;

const { defaultBet, getWagerObject, getDefaultWagerTx } = require('./util/util')

const bn = (number) => BN.from(number.toString());

describe('Wager contract', function() {
  let Wager;
  let addr1;
  let addr2;
  let addr3;
  let wagerId;
  let wagerContractAddress;

  before(async function() {
    const WagerFactory = await ethers.getContractFactory("WagerMultiWallet");
    [owner, addr1, addr2, addr3] = await ethers.getSigners();

    Wager = await WagerFactory.deploy();
    wagerContractAddress = Wager.address;
    console.log('wagerContractAddress=', wagerContractAddress);
  });

  describe('Basic wager functionality', async function() {
    it('Mint', async function() {
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

    it('Do not allow a bet below the minimum', async function() {
      await expect(Wager.connect(addr1).bet(wagerId, 0, {
        value: 0
      })).to.be.revertedWith('Bet must be greater than 0');
    });

    it('Do not allow the owner to bet', async function() {
      await expect(Wager.bet(wagerId, 0, {
        value: defaultBet
      })).to.be.revertedWith('Wager owner cannot partipate');
    });

    it('Do not allow betting on an invalid outcome', async function() {
      await expect(Wager.connect(addr1).bet(wagerId, 3, {
        value: defaultBet
      })).to.be.revertedWith('Invalid outcome');
    });

    it('Allow normal bets', async function() {
      await Wager.connect(addr1).bet(wagerId, 0, {
        value: defaultBet
      });
      await Wager.connect(addr2).bet(wagerId, 1, {
        value: defaultBet
      });
      // TODO: I'm not asserting anything here?
    });

    it('Do not allow non-owner to close', async function() {
      await expect(Wager.connect(addr1).close(wagerId))
        .to.be.revertedWith('Only the owner can close the wager');
    });

    it('Do not allow a non-closed wager to resolve', async function() {
      await expect(Wager.resolve(wagerId, 1))
        .to.be.revertedWith('Wager must be closed to resolve');
    });

    it('Allow owner to close', async function() {
      await Wager.close(wagerId);
      expect(getWagerObject(await Wager.getWager(wagerId)).state === 1);
    });

    it('Do not allow a non-owner to resolve', async function() {
      await expect(Wager.connect(addr1).resolve(wagerId, 0))
        .to.be.revertedWith('Only the owner can resolve the wager');
    });

    it('Do not allow the owner to resolve to an invalid outcome', async function() {
      await expect(Wager.resolve(wagerId, 2))
        .to.be.revertedWith('Invalid outcome');
    });

    it('Transfer the owners cut upon resolution', async function() {
      const totalBeforeResolve = getWagerObject(await Wager.getWager(wagerId)).total;
      await Wager.resolve(wagerId, 1); // trying to be optimistic :)
      const expectedTotal = totalBeforeResolve
        .mul(BN.from('100'))
        .div(BN.from('100000'));
      await expect(expectedTotal === BN.from('19980000000000000'));
    });
  });

  describe('ERC-20 wager', async function() {
    let WagerCoin;
    let wagerCoinAddress;

    before(async function() {
      // Initialize token
      const WagerCoinFactory = await ethers.getContractFactory("WagerCoin");
      WagerCoin = await WagerCoinFactory.deploy(
        BN.from('100000000000000000000') // 100 "whole" tokens (1e18 * 100)
      );
      await WagerCoin.deployed();

      wagerCoinAddress = WagerCoin.address;

      // Distribute some tokens

    });

    it('Mint a wager with an ERC-20 address', async function() {
      const wagerTx = await getDefaultWagerTx(Wager, wagerCoinAddress);
      const mintEvent = wagerTx.events.find((event) => event.event === 'MintedWager');
      const idHex = mintEvent.topics[1];
      wagerId = idHex;

      // TODO: assert on event emitted?
    });

    it('Allow to our bettors to grant access to the coins', async function() {
      await WagerCoin.transfer(addr1.address, bn(10e18));
      await WagerCoin.transfer(addr2.address, bn(10e18));

      await WagerCoin.connect(addr1).approve(wagerContractAddress, BN.from(Number(10e18).toString()));
      await WagerCoin.connect(addr2).approve(wagerContractAddress, BN.from(Number(10e18).toString()));

      // check amounts
      // const [
      //   ownerBalance,
      //   addr1Balance,
      //   addr2Balance
      // ] = await Promise.all([
      //   WagerCoin.balanceOf(owner.address),
      //   WagerCoin.balanceOf(addr1.address),
      //   WagerCoin.balanceOf(addr2.address),
      // ]);
      // console.log('balances=', {
      //   ownerBalance,
      //   addr1Balance,
      //   addr2Balance,
      // });
    });

    it('Allow normal bets', async function() {
      const tx1 = await Wager.connect(addr1)
        .betERC20(wagerId, 0, defaultBet);
      await tx1.wait();

      const tx2 = await Wager.connect(addr2)
        .betERC20(wagerId, 1, defaultBet);
      await tx2.wait();

      expect(await WagerCoin.balanceOf(addr1.address)).to.equal(BN.from('9990000000000000000'));
      expect(await WagerCoin.balanceOf(addr2.address)).to.equal(BN.from('9990000000000000000'));
    });

    it('Transfer the owners cut upon resolution', async function() {
      const totalBeforeResolve = getWagerObject(await Wager.getWager(wagerId)).total;
      await Wager.resolve(wagerId, 1); // trying to be optimistic :)
      const expectedTotal = totalBeforeResolve
        .mul(BN.from('100'))
        .div(BN.from('100000'));
      await expect(expectedTotal === BN.from('19980000000000000'));
    });
  });
});