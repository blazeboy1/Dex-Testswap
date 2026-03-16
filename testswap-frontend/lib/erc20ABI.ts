export const erc20ABI = [

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
},

{
name:"approve",
type:"function",
stateMutability:"nonpayable",
inputs:[
{ name:"spender", type:"address" },
{ name:"amount", type:"uint256" }
],
outputs:[
{ type:"bool" }
]
},

{
name:"allowance",
type:"function",
stateMutability:"view",
inputs:[
{ name:"owner", type:"address" },
{ name:"spender", type:"address" }
],
outputs:[
{ type:"uint256" }
]
},

{
name:"decimals",
type:"function",
stateMutability:"view",
inputs:[],
outputs:[
{ type:"uint8" }
]
}

]