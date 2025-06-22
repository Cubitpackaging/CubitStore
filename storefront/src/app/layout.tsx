import { getBaseURL } from "@/lib/util/env"
import { retrieveCustomer } from "@/lib/data/customer"
import { Toaster } from "@medusajs/ui"
import { Analytics } from "@vercel/analytics/next"
import { GeistSans } from "geist/font/sans"
import { Metadata } from "next"

import "@/styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  // Retrieve customer data for chat widget (works for both logged-in and anonymous users)
  const customer = await retrieveCustomer().catch(() => null)

  return (
    <html lang="en" data-mode="light" className={GeistSans.variable}>
      <body>
        <main className="relative">{props.children}</main>
        <Toaster className="z-[99999]" position="bottom-left" />
                  <Analytics />

      </body>
    </html>
  )
}
