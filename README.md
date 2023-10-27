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
# Deploy to Goerli
npx hardhat run --network goerli scripts/deploy.ts

# Deploy to Mainnet
npx hardhat run --network mainnet scripts/deploy.ts
```

## Verifying

```shell
# Verify on https://goerli.etherscan.io/
npx hardhat verify --network goerli --contract contracts/Attractor.sol:Attractor <address>

# Verify on https://etherscan.io/
npx hardhat verify --network mainnet --contract contracts/Attractor.sol:Attractor <address>
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
