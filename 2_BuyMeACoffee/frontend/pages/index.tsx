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

      }catch(e){
         
      }
   }

   return (
      <>
         
      </>
   )
}