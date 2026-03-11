export const pairABI = [
  {
    name: "getReserves",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "reserve0", type: "uint112" },{ name: "reserve1", type: "uint112" }]
  },

  {
    name:"balanceOf",
    type:"function",
    stateMutability:"view",
    inputs:[{name:"owner","type":"address"}],
    outputs:[{type:"uint256"}]
  },

  {
    name:"totalSupply",
    type:"function",
    stateMutability:"view",
    inputs:[],
    outputs:[{type:"uint256"}]
  }

] as const