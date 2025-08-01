import React from 'react'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.png',
  },
  title: 'DNXTLAB Web',
  description: 'DNXTLAB Web Application - Bespoke AI & Web Design Solutions',
  keywords: ['AI', 'Web Design', 'Automation', 'Digital Solutions'],
  authors: [{ name: 'DNXTLAB' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${poppins.variable} min-h-full w-full bg-black`}>
      <body 
        className={`${poppins.className} min-h-full w-full overflow-x-hidden bg-black`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  )
} 