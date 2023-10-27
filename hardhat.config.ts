import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from 'dotenv';
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

export default config;
