import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { baseSepolia } from "wagmi/chains"

export const config = getDefaultConfig({
  appName: "Dex TestSwap",
  projectId: "87445cef826cddd07bd535b44621d3bf",
  chains: [baseSepolia],
  ssr: true,
})