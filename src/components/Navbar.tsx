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

  const menuButtonStyle: React.CSSProperties = isMenuOpen ? {
    background: 'rgba(141, 140, 140, 0.6)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  } : {};

  return (
    <nav className="relative fixed top-0 left-0 w-full flex items-center justify-between transition-colors duration-500 lg:px-12" role="navigation" aria-label="Main navigation">
      {/* Logo and name on the left */}
      <div
        className="flex items-center relative z-[51] lg:z-auto cursor-pointer"
        onClick={() => handleNavigation(0)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleNavigation(0);
          }
        }}
        aria-label="Go to home section"
      >
        <Image
          src="/logo.png"
          alt="DNXT LAB Logo"
          width={70}
          height={70}
          className="w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24"
          priority
          quality={90}
        />
        <span className={`text-2xl md:text-4xl lg:text-6xl font-bold font-poppins transition-colors duration-500 ${
          isDark ? 'text-black' : 'text-white'
        }`}>DNXT LAB</span>
      </div>
      
      {/* Desktop/Tablet Menu Container (md+) */}
      <div className="hidden md:flex justify-end items-center">
        <div
          className="flex items-center justify-end rounded-full transition-all duration-700 ease-in-out"
          style={isMenuOpen ? {
            background: 'rgba(141, 140, 140, 0.6)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          } : {}}
        >
          {/* Animated Menu Items */}
          <div className={`flex items-center transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap ${isMenuOpen ? 'max-w-xl px-6' : 'max-w-0'}`}>
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => handleNavigation(0)}
                className={`text-base lg:text-lg font-normal font-morien hover:opacity-70 transition-opacity ${isDark ? 'text-black' : 'text-white'}`}
              >
                HOME
              </button>
              <button 
                onClick={() => handleNavigation(3)}
                className={`text-base lg:text-lg font-normal font-morien hover:opacity-70 transition-opacity ${isDark ? 'text-black' : 'text-white'}`}
              >
                SERVICES
              </button>
              <button 
                onClick={() => handleNavigation(7)}
                className={`text-base lg:text-lg font-normal font-morien hover:opacity-70 transition-opacity ${isDark ? 'text-black' : 'text-white'}`}
              >
                BOOK A CALL
              </button>
            </div>
          </div>
          {/* Menu Toggle Button */}
          <button
            onClick={handleMenuClick}
            className="relative w-12 h-12 bg-transparent flex-shrink-0 flex items-center justify-center"
            aria-label={isMenuOpen ? "Close menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
          >
            <div className="relative w-6 h-6 flex flex-col justify-center items-center">
              {/* Hamburger to X Animation */}
              <div className={`h-0.5 transition-all duration-300 ease-in-out ${isDark ? 'bg-black' : 'bg-white'} ${isMenuOpen ? 'w-6 rotate-45 translate-y-0' : 'w-7 rotate-0 -translate-y-1.5'}`}></div>
              <div className={`w-7 h-0.5 transition-all duration-300 ease-in-out ${isDark ? 'bg-black' : 'bg-white'} ${isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}></div>
              <div className={`h-0.5 transition-all duration-300 ease-in-out ${isDark ? 'bg-black' : 'bg-white'} ${isMenuOpen ? 'w-7 -rotate-45 translate-y-[-4px]' : 'w-7 rotate-0 translate-y-1.5'}`}></div>
            </div>
          </button>
        </div>
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
          width: '100%',
          maxWidth: '100%',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <div className="flex flex-col w-full h-full p-8 relative">
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