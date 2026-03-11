"use client"

import { Token } from "@/lib/tokens"

type Props = {
tokens: Token[]
selected?: Token
onSelect:(token:Token)=>void
}

export default function TokenSelector({
tokens,
selected,
onSelect
}:Props){

return(

<select
className="bg-black text-white p-2 rounded"
value={selected?.address}
onChange={(e)=>{

const token = tokens.find(
t => t.address === e.target.value
)

if(token) onSelect(token)

}}
>

{tokens.map((token)=>(

<option
key={token.address}
value={token.address}
>

{token.symbol}

</option>

))}

</select>

)

}