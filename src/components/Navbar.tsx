import React from 'react'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-6 bg-transparent">
      {/* Logo y nombre a la izquierda */}
      <div className="flex items-center">
        <Image 
          src="/logo.jpg" 
          alt="DNXT LAB Logo" 
          width={32}
          height={32}
          className="mr-3"
        />
        <span className="text-white text-lg font-semibold" style={{
          color: '#FFF',
          fontSize: '18px',
          fontWeight: 600,
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
        }}>DNXT LAB</span>
      </div>
      
      {/* Icono hamburguesa a la derecha */}
      <div className="flex flex-col space-y-1.5 cursor-pointer">
        <div className="w-7 h-0.5 transition-all duration-300" style={{backgroundColor: '#FFF'}}></div>
        <div className="w-7 h-0.5 transition-all duration-300" style={{backgroundColor: '#FFF'}}></div>
        <div className="w-7 h-0.5 transition-all duration-300" style={{backgroundColor: '#FFF'}}></div>
      </div>
    </nav>
  )
} 