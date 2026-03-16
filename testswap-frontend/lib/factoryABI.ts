export const factoryABI = [

{
name:"getPair",
type:"function",
stateMutability:"view",
inputs:[
{ name:"tokenA", type:"address" },
{ name:"tokenB", type:"address" }
],
outputs:[
{ type:"address" }
]
},

{
name:"allPairsLength",
type:"function",
stateMutability:"view",
inputs:[],
outputs:[
{ type:"uint256" }
]
},

{
name:"allPairs",
type:"function",
stateMutability:"view",
inputs:[
{ type:"uint256" }
],
outputs:[
{ type:"address" }
]
}

]