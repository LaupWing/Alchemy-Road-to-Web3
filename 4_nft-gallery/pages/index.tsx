import type { NextPage } from "next"
import { useState } from "react"
import NftCard from "../components/NftCard"

const Home: NextPage = () => {
   const [walletAddress, setWalletAddress] = useState("")
   const [collectionAddress, setCollectionAddress] = useState("")
   const [nfts, setNfts] = useState([])
   const [fetchForCollection, setFetchForCollection] = useState(false)

   const api_key = "A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM"
   const requestOptions = {
      method: "GET"
   }
   
   const fetchNfts = async () => {
      let nfts
      console.log("Fetching nfts")
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`
      
      
      if(!collectionAddress.length){
         const fetchUrl = `${baseURL}?owner=${walletAddress}`
         nfts = await fetch(fetchUrl, requestOptions).then(data => data.json())
      }else{
         console.log("Fetching nfts for collection owned by address")
         const fetchUrl = `${baseURL}?owner=${walletAddress}&contractAddresses%5B%5D=${collectionAddress}`
         nfts = await fetch(fetchUrl, requestOptions).then(data => data.json())
      }
      
      if(nfts){
         setNfts(nfts.ownedNfts)
      }
   }
   
   const fetchNftsForCollection = async () =>{
      if(collectionAddress.length){
         const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`
         const fetchUrl = `${baseURL}?contractAddress=${collectionAddress}&withMetadata=true`
         const nfts = await fetch(fetchUrl, requestOptions).then(data => data.json())

         if(nfts){
            console.log("NFTS in collection", nfts)
            setNfts(nfts.nfts)
         }
      }
   }

   return (
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
         <div>
            <input 
               type="text" 
               onChange={e => setWalletAddress(e.target.value)}
               placeholder="Add your wallet address"
               value={walletAddress}
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
                  onChange={e => setFetchForCollection(e.target.checked)}
               />
               Fetch for collection
            </label>
            <button onClick={() => {
               if(fetchForCollection){
                  fetchNftsForCollection()
               }else{
                  fetchNfts()
               }
            }}>Let's go!</button>
         </div>
         <div>
            {nfts.map((nft:any)=> (
               <NftCard nft={nft}/>
            ))}
         </div>
      </div>
   )
}

export default Home
