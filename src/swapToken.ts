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
   



}