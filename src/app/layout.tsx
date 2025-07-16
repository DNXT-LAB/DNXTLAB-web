import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DNXTLAB Web',
  description: 'DNXTLAB Web Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="h-full w-full">
      <body className={`${inter.className} h-full w-full m-0 p-0 overflow-hidden`}>
        {children}
      </body>
    </html>
  )
} 