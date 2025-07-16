import React from 'react'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

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
    <html lang="es" className="h-full w-full bg-black">
      <body className={`${poppins.className} h-full w-full m-0 p-0 overflow-hidden bg-black`}>
        {children}
      </body>
    </html>
  )
} 