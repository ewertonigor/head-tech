import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'
import { beVietnamPro } from '@/fonts/beVietamPro'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'tamojunto',
  description: 'A revolução do Marketing por Influência',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${beVietnamPro.className} antialiased min-h-screen`}>
        <Toaster />
        {children}
      </body>
    </html>
  )
}
