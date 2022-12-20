import { useState } from "react"
import {ethers} from "ethers"
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

   const buyCoffee = async () => {
      try{
         const {ethereum} = window

         if(ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum as any, "any")
            const signer = provider.getSigner()
            const buyMeACoffee = new ethers.Contract(
               contractAddress,
               contractAbi as any,
               signer
            )
            console.log("Buying your coffee")
            const coffeeTxn = await buyMeACoffee.buyCoffee(
               name ? name: "anon",
               message ? message : "Enjoy your coffee!",
               {
                  value: ethers.utils.parseEther("0.001")
               }
            )

            await coffeeTxn.wait()
            
            console.log("Mined -->", coffeeTxn.hash)
            console.log("Coffee purchased")

            setName("")
            setMessage("")
         }
      }catch(e){
         console.error(e)
      }
   }

   const getMemos = async () =>{
      try{
         const { ethereum } = window

         if(ethereum){
            const provider = new ethers.providers.Web3Provider(ethereum as any)
            const signer = provider.getSigner()
            const buyMeACoffee = new ethers.Contract(
               contractAddress,
               contractAbi as any,
               signer
            )

            console.log("Fetching memos from the blockchain")
            const memos = await buyMeACoffee.getMemos()
            console.log("Fetched!")
            setMemos(memos)
         }else {
            console.error("Metamask is not connected!")
         }
      }catch(err){
         console.error(err)
      }
   }

   return (
      <>
         
      </>
   )
}
