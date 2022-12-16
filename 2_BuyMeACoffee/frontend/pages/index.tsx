import { useState } from "react"
import {} from "ethers"
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
   interface Window {
     ethereum?: MetaMaskInpageProvider;
   }
 }

export default function Home() {
   const contractAddress = "" // Need to import and create this one 
   const contractAbi = {} // Need to import and create this one

   const [currentAccount, setCurrentAccount] = useState("")
   const [name, setName] = useState("")
   const [message, setMessage] = useState("")
   const [memo, setMemos] = useState("")

   const onNameChange = (event: any) =>{
      setName(event.target.name)
   }

   const onMessageChange = (event: any) =>{
      setMessage(event.target.name)
   }

   const isWalletConnected = async () => {
      try{
         const {ethereum} = window
         const accounts = await ethereum?.request<string[]>({method: "eth_accounts"})
         
         if(accounts!.length > 0) {
            const account = accounts![0]
            console.log(`Wallet is connected ${account}`)
         } else {
            console.warn("Make sure Metamask is connected!")
         }
      }catch(e){
         console.error(`Error: ${e}`)
      }
   }

   const connectWallet = async () => {
      try {
         const {ethereum} = window

         if(!ethereum){
            console.warn("Please install metamask")
         }

         const accounts = await ethereum?.request<string[]>({
            method: "eth_requestAccounts"
         })
         setCurrentAccount(accounts![0] as string)
      }catch(e) {
         console.error(e)
      }
   }

   return (
      <>
         
      </>
   )
}
