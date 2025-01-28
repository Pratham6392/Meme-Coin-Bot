import bs58 from "bs58";
import { Connection, Keypair, PublicKey, Transaction, VersionedTransaction } from '@solana/web3.js'
import { NATIVE_MINT, getAssociatedTokenAddress } from '@solana/spl-token'
import axios from 'axios'
import { API_URLS } from '@raydium-io/raydium-sdk-v2'

const isV0Tx= true

const connection = new Connection(process.env.RPC_URL!)
const owner = Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY!));

const slippage = 5;


export async function swapToken(tokenAddress: string , amount: number){
   
    const { data } = await axios.get<{
        id: string
        success: boolean
        data: { default: { vh: number; h: number; m: number } }
      }>(`${API_URLS.BASE_HOST}${API_URLS.PRIORITY_FEE}`);

    const { data: swapResponse } = await axios.get(
        `${
          API_URLS.SWAP_HOST
        }/compute/swap-base-in?inputMint=${NATIVE_MINT}&outputMint=${tokenAddress}&amount=${amount}&slippageBps=${
          slippage * 100}&txVersion=V0`
    );


}