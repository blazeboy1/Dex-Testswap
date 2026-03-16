export const pairABI = [

{
name:"getReserves",
type:"function",
stateMutability:"view",
inputs:[],
outputs:[
{ name:"reserve0", type:"uint112" },
{ name:"reserve1", type:"uint112" },
{ name:"blockTimestampLast", type:"uint32" }
]
},

{
name:"token0",
type:"function",
stateMutability:"view",
inputs:[],
outputs:[{ type:"address" }]
},

{
name:"token1",
type:"function",
stateMutability:"view",
inputs:[],
outputs:[{ type:"address" }]
},

{
name:"totalSupply",
type:"function",
stateMutability:"view",
inputs:[],
outputs:[{ type:"uint256" }]
},

{
name:"balanceOf",
type:"function",
stateMutability:"view",
inputs:[
{ name:"owner", type:"address" }
],
outputs:[
{ type:"uint256" }
]
}

]