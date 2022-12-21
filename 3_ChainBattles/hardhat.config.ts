import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "dotenv/config"

const config: HardhatUserConfig = {
   solidity: "0.8.17",
   networks:{
      mumbai:{
         url: process.env.MUMBAI_MAINNET_RPC,
         accounts: [process.env.PRIVATE_KEY as string],
      }
   },
   etherscan: {
      apiKey: process.env.POLYGON_API_KEY
   }
}

export default config
