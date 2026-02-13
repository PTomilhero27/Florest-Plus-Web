import type { Metadata } from "next"
import { Baloo_2, Poppins } from "next/font/google"
import "./globals.css"

const baloo = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Florest Plus",
  description: "Venda de árvores com impacto ambiental",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${baloo.variable} ${poppins.variable} min-h-dvh w-full overflow-x-hidden antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
