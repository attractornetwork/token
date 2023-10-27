import { network } from 'hardhat';

export function getAttractorAddress(): string {
  switch (network.name) {
    case 'mainnet':
    case 'ethereum':
      throw new Error('Attractor token isnt deployed to mainnet yet');
    case 'testnet':
    case 'goerli':
      return '0x66aFe97C101099777eFCFa896a84A8DcBc56959d';
    default: throw new Error(`No attractor is present on ${network.name}`);
  }
}
