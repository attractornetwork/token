import { ethers, network } from "hardhat";
import { Attractor } from "../typechain-types";
import { getAttractorAddress } from "./address";

async function main(): Promise<void> {
  const [caller] = await ethers.getSigners();
  console.log(`Configuring Attractor on ${network.name} from ${caller.address}`);

  const minter = process.env.MINTER_ADDRESS;
  if (!minter) throw new Error('Missing process.env.MINTER_ADDRESS');
  
  const Attractor = await ethers.getContractFactory('Attractor');
  const address = getAttractorAddress();
  const attractor = Attractor.attach(address) as Attractor;
  console.log(`Attractor is on ${address}`);
  const role = await attractor.MINTER_ROLE();
  
  const hasRole = await attractor.hasRole(role, minter);
  if (hasRole) throw new Error(`${minter} already has minter role`);

  console.log(`Assigning minter role to ${minter}`);
  const tx = await attractor.connect(caller).grantRole(role, minter);
  console.log(`Transaction hash is ${tx.hash}`);
  const minConfirmations = 2;
  await tx.wait(minConfirmations);
  console.log(`Minter role was successfuly assigned to ${minter}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
