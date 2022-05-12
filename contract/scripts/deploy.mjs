import {BigNumber, utils} from 'ethers';

async function main() {
  console.log('')
  const [deployer] = await ethers.getSigners();

  console.log('Deploying Wager contract with account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()));

  const Wager = await ethers.getContractFactory('WagerWallet');

  // test wager
  const wager = await Wager.deploy(
    BigNumber.from('1646600766919'),
    '100',
    'empty');
  console.log('Wager address:', wager.address);
  console.log('estimate gas for bet:', await wager.estimateGas.bet(0, { value: utils.parseEther('0.001') }));

  const tx = await wager.bet.call(0, { value: utils.parseEther('0.001')} );
  console.log('bet result:', tx);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error deploying contract:', error);
    process.exit(1);
  });