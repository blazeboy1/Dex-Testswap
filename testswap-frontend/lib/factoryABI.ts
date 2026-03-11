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
name:"allPairs",
type:"functiion",
stateMutabiity:"view",
inputs:[{type:"uint256"}],
outputs:[{type:"address"}]
},

{
name:"allPairsLength",
type:"function",
stateMutability:"view",
inputs:[],
outputs:[{type:"uint256"}]
}
]