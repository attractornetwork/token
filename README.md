# Attractor token

This repository contains development, testing and management tools
for ATTRA (Attractor) token and related ecosystem.

## Getting ready

```shell
# Install dependencies
npm install;

# Fill environment variables
cp .env.example .env
edit .env
```

## Deployment

```shell
# Deploy to goerli, sepolia or mainnet
npm run deploy:<network>
```

Deployed contracts:
- **Goerli**: [explore](https://goerli.etherscan.io/token/0x66afe97c101099777efcfa896a84a8dcbc56959d)
- **Sepolia**: [explore](https://sepolia.etherscan.io/address/0x66aFe97C101099777eFCFa896a84A8DcBc56959d)
- **Mainnet**: soon

## Verifying

```shell
# Verify on on goerli, sepolia or mainnet
npm run verify:<network> <address>
```

## Role management

```shell
# Assign minter role to 0xc3b57Db3443538eB7CED99385Bb2c1211ea7669e on goerli
npx hardhat --network goerli minter 0xc3b57Db3443538eB7CED99385Bb2c1211ea7669e
```

## Minting

```shell
# Mint 1000 ATTRA to 0xc3b57Db3443538eB7CED99385Bb2c1211ea7669e on goerli
npx hardhat --network goerli mint 0xc3b57Db3443538eB7CED99385Bb2c1211ea7669e 1000
```
