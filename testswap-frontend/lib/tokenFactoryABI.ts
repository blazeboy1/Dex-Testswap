export const tokenFactoryABI = [

{
name:"createToken",
type:"function",
stateMutability:"nonpayable",
inputs:[
{ name:"name", type:"string" },
{ name:"symbol", type:"string" },
{ name:"supply", type:"uint256" }
],
outputs:[
{ type:"address" }
]
},

{
name:"getAllTokens",
type:"function",
stateMutability:"view",
inputs:[],
outputs:[
{ type:"address[]" }
]
}

]