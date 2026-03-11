import Navbar from "@/components/Navbar"
import SwapBox from "@/components/SwapBox"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center mt-20 px-4">
          <SwapBox />
      </div>
    </main>
  )
}