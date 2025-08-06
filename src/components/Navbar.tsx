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

  const menuContainerStyle: React.CSSProperties = {
    background: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  };

  const menuButtonStyle: React.CSSProperties = isMenuOpen ? {
    background: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  } : {};

  return (
    <nav className="w-full flex items-center justify-between transition-colors duration-500 lg:px-12" role="navigation" aria-label="Main navigation">
      {/* Logo and name on the left */}
      <div className="flex items-center relative z-[51] lg:z-auto">
        <Image 
          src="/logo.png" 
          alt="DNXT LAB Logo" 
          width={70}
          height={70}
          className="w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24"
          priority
          quality={90}
        />
        <span className={`text-2xl md:text-4xl lg:text-6xl font-bold transition-colors duration-500 ${
          isDark ? 'text-black' : 'text-white'
        }`}>DNXT LAB</span>
      </div>
      
      {/* Desktop Menu Container - Only visible on md+ */}
      <div className="hidden md:flex items-center">
        {/* Menu Items - Appear to the left of button with green background */}
        <div className={`flex items-center transition-all duration-500 ease-out ${
          isMenuOpen 
            ? 'opacity-100 translate-x-0 scale-100' 
            : 'opacity-0 translate-x-4 scale-95 pointer-events-none'
        }`} style={{ marginRight: '2px' }}>
          <div className="flex items-center rounded-full px-6 py-2 space-x-6" style={menuContainerStyle}>
            <button 
              onClick={() => handleNavigation(0)}
              className="text-white text-base lg:text-lg font-normal font-morien hover:opacity-70 transition-opacity whitespace-nowrap"
            >
              HOME
            </button>
            
            <button 
              onClick={() => handleNavigation(3)}
              className="text-white text-base lg:text-lg font-normal font-morien hover:opacity-70 transition-opacity whitespace-nowrap"
            >
              SERVICES
            </button>
            
            <button 
              onClick={() => handleNavigation(7)}
              className="text-white text-base lg:text-lg font-normal font-morien hover:opacity-70 transition-opacity whitespace-nowrap"
            >
              BOOK A CALL
            </button>
          </div>
        </div>

        {/* Plus/X Button for Desktop - Fixed position */}
        <button 
          onClick={handleMenuClick}
          className={`lg:mr-20 w-12 h-12 flex items-center justify-center transition-all duration-300 ${
            isMenuOpen ? 'rounded-full' : 'bg-transparent'
          } focus:outline-none focus:ring-opacity-50 ${
            isDark ? '' : 'focus:ring-white'
          }`}
          style={menuButtonStyle}
          aria-label={isMenuOpen ? "Close menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
        >
          <div className="relative w-6 h-6 flex flex-col justify-center items-center">
            {/* Hamburger to X Animation */}
            {/* Top line */}
            <div className={`h-0.5 transition-all duration-300 ease-in-out ${
              isDark ? 'bg-black' : 'bg-white'
            } ${
              isMenuOpen 
                ? 'w-6 rotate-45 translate-y-0' 
                : 'w-7 rotate-0 -translate-y-1.5'
            }`}></div>
            
            {/* Middle line */}
            <div className={`w-7 h-0.5 transition-all duration-300 ease-in-out ${
              isDark ? 'bg-black' : 'bg-white'
            } ${
              isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
            }`}></div>
            
            {/* Bottom line */}
            <div className={`h-0.5 transition-all duration-300 ease-in-out ${
              isDark ? 'bg-black' : 'bg-white'
            } ${
              isMenuOpen 
                ? 'w-7 -rotate-45 translate-y-[-4px]' 
                : 'w-7 rotate-0 translate-y-1.5'
            }`}></div>
          </div>
        </button>
      </div>

      {/* Mobile Plus/X Button - Only visible on mobile */}
      <button 
        onClick={handleMenuClick}
        className={`md:hidden w-10 h-10 flex items-center justify-center transition-all duration-300 ${
          isMenuOpen ? 'rounded-full' : 'bg-transparent'
        } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
          isDark ? 'focus:ring-black' : 'focus:ring-white'
        }`}
        style={menuButtonStyle}
        aria-label={isMenuOpen ? "Close menu" : "Open navigation menu"}
        aria-expanded={isMenuOpen}
      >
        <div className="relative w-5 h-5 flex flex-col justify-center items-center">
          {/* Hamburger to X Animation */}
          {/* Top line */}
          <div className={`h-0.5 transition-all duration-300 ease-in-out ${
            isDark ? 'bg-black' : 'bg-white'
          } ${
            isMenuOpen 
              ? 'w-4 rotate-45 translate-y-0' 
              : 'w-6 rotate-0 -translate-y-1'
          }`}></div>
          
          {/* Middle line */}
          <div className={`w-6 h-0.5 transition-all duration-300 ease-in-out ${
            isDark ? 'bg-black' : 'bg-white'
          } ${
            isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
          }`}></div>
          
          {/* Bottom line */}
          <div className={`h-0.5 transition-all duration-300 ease-in-out ${
            isDark ? 'bg-black' : 'bg-white'
          } ${
            isMenuOpen 
              ? 'w-4 -rotate-45 translate-y-0' 
              : 'w-6 rotate-0 translate-y-1'
          }`}></div>
        </div>
      </button>

      {/* Mobile Dropdown menu - Glass effect - Only visible on mobile/tablet */}
      <div 
        className={`md:hidden fixed top-0 right-0 z-50 transition-transform duration-500 ease-out ${
          isMenuOpen ? 'transform translate-x-0' : 'transform translate-x-full'
        }`}
        style={{ 
          width: '100vw',
          maxWidth: '400px',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '30px 0 0 30px'
        }}
      >
        <div className="flex flex-col h-full p-8 relative">
          {/* X button to close */}
          <div className="flex justify-end mb-12">
            <button 
              onClick={handleMenuClose}
              className="text-white p-2"
              aria-label="Close menu"
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

          {/* Menu options - Top */}
          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-28 md:space-y-8 mt-40 md:mt-0">
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

      {/* Overlay to close menu when clicking outside - Mobile only */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40"
          onClick={handleMenuClose}
          aria-hidden="true"
        ></div>
      )}
    </nav>
  )
} 