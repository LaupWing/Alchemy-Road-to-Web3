import type { NextPage } from "next"
import { useState } from "react"

const Home: NextPage = () => {
   const [walletAddres, setWalletAddress] = useState("")
   const [collectionAddress, setCollectionAddress] = useState("")
   const [nfts, setNfts] = useState([])

   const fetchNfts = async () => {
      let nfts
      console.log("Fetching nfts")
      const api_key = "A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM"
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`

      const requestOptions = {
         method: "GET"
      }

      if(!collectionAddress.length){
         const fetchUrl = `${baseURL}?owner=${walletAddres}`
         nfts = await fetch(fetchUrl, requestOptions).then(data => data.json())
      }else{
         console.log("Fetching nfts for collection owned by address")
         const fetchUrl = `${baseURL}?owner=${walletAddres}&contractAddresses%5B%5D=${collectionAddress}`
         nfts = await fetch(fetchUrl, requestOptions).then(data => data.json())
      }

      if(nfts){
         setNfts(nfts.ownedNfts)
      }
   }

   return (
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
         <div>
            <input 
               type="text" 
               onChange={e => setWalletAddress(e.target.value)}
               placeholder="Add your wallet address"
               value={walletAddres}
            />
            <input 
               type="text" 
               onChange={e => setCollectionAddress(e.target.value)}
               placeholder="Add your collection address"
               value={collectionAddress}
            />
            <label htmlFor="checkbox">
               <input 
                  type="checkbox" 
                  name="checkbox" 
                  id="checkbox" 
               />
            </label>
            <button onClick={() => {
               fetchNfts()
            }}>Let's go!</button>
         </div>
      </div>
   )
}

export default Home
