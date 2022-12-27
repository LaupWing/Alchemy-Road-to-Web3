import type { NextPage } from "next"
import { useState } from "react"

const Home: NextPage = () => {
   const [wallet, setWallet] = useState("")

   return (
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
         <div>
            <input 
               type="text" 
               onChange={e => setWallet(e.target.value)}
               placeholder="Add your wallet address"
               value={wallet}
            />
            <input 
               type="text" 
               placeholder="Add your collection address"
            />
            <label htmlFor="checkbox">
               <input 
                  type="checkbox" 
                  name="checkbox" 
                  id="checkbox" 
               />
            </label>
            <button>Let's go!</button>
         </div>
      </div>
   )
}

export default Home
