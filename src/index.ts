
import {getTweets} from './getTweets'
require('dotenv').config()

import OpenAI from 'openai'

const TWEET_MAX_TIME_MS = 24 * 60 * 60 * 1000 

export async function main(username: string){
    const newTweets = await getTweets(username);
    console.log(newTweets)
    const recentTweets= newTweets.map(tweet => new  Date(tweet.createdAt).getTime() > Date.now() - TWEET_MAX_TIME_MS)
    console.log("objectss", Date.now()- TWEET_MAX_TIME_MS)
    console.log("object", recentTweets)
    const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: process.env.LLM_API_KEY
     });
     


}


main("elonmusk")