import { ethers, network } from "hardhat";
import { Attractor } from "../typechain-types";
import { getAttractorAddress } from "./address";

async function main(): Promise<void> {
  const amount = process.env.MINT_AMOUNT;
  if (!amount) throw new Error('Missing process.env.MINT_AMOUNT');

  const target = process.env.MINT_TARGET;
  if (!target) throw new Error('Missing process.env.MINT_TARGET');
  
  const Attractor = await ethers.getContractFactory('Attractor');
  const address = getAttractorAddress();
  const attractor = Attractor.attach(address) as Attractor;

  const symbol = await attractor.symbol();
  console.log(`Minting ${amount} ${symbol} on ${network.name} to ${target}`);

  const tx = await attractor.mint(target, ethers.parseEther(amount));
  console.log(`Transaction hash is ${tx.hash}`);
  const minConfirmations = 2;
  await tx.wait(minConfirmations);
  console.log(`Mint confirmed.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
