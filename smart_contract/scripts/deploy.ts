import { ethers } from "hardhat";

const main = async ()=> {
  const transactions = await ethers.deployContract("Transactions");

  await transactions.waitForDeployment();
  
  console.log(`Transactions deployed to ${await transactions.getAddress()}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
