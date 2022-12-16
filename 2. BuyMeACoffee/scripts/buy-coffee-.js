// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat")

async function getBalance(address) {
   const balanceBigInt = await hre.ethers.provider.getBalance(address)
   return hre.ethers.utils.formatEther(balanceBigInt)
}

async function printBalances(addresses){
   let idx = 0
   for (const address of addresses){
      console.log(`Address ${idx} balance`, await getBalance(address))
      idx++
   }
}

function printMemos(memos){
   for(const memo of memos){
      const timestamp = memo.timestamp
      const tipper = memo.name
      const tipperAddress = memo.from
      const message = memo.message
      console.log(`At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"`)
   }
}
 
async function main() {
   const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners() 

   const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee")
   const buyMeACoffee = await BuyMeACoffee.deploy()
   await buyMeACoffee.deployed()

   console.log("BuyMeACoffe deployed to ", buyMeACoffee.address)
   const addresses = [owner.address, tipper.address, buyMeACoffee.address]
   console.log("== start ==")
   await printBalances(addresses)
   const tip = {
      value: hre.ethers.utils.parseEther("1")
   }
   buyMeACoffee.connect(tipper).buyCoffee("Hau", "Jij bent gay", tip)
   buyMeACoffee.connect(tipper2).buyCoffee("Jim", "<3", tip)
   buyMeACoffee.connect(tipper3).buyCoffee("David", "Homo", tip)
   
   console.log("== bought coffee ==")
   await printBalances(addresses)
   buyMeACoffee.connect(owner).withdrawTips()

   console.log("== withdraw tips ==")
   await printBalances(addresses)

   console.log("== memos ==")
   const memos = await buyMeACoffee.getMemos()
   printMemos(memos)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
   console.error(error)
   process.exitCode = 1
})
