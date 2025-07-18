'use client'

import React, { useRef, useEffect, useState } from 'react'
import Navbar from './Navbar'

export default function VideoContent() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [windowHeight, setWindowHeight] = useState(800) // Valor por defecto

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      // Asegurar que el video se reproduce correctamente
      video.play().catch(error => {
        console.warn('Error al reproducir video:', error)
      })
    }

    // Establecer altura inicial de la ventana
    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
    }

    const handleResize = () => {
      setWindowHeight(window.innerHeight)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('resize', handleResize)
      
      return () => {
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleResize)
      }
    }
    
    return () => {} // Fix para el error de TypeScript
  }, [])

  // Calcular la posición de la pestaña basada en el scroll
  const scrollThreshold = 100 // Píxeles de scroll antes de que aparezca la pestaña
  const maxScroll = Math.max(400, windowHeight * 0.5) // Mínimo 400px o 50% de la altura
  const adjustedScroll = Math.max(0, scrollY - scrollThreshold)
  const tabProgress = Math.max(0, Math.min(adjustedScroll / maxScroll, 1))
  
  // La pestaña se mueve de 100% (completamente oculta) a 0% (completamente visible)
  const tabTransform = scrollY < scrollThreshold ? 
    100 : // Completamente oculta hasta alcanzar threshold
    100 - (tabProgress * 100) // Después aparece gradualmente
  
  // Efectos animados basados en scroll - mismo ritmo para video y texto
  const animationProgress = Math.max(0, Math.min(scrollY / 600, 1)) // Mismo progreso para ambos
  
  // Función easing suave para hacer la animación más natural
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
  const smoothProgress = easeOutCubic(animationProgress)
  
  // Efecto para las letras (escala más pequeña: de 0.1 a 1) - mismo ritmo que video
  const textScale = 0.1 + (smoothProgress * 0.9)
  
  // Efecto para el video (rotación y escala)
  const videoRotation = 45 - (smoothProgress * 45)
  const videoScale = 0.5 + (smoothProgress * 0.5)

  return (
    <div className="relative w-screen bg-black">
      {/* Video Background - Fixed para que siempre esté de fondo */}
      <video
        ref={videoRef}
        className="fixed inset-0 w-full h-full object-cover z-0"
        src="/video.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-label="Video de fondo mostrando las soluciones de DNXTLAB"
      />
      
      {/* Overlay para mejorar legibilidad */}
      <div className="fixed inset-0 bg-black/30 z-10" aria-hidden="true"></div>
      
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-40 p-8">
        <Navbar />
      </div>
      
      {/* Contenido principal - FIJO para que no se mueva, más abajo a la izquierda */}
      <div className="fixed left-8 z-20" style={{ bottom: '1.5rem' }}>
        <div className="flex flex-col items-start max-w-title">
          <h1 className="force-white-text font-bold mb-8 uppercase font-morien text-main-title line-height-90">
            BESPOKE AI & WEB<br />
            DESIGN SOLUTIONS
          </h1>
          <p className="force-white-text mb-8 font-inter text-description font-normal line-height-110 max-w-description">
            Empowering businesses through intelligent automation, data-driven experiences, and future-proof digital design.
          </p>
          <button 
            className="flex items-center justify-center hover:opacity-90 transition-opacity bg-white rounded-full button-size border-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Ver servicios de DNXTLAB"
          >
            <span className="force-black-text font-morien text-button font-light line-height-110 mr-3">
              SERVICES
            </span>
            <svg 
              className="svg-size" 
              viewBox="0 0 37 37" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="18.5" cy="18.5" r="18.5" fill="black"/>
              <path d="M10.5146 18C9.96236 18 9.51465 18.4477 9.51465 19C9.51465 19.5523 9.96236 20 10.5146 20V18ZM28.1923 19.7071C28.5828 19.3166 28.5828 18.6834 28.1923 18.2929L21.8283 11.9289C21.4378 11.5384 20.8047 11.5384 20.4141 11.9289C20.0236 12.3195 20.0236 12.9526 20.4141 13.3431L26.071 19L20.4141 24.6569C20.0236 25.0474 20.0236 25.6805 20.4141 26.0711C20.8047 26.4616 21.4378 26.4616 21.8283 26.0711L28.1923 19.7071ZM10.5146 19V20H27.4852V19V18H10.5146V19Z" fill="white"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Pestaña blanca que se desliza desde abajo */}
      <div 
        className="fixed left-0 right-0 z-50 transition-transform duration-500 ease-out"
        style={{
          transform: `translateY(${tabTransform}%)`,
          borderRadius: '24px 24px 0 0',
          height: `calc(100vh - 100px)`, // Desde navbar (100px) hasta abajo
          top: '100px', // Empieza desde el navbar
          width: '100vw',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.3)'
        }}
      >
        
        <div 
          className="relative"
          style={{
            position: 'absolute',
            width: '1817px',
            height: '861px',
            left: '60px',
            top: '60px'
          }}
        >
          {/* Video con posición absoluta y efectos animados */}
          <video 
            src="/video.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="auto" 
            className="object-cover shadow-2xl transition-transform duration-700 ease-out rounded-2xl"
            style={{
              position: 'absolute',
              width: '612px',
              height: '630px',
              left: '60px',
              // top: '154px',
              transform: `rotate(${videoRotation}deg) scale(${videoScale})`,
              transformOrigin: 'center center'
            }}
          ></video>
          
          {/* Contenido del lado derecho con efectos animados */}
          <div 
            className="transition-transform duration-700 ease-out"
            style={{ 
              position: 'absolute',
              width: '947px',
              height: '753px',
              left: '780px',
              // top: 'calc(50% - 753px/2 + 44.5px)',
              transform: `scale(${textScale})`,
              transformOrigin: 'center center'
            }}
          >
            <h2 className="text-7xl font-bold text-black font-morien mb-6 leading-tight">
              WE BUILD WITH<br/>INTELLIGENCE AND<br/>INTENT
            </h2>
            <p className="text-4xl text-gray-700 font-inter mb-8 leading-tight">
              Smart systems. Seamless design.<br/>Real results.
            </p>
            <p className="text-xl text-gray-600 font-inter max-w-3xl mb-12 leading-relaxed">
              At DNXT LAB, we create intelligent digital solutions that think, adapt, and scale—combining AI automation, UX strategy, and high-performance web design to help you launch faster, work smarter, and grow stronger.
            </p>
            <button 
              className="text-lg px-10 py-5 bg-black text-white rounded-full font-morien hover:bg-gray-800 transition-colors flex items-center gap-4"
            >
              SERVICES
              <svg 
                className="w-6 h-6" 
                viewBox="0 0 37 37" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="18.5" cy="18.5" r="18.5" fill="white"/>
                <path d="M10.5146 18C9.96236 18 9.51465 18.4477 9.51465 19C9.51465 19.5523 9.96236 20 10.5146 20V18ZM28.1923 19.7071C28.5828 19.3166 28.5828 18.6834 28.1923 18.2929L21.8283 11.9289C21.4378 11.5384 20.8047 11.5384 20.4141 11.9289C20.0236 12.3195 20.0236 12.9526 20.4141 13.3431L26.071 19L20.4141 24.6569C20.0236 25.0474 20.0236 25.6805 20.4141 26.0711C20.8047 26.4616 21.4378 26.4616 21.8283 26.0711L28.1923 19.7071ZM10.5146 19V20H27.4852V19V18H10.5146V19Z" fill="black"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Contenido invisible para activar scroll */}
      <div className="relative z-0 bg-transparent" style={{ height: '200vh' }}>
        {/* Espacio para activar scroll */}
      </div>
      
      {/* Contenido adicional para asegurar scroll */}
      <div className="relative z-0 bg-transparent" style={{ height: '100vh' }}>
        {/* Más espacio para scroll */}
      </div>
    </div>
  )
} 