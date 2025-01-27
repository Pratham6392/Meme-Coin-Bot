import axios from "axios";

const TWEET_MAX_TIME_MS = 60 * 60 * 1000;

interface Tweet {
    contents: string;
    id: string;
    createdAt: string;
}


export async function getTweets(userName: string): Promise<Tweet[]> {

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://twttrapi.p.rapidapi.com/user-tweets?username=${userName}`,
        headers: { 
        'x-rapidapi-host': 'twttrapi.p.rapidapi.com', 
        'x-rapidapi-key': process.env.RAPID_API_KEY
        }
    };
  
    const response = await axios.request(config) //responce.data is the data we need
    const timelineResponse = response.data.data.user_result.result.timeline_response.timeline.instructions.filter((x: any) => x.__typename === "TimelineAddEntries");

    const tweets: Tweet[] = [];
    timelineResponse[0].entries.map((x: any) => {
        try {
            tweets.push({
                contents: x.content.content.tweetResult.result.legacy.full_text ?? x.content.content.tweetResult.result.core.user_result.result.legacy.description,
                id: x.content.content.tweetResult.result.core.user_result.result.legacy.id_str,
                createdAt: x.content.content.tweetResult.result.legacy.created_at
            })
        } catch(e) {

        }
    });
  
   
    console.log("Current Time (ms):", Date.now());
    console.log("Threshold Time (ms):", Date.now() - TWEET_MAX_TIME_MS);
    
    const validTweets = tweets.filter(tweet => {
      const tweetTime = new Date(tweet.createdAt).getTime();
      console.log("Tweet Time:", tweetTime);
      const thresholdTime = Date.now() - TWEET_MAX_TIME_MS;
      console.log("Threshold Time:", thresholdTime);
      return tweetTime > Date.now() - TWEET_MAX_TIME_MS;
    });
    
    console.log("Valid Tweets:", validTweets);
    return validTweets;
}