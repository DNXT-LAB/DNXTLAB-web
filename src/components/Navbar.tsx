'use client'

import React from 'react'
import Image from 'next/image'

interface NavbarProps {
  isDark?: boolean
}

export default function Navbar({ isDark = false }: NavbarProps) {
  const handleMenuClick = () => {
    // Aquí se puede agregar lógica para abrir/cerrar el menú
    console.log('Menu clicked')
  }

  return (
    <nav className="w-full flex items-center justify-between transition-colors duration-500" role="navigation" aria-label="Navegación principal">
      {/* Logo y nombre a la izquierda */}
      <div className="flex items-center">
        <Image 
          src="/logo.jpg" 
          alt="DNXT LAB Logo" 
          width={32}
          height={32}
          className="mr-3"
          priority
          quality={90}
        />
        <span className={`text-lg font-semibold transition-colors duration-500 ${
          isDark ? 'text-black' : 'text-white'
        }`}>DNXT LAB</span>
      </div>
      
      {/* Botón hamburguesa a la derecha */}
      <button 
        onClick={handleMenuClick}
        className={`flex flex-col space-y-1.5 cursor-pointer p-2 focus:outline-none focus:ring-2 focus:ring-opacity-50 rounded transition-colors duration-500 ${
          isDark ? 'focus:ring-black' : 'focus:ring-white'
        }`}
        aria-label="Abrir menú de navegación"
        aria-expanded="false"
      >
        <div className={`w-7 h-0.5 transition-all duration-500 ${
          isDark ? 'bg-black' : 'bg-white'
        }`}></div>
        <div className={`w-7 h-0.5 transition-all duration-500 ${
          isDark ? 'bg-black' : 'bg-white'
        }`}></div>
        <div className={`w-7 h-0.5 transition-all duration-500 ${
          isDark ? 'bg-black' : 'bg-white'
        }`}></div>
      </button>
    </nav>
  )
} 