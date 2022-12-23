import { ethers } from "hardhat"

async function main() {
   try{
      const nftContractFactory = await ethers.getContractFactory("ChainBattles")
      const nftContract = await nftContractFactory.deploy()
      await nftContract.deployed()
      console.log(`Contract deployed to: ${nftContract.address}`)
      process.exitCode = 0
   }catch(e){
      console.log(e)
      process.exitCode = 1
   }
}
main()