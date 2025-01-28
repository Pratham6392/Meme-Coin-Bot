
import {getTweets} from './getTweets'
require('dotenv').config()
import {getTokenFromLLM} from "./get-token-fromLLM"
import {LAMPORTS_PER_SOL} from '@solana/web3.js'
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


function getUsername() {
  
    const username = prompt("Please enter your username:");
  
  
    //This is the twitter Username of the person we want to check.
    //So this should be the username of the person who is tweeting about the token.
    
    if (username && username.trim()) {
      main(username.trim()); 
    } else {
      console.log("Invalid input. Please try again.");
    }
  }

  getUsername();