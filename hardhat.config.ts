import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from 'dotenv';
import { ethers } from "ethers";
import { Attractor } from "./typechain-types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
dotenv.config();

function getenv(key: string): string {
  const env = process.env[key];
  if (!env) throw new Error(`Missing process.env.${key}`);
  return env;
}

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    goerli: {
      chainId: 5,
      url: getenv('GOERLI_RPC_URL'),
      accounts: [getenv('DEPLOYER_PRIV_KEY')],
    },
    mainnet: {
      chainId: 1,
      url: getenv('MAINNET_RPC_URL'),
      accounts: [getenv('DEPLOYER_PRIV_KEY')],
    }
  },
  etherscan: {
    apiKey: getenv('ETHERSCAN_API_KEY'),
  },
};

function getAttractorAddress(network: string): string {
  switch (network) {
    case 'mainnet':
      throw new Error('Attractor token isnt deployed to mainnet yet');
    case 'goerli':
      return '0x66aFe97C101099777eFCFa896a84A8DcBc56959d';
    default: throw new Error(`No attractor is present on ${network}`);
  }
}

async function getAttractor(hre: HardhatRuntimeEnvironment): Promise<Attractor> {
  const Attractor = await hre.ethers.getContractFactory('Attractor');
  const address = getAttractorAddress(hre.network.name);
  return Attractor.attach(address) as Attractor; 
}

task('mint', 'Mint amount of Attra')
  .addPositionalParam('acc', 'Account receiving ATTRA')
  .addPositionalParam('amount', 'Amount of ATTRA being minted')
  .setAction(async ({ acc, amount }, hre) => {
    console.log(`Minting ${amount} ATTRA on ${hre.network.name} to ${acc}`);
    const attractor = await getAttractor(hre);
    const units = ethers.parseUnits(amount);
    const tx = await attractor.mint(acc, units);
    console.log(`Transaction hash is ${tx.hash}`);
    const confirmations = 2;
    await tx.wait(confirmations);
    console.log(`Mint confirmed`);
  });

task('minter', 'Add MINTER_ROLE for Attractor token')
  .addPositionalParam('acc', 'Account receiving role')
  .setAction(async ({ acc }, hre) => {
    console.log(`About to assign ATTRA minter role to ${acc} on ${hre.network.name}`);
    const attractor = await getAttractor(hre);
    const role = await attractor.MINTER_ROLE();
    const hasRole = await attractor.hasRole(role, acc);
    if (hasRole) throw new Error(`${acc} already has MINTER_ROLE`);
    const tx = await attractor.grantRole(role, acc);
    console.log(`Transaction hash is ${tx.hash}`);
    const confirmations = 2;
    await tx.wait(confirmations);
    console.log(`Assignment confirmed`);
  });

export default config;
