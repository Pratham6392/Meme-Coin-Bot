
import {getTweets} from './getTweets'
require('dotenv').config()
import {getTokenFromLLM} from "./get-token-fromLLM"
import {LAMPORTS_PER_SOL} from '@solana/web3.js'
// import swapToken from "./swapToken"

import OpenAI from 'openai'
import {swapTokens} from "./swapToken"


const SOL_AMOUNT = 1*LAMPORTS_PER_SOL

export async function main(username: string){
    const newTweets = await getTweets(username);
    console.log(newTweets)
    for(const tweet of newTweets){
        const tokenAddress= await getTokenFromLLM(tweet.contents)
       if(tokenAddress !== "null"){
              swapTokens(tokenAddress, SOL_AMOUNT)
       }
       
    }



   
   

     


}


main("elonmusk")