import { getAllPairsLength,getPairByIndex } from "./factoryService"
import { getPairTokens } from "./pairService"

export async function discoverTokens(){

  const tokens: any[] = []

  const length = await getAllPairsLength()

  for(let i=0;i<Number(length);i++){

    const pair = await getPairByIndex(i)

    const { token0, token1 } = await getPairTokens(pair as `0x${string}`)

    if(!tokens.find(t=>t.address===token0)){
      tokens.push({ symbol:"TOKEN", address:token0 })
    }

    if(!tokens.find(t=>t.address===token1)){
      tokens.push({ symbol:"TOKEN", address:token1 })
    }

  }

  return tokens

}