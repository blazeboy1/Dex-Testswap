import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAmountOut(
  amountIn: number,
  reserveIn: number,
  reserveOut: number
) {
  const amountInWithFee = amountIn * 999

  const numerator = amountInWithFee * reserveOut
  const denominator = reserveIn * 1000 + amountInWithFee

  return numerator / denominator
}