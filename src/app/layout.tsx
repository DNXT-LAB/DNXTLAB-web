import React from 'react'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
// import ScrollIndicator from '../components/ScrollIndicator'

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
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} min-h-full w-full bg-black`}>
      <body 
        className={`${poppins.className} min-h-full w-full overflow-x-hidden bg-black`}
        suppressHydrationWarning={true}
      >
        <style
          // Desactiva el zoom (transform) del video de fondo en móviles y iPad
          dangerouslySetInnerHTML={{
            __html: `@media (max-width: 1024px) { video[aria-label="Background video showing DNXTLAB solutions"] { transform: none !important; } }`
          }}
        />
        {/* <ScrollIndicator /> */}
        {children}
      </body>
    </html>
  )
} 