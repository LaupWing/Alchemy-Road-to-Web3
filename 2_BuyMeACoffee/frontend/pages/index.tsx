import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { MetaMaskInpageProvider } from "@metamask/providers"
import styles from "../styles/Home.module.css"
import Head from "next/head"

declare global {
   interface Window {
      ethereum?: MetaMaskInpageProvider
   }
}

export default function Home() {
   const contractAddress = "" // Need to import and create this one
   const contractAbi = {} // Need to import and create this one

   const [currentAccount, setCurrentAccount] = useState("")
   const [name, setName] = useState("")
   const [message, setMessage] = useState("")
   const [memos, setMemos] = useState<any[]>([])

   const onNameChange = (event: any) => {
      setName(event.target.name)
   }

   const onMessageChange = (event: any) => {
      setMessage(event.target.name)
   }

   const isWalletConnected = async () => {
      try {
         const { ethereum } = window
         const accounts = await ethereum?.request<string[]>({
            method: "eth_accounts",
         })

         if (accounts!.length > 0) {
            const account = accounts![0]
            console.log(`Wallet is connected ${account}`)
         } else {
            console.warn("Make sure Metamask is connected!")
         }
      } catch (e) {
         console.error(`Error: ${e}`)
      }
   }

   const connectWallet = async () => {
      try {
         const { ethereum } = window

         if (!ethereum) {
            console.warn("Please install metamask")
         }

         const accounts = await ethereum?.request<string[]>({
            method: "eth_requestAccounts",
         })
         setCurrentAccount(accounts![0] as string)
      } catch (e) {
         console.error(e)
      }
   }

   const buyCoffee = async () => {
      try {
         const { ethereum } = window

         if (ethereum) {
            const provider = new ethers.providers.Web3Provider(
               ethereum as any,
               "any"
            )
            const signer = provider.getSigner()
            const buyMeACoffee = new ethers.Contract(
               contractAddress,
               contractAbi as any,
               signer
            )
            console.log("Buying your coffee")
            const coffeeTxn = await buyMeACoffee.buyCoffee(
               name ? name : "anon",
               message ? message : "Enjoy your coffee!",
               {
                  value: ethers.utils.parseEther("0.001"),
               }
            )

            await coffeeTxn.wait()

            console.log("Mined -->", coffeeTxn.hash)
            console.log("Coffee purchased")

            setName("")
            setMessage("")
         }
      } catch (e) {
         console.error(e)
      }
   }

   const getMemos = async () => {
      try {
         const { ethereum } = window

         if (ethereum) {
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
         } else {
            console.error("Metamask is not connected!")
         }
      } catch (err) {
         console.error(err)
      }
   }

   useEffect(() => {
      let buyMeACoffee: any
      isWalletConnected()
      getMemos()

      const onNewMemo = (
         from: string,
         timestamp: number,
         name: string,
         message: string
      ) => {
         setMemos((prevState) => [
            ...prevState,
            {
               address: from,
               timestamp: new Date(timestamp * 1000),
               message,
               name,
            },
         ])
      }

      const { ethereum } = window

      if (ethereum) {
         const provider = new ethers.providers.Web3Provider(ethereum as any)
         const signer = provider.getSigner()

         buyMeACoffee = new ethers.Contract(
            contractAddress,
            contractAbi as string,
            signer
         )

         buyMeACoffee.on("NewMemo", onNewMemo)
      }

      return () => {
         if (buyMeACoffee) {
            buyMeACoffee.off("NewMemo", onNewMemo)
         }
      }
   }, [])

   return (
      <div className={styles.container}>
         <Head>
            <title>Buy Albert a Coffee!</title>
            <meta name="description" content="Tipping site" />
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <main className={styles.main}>
            <h1 className={styles.title}>Buy Albert a Coffee!</h1>

            {currentAccount ? (
               <div>
                  <form>
                     <div className="formgroup">
                        <label>Name</label>
                        <br />

                        <input
                           id="name"
                           type="text"
                           placeholder="anon"
                           onChange={onNameChange}
                        />
                     </div>
                     <br />
                     <div className="formgroup">
                        <label>Send Albert a message</label>
                        <br />

                        <textarea
                           rows={3}
                           placeholder="Enjoy your coffee!"
                           id="message"
                           onChange={onMessageChange}
                           required
                        ></textarea>
                     </div>
                     <div>
                        <button type="button" onClick={buyCoffee}>
                           Send 1 Coffee for 0.001ETH
                        </button>
                     </div>
                  </form>
               </div>
            ) : (
               <button onClick={connectWallet}> Connect your wallet </button>
            )}
         </main>

         {currentAccount && <h1>Memos received</h1>}

         {currentAccount &&
            memos.map((memo, idx) => {
               return (
                  <div
                     key={idx}
                     style={{
                        border: "2px solid",
                        borderRadius: "5px",
                        padding: "5px",
                        margin: "5px",
                     }}
                  >
                     <p style={{ fontWeight: "bold" }}>"{memo.message}"</p>
                     <p>
                        From: {memo.name} at {memo.timestamp.toString()}
                     </p>
                  </div>
               )
            })}

         <footer className={styles.footer}>
            <a
               href="https://alchemy.com/?a=roadtoweb3weektwo"
               target="_blank"
               rel="noopener noreferrer"
            >
               Created by @thatguyintech for Alchemy's Road to Web3 lesson two!
            </a>
         </footer>
      </div>
   )
}
