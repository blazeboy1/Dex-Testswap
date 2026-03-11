export type Token = {
  symbol: string
  name: string
  address: `0x${string}`
  decimals: number
}

import { contracts } from "./contracts"

export const TOKENS: Token[] = [
{
symbol:"USDC",
name:"USD Coin",
address:contracts.usdc,
decimals:6
},

{
symbol:"USDT",
name:"Tether",
address:contracts.usdt,
decimals:6
}
]