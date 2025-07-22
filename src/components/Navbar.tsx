'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface NavbarProps {
  isDark?: boolean
  onNavigateToSection?: (section: number) => void
}

export default function Navbar({ isDark = false, onNavigateToSection }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleMenuClose = () => {
    setIsMenuOpen(false)
  }

  const handleNavigation = (section: number) => {
    if (onNavigateToSection) {
      onNavigateToSection(section)
    }
    setIsMenuOpen(false)
  }

  return (
    <nav className="w-full flex items-center justify-between transition-colors duration-500" role="navigation" aria-label="Navegación principal">
      {/* Logo y nombre a la izquierda */}
      <div className="flex items-center">
        <Image 
          src="/logo2.png" 
          alt="DNXT LAB Logo" 
          width={70}
          height={70}
          className=""
          priority
          quality={90}
        />
        <span className={`text-4xl font-bold transition-colors duration-500 ${
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

      {/* Menú desplegable - Efecto Glass */}
      <div 
        className={`fixed top-0 right-0 z-50 transition-transform duration-500 ease-out ${
          isMenuOpen ? 'transform translate-x-0' : 'transform translate-x-full'
        }`}
        style={{ 
          width: '400px',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '30px 0 0 30px'
        }}
      >
        <div className="flex flex-col h-full p-8 relative">
          {/* Botón X para cerrar */}
          <div className="flex justify-end mb-12">
            <button 
              onClick={handleMenuClose}
              className="text-white p-2"
              aria-label="Cerrar menú"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          </div>

          {/* Opciones del menú - Arriba */}
          <div className="flex flex-col space-y-8">
            <button 
              onClick={() => handleNavigation(0)}
              className="text-white text-xl font-normal font-morien text-left"
            >
              HOME
            </button>
            
            <button 
              onClick={() => handleNavigation(3)}
              className="text-white text-xl font-normal font-morien text-left"
            >
              SERVICES
            </button>
            
            <button 
              onClick={() => handleNavigation(7)}
              className="text-white text-xl font-normal font-morien text-left"
            >
              BOOK A CALL
            </button>
          </div>
        </div>
      </div>

      {/* Overlay para cerrar el menú al hacer click fuera */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={handleMenuClose}
          aria-hidden="true"
        ></div>
      )}
    </nav>
  )
} 