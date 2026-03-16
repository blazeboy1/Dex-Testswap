import "../styles/globals.css"
import Navbar from "@/components/layout/Navbar"
import { Providers } from "./providers"

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body>

        <Providers>

          <Navbar />

          <main className="px-6 pt-24 pb-16 max-w-7xl mx-auto">
            {children}
          </main>

        </Providers>
        
      </body>
    </html>
  )
}