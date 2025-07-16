import React from 'react'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between">
      {/* Logo y nombre a la izquierda */}
      <div className="flex items-center">
        <Image 
          src="/logo.jpg" 
          alt="DNXT LAB Logo" 
          width={32}
          height={32}
          className="mr-3"
        />
        <span className="force-white-text text-lg font-semibold">DNXT LAB</span>
      </div>
      
      {/* Icono hamburguesa a la derecha */}
      <div className="flex flex-col space-y-1.5 cursor-pointer">
        <div className="w-7 h-0.5 bg-white transition-all duration-300"></div>
        <div className="w-7 h-0.5 bg-white transition-all duration-300"></div>
        <div className="w-7 h-0.5 bg-white transition-all duration-300"></div>
      </div>
    </nav>
  )
} 