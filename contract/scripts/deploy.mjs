import {BigNumber, utils} from 'ethers';
import {readFile, writeFile} from 'fs/promises';
import {join, dirname} from 'path';
import {fileURLToPath} from 'url';

// __dirname/__filename not available in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function deploy(contractName) {
  const [deployer] = await ethers.getSigners();

  console.log('Current account balance:', (await deployer.getBalance()));

  const Factory = await ethers.getContractFactory(contractName);
  console.log(`Deploying ${contractName} contract with account: ${deployer.address}`);
  const gas = await ethers.provider.estimateGas(
    Factory.getDeployTransaction().data
  );
  console.log(`Estimated gas: ${gas}`);
  console.log('...');
  const contract = await Factory.deploy();
  console.log('tx=', contract);
  await contract.deployed();
  console.log('Contract address:', contract.address);

  return contract.address;
}

async function copy(contractName, address) {
  const { HARDHAT_NETWORK: network } = process.env;

  // contract ABI & metadata lives in ./artifacts/contracts/
  const pathToAbi = join(__dirname, '..', 'artifacts',
    'contracts', `${contractName}.sol`, `${contractName}.json`);
  
  let abiJson = await readFile(pathToAbi);
  abiJson = JSON.parse(abiJson);

  // existing JSON
  const pathToMetadata = join(__dirname, '..', '..',
    'app', 'app', 'contracts', `${contractName}.json`);

  let currentMeta = await readFile(pathToMetadata);
  currentMeta = JSON.parse(currentMeta);

  const newOutput = {
    abi: abiJson.abi,
    contractAddresses: {
      ...currentMeta.contractAddresses,
      [network]: address
    }
  };

  // something like ../0xwagers/app/app
  await writeFile(pathToMetadata, JSON.stringify(newOutput, null, 2));

  console.log('wrote updated ABI & network address to', pathToMetadata);
}

async function main(contractName) {
  const contractAddress = await deploy(contractName);
  await copy(contractName, contractAddress);
}

main('WagerMultiWallet')
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error deploying contract:', error);
    process.exit(1);
  });