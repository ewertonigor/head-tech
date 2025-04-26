import type { Metadata } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'tamojunto',
  description: 'A revolução do Marketing por Influência',
}

export const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${beVietnamPro.className} antialiased max-w-[1440px]`}>
        {children}
      </body>
    </html>
  )
}
