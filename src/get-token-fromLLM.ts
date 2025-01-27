import OpenAI from "openai";


export async function getTokenFromLLM(tweet: string): Promise<string> {
     const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: process.env.LLM_API_KEY
     });
     const completion = await openai.chat.completions.create({
             messages:    [{ role: "system",
                     content: "You are an AI agent that needs to tell me if this tweet is about buying a token. Return me either the address of the solana token, or return me null if you cant find a solana token address in this tweet. Only return if it says it is a bull post. The token address will be very visible in the tweet." },
                     {
                     role: "user",
                     content: tweet,
                     }],
             model: "deepseek-chat",
             store: true
            });

            
     return completion.choices[0].message.content ?? "null"


}