import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deployer is ${deployer.address}`);

  const balance = await deployer.provider.getBalance(deployer.address);
  console.log(`Balance is ${ethers.formatEther(balance)} ETH`);

  const deployment = await ethers.deployContract('Attractor');
  const attractor = await deployment.waitForDeployment();
  const address = await attractor.getAddress();
  console.log(`Attractor has been deployed to ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
