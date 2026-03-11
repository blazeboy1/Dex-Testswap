import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { baseSepolia } from "wagmi/chains"

export const config = getDefaultConfig({
  appName: "TestSwap",
  projectId: "testswap",
  chains: [baseSepolia],
})