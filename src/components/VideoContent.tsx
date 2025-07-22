'use client'

import React, { useRef, useEffect, useState } from 'react'
import Navbar from './Navbar'

export default function VideoContent() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [windowHeight, setWindowHeight] = useState(800) // Valor por defecto
  const [currentSection, setCurrentSection] = useState(0) // Nueva state para controlar la sección actual
  const [isTransitioning, setIsTransitioning] = useState(false) // Para evitar múltiples transiciones

  // Definir las posiciones exactas de cada sección
  const sectionPositions = [
    0,     // Sección 0: Video completo
    370,   // Sección A: Primera pestaña (reducido de 600 a 400)
    1000,  // Sección B: Strategic Flexibility (ajustado proporcionalmente)
    1600,  // Sección C inicial: Texto completo (ajustado proporcionalmente)
    2400,  // Sección C con Card 1 centrada (ajustado proporcionalmente)
    3200,  // Sección C con Card 2 centrada (ajustado proporcionalmente)
    4000,  // Sección C con Card 3 centrada (ajustado proporcionalmente)
    4800   // Sección D: Formulario (ajustado proporcionalmente)
  ]

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
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      
      // Evitar múltiples transiciones rápidas
      if (isTransitioning) return
      
      setIsTransitioning(true)
      
      if (e.deltaY > 0) {
        // Scroll hacia abajo
        setCurrentSection(prev => Math.min(prev + 1, sectionPositions.length - 1))
      } else {
        // Scroll hacia arriba
        setCurrentSection(prev => Math.max(prev - 1, 0))
      }
      
      // Permitir nueva transición después de 800ms
      setTimeout(() => setIsTransitioning(false), 800)
    }

    const handleResize = () => {
      setWindowHeight(window.innerHeight)
    }

    if (typeof window !== 'undefined') {
      // Actualizar scrollY basado en la sección actual con transición suave
      const targetPosition = sectionPositions[currentSection]
      if (targetPosition !== undefined) {
        // Transición suave al nuevo scroll
        const startPosition = scrollY
        const duration = 800
        const startTime = performance.now()
        
        const animateScroll = (currentTime: number) => {
          const elapsed = currentTime - startTime
          const progress = Math.min(elapsed / duration, 1)
          
          // Easing function (ease-out-cubic)
          const easeProgress = 1 - Math.pow(1 - progress, 3)
          
          const newScrollY = startPosition + (targetPosition - startPosition) * easeProgress
          setScrollY(newScrollY)
          
          if (progress < 1) {
            requestAnimationFrame(animateScroll)
          }
        }
        
        requestAnimationFrame(animateScroll)
      }
      
      window.addEventListener('wheel', handleWheel, { passive: false })
      window.addEventListener('resize', handleResize)
      
      return () => {
        window.removeEventListener('wheel', handleWheel)
        window.removeEventListener('resize', handleResize)
      }
    }
    
    return () => {} // Fix para el error de TypeScript
  }, [currentSection, scrollY, isTransitioning])

  // Calcular la posición de la pestaña basada en el scroll
  const scrollThreshold = 60 // Píxeles de scroll antes de que aparezca la pestaña (reducido de 100 a 60)
  const maxScroll = Math.max(300, windowHeight * 0.4) // Mínimo 300px o 40% de la altura (reducido)
  const adjustedScroll = Math.max(0, scrollY - scrollThreshold)
  const tabProgress = Math.max(0, Math.min(adjustedScroll / maxScroll, 1))
  
  // Efectos animados basados en scroll - nivel 1 (primera sección)
  // const animationProgress = Math.max(0, Math.min(scrollY / 600, 1)) // Primer nivel
  
  // Función easing suave para hacer la animación más natural
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
  
  // Segundo nivel de scroll (después de 400px) - transición Sección A → Sección B
  const secondLevelStart = 400
  const secondLevelProgress = Math.max(0, Math.min((scrollY - secondLevelStart) / 400, 1))
  const secondSmoothProgress = easeOutCubic(secondLevelProgress)
  
  // Tercer nivel de scroll (después de 1000px) - transición Sección B → Sección C
  const thirdLevelStart = 1000
  const thirdLevelProgress = Math.max(0, Math.min((scrollY - thirdLevelStart) / 400, 1))
  const thirdSmoothProgress = easeOutCubic(thirdLevelProgress)
  
  // Cuarto nivel de scroll (después de 1600px) - efecto de carta moviéndose al centro
  const fourthLevelStart = 1600
  const fourthLevelProgress = Math.max(0, Math.min((scrollY - fourthLevelStart) / 800, 1)) // Más espacio para las 3 cartas
  const fourthSmoothProgress = easeOutCubic(fourthLevelProgress)
  
  // Quinto nivel de scroll (después de 2400px) - transición a las 3 cartas
  const fifthLevelStart = 2400
  const fifthLevelProgress = Math.max(0, Math.min((scrollY - fifthLevelStart) / 800, 1))
  const fifthSmoothProgress = easeOutCubic(fifthLevelProgress)
  
  // Sexto nivel de scroll (después de 3200px) - transición final
  const sixthLevelStart = 3200
  const sixthLevelProgress = Math.max(0, Math.min((scrollY - sixthLevelStart) / 800, 1))
  const sixthSmoothProgress = easeOutCubic(sixthLevelProgress)
  
  // Séptimo nivel de scroll (después de 4000px) - transición a formulario
  const seventhLevelStart = 4000
  const seventhLevelProgress = Math.max(0, Math.min((scrollY - seventhLevelStart) / 800, 1))
  const seventhSmoothProgress = easeOutCubic(seventhLevelProgress)
  
  // La pestaña respeta el navbar inicialmente, luego ocupa toda la pantalla
  const navbarHeight = 80 // Altura aproximada del navbar
  const tabTransform = scrollY < scrollThreshold ? 
    100 : // Completamente oculta hasta alcanzar threshold
    100 - (tabProgress * 100) // Aparece gradualmente
  
  // Altura de la pestaña: respeta navbar hasta que aparezca sección B
  const tabHeight = scrollY < secondLevelStart ? `calc(100vh - ${navbarHeight}px)` : '100vh'
  const tabTop = scrollY < secondLevelStart ? `${navbarHeight}px` : '0px'
  
  // SECCION A - Variables para transformaciones
  const sectionATranslateY = scrollY < secondLevelStart ? 0 : -(secondSmoothProgress * 600)
  const sectionAScale = scrollY < secondLevelStart ? 1 : 1 - (secondSmoothProgress * 0.9)
  
  // Video y texto convergen al centro
  const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 800
  const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 400
  const videoOriginalLeft = 60 + 60 + 306
  const videoOriginalTop = 154 + 255
  const videoConvergeX = scrollY < secondLevelStart ? 0 : (centerX - videoOriginalLeft) * secondSmoothProgress
  const videoConvergeY = scrollY < secondLevelStart ? 0 : (centerY - videoOriginalTop) * secondSmoothProgress
  const textOriginalLeft = 60 + 780 + 473
  const textOriginalTop = 400
  const textConvergeX = scrollY < secondLevelStart ? 0 : (centerX - textOriginalLeft) * secondSmoothProgress
  const textConvergeY = scrollY < secondLevelStart ? 0 : (centerY - textOriginalTop) * secondSmoothProgress
  
  // Variables simplificadas para las transiciones

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
      <div className="fixed top-0 left-0 right-0 z-60 p-8">
        <Navbar isDark={secondSmoothProgress > 0.3} />
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
        className="fixed left-0 right-0 z-50 transition-all duration-500 ease-out"
        style={{
          transform: `translateY(${tabTransform}%)`,
          borderRadius: scrollY > scrollThreshold ? '0px' : '24px 24px 0 0',
          height: tabHeight,
          top: tabTop,
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
          }}
        >
          {/* SECCION A */}
          <div 
            style={{ 
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: '0',
              left: '0',
              transform: `translateY(${sectionATranslateY}px) scale(${sectionAScale})`,
              opacity: secondSmoothProgress > 0.7 ? 0 : 1 - (secondSmoothProgress * 1.2),
              visibility: secondSmoothProgress > 0.8 ? 'hidden' : 'visible',
              transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              willChange: 'transform, opacity'
            }}
          >
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
                height: '510px',
                left: '60px',
                top: '104px',
                transform: `translateY(${sectionATranslateY + videoConvergeY}px) translateX(${videoConvergeX}px) scale(${sectionAScale})`,
                transformOrigin: 'center center',
                opacity: secondSmoothProgress > 0.7 ? 0 : 1 - (secondSmoothProgress * 1.2)
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
                top: 'calc(50% - 853px/2 + 44.5px)',
                transform: `translateY(${sectionATranslateY + textConvergeY}px) translateX(${textConvergeX}px) scale(${sectionAScale})`,
                transformOrigin: 'center center',
                opacity: secondSmoothProgress > 0.7 ? 0 : 1 - (secondSmoothProgress * 1.2)
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
          
          {/* SECCION B - Strategic Flexibility */}
          <div 
            style={{ 
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, ${secondSmoothProgress < 0.3 ? '100%' : '-50%'}) translateY(${thirdSmoothProgress > 0.3 ? -(thirdSmoothProgress * 400) : 0}px)`,
              transformOrigin: 'center center',
              opacity: secondSmoothProgress < 0.2 ? 0 : (thirdSmoothProgress > 0.3 ? Math.max(0, 1 - (thirdSmoothProgress * 1.5)) : 1),
              visibility: secondSmoothProgress > 0.1 && thirdSmoothProgress < 0.9 ? 'visible' : 'hidden',
              transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              willChange: 'transform, opacity'
            }}
          >
            <div className="h-full">
              <div className="flex justify-center mb-8 mt-12 mr-40">
                <p className="text-lg font-inter text-gray-600 uppercase tracking-wider">STRATEGIC FLEXIBILITY</p>
              </div>
              
              {/* Video debajo del título */}
              <div className="mb-12">
                <video 
                  src="/video.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  preload="auto" 
                  className="object-cover rounded-2xl shadow-lg"
                  style={{
                    width: '87%',
                    height: '500px',
                    background: 'linear-gradient(135deg, #0891b2 0%, #1e40af 50%, #7c3aed 100%)'
                  }}
                ></video>
              </div>
              
              {/* Título y descripción */}
              <div className="text-center w-full max-w-[1400px] ml-32">
                <h2 className="text-5xl font-bold text-black font-morien mb-8 whitespace-nowrap">
                  Solutions That Evolve With Your Business
                </h2>
                <p className="text-xl text-gray-600 font-inter mx-auto" style={{ maxWidth: '1200px' }}>
                  At DNXT LAB, we don't sell tools—we design intelligent frameworks tailored to your operations. By blending technical depth with strategic foresight, we ensure every AI or digital solution evolves with your business and supports long-term growth.
                </p>
              </div>
            </div>
          </div>
          
          {/* SECCION C */}
          <div 
            style={{ 
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) translateY(${seventhSmoothProgress > 0.2 ? -(seventhSmoothProgress * 600) : 0}px)`,
              transformOrigin: 'center center',
              opacity: thirdSmoothProgress < 0.2 ? 0 : (seventhSmoothProgress > 0.2 ? Math.max(0, 1 - (seventhSmoothProgress * 2)) : 1),
              visibility: thirdSmoothProgress > 0.1 && seventhSmoothProgress < 0.9 ? 'visible' : 'hidden',
              transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              willChange: 'transform, opacity'
            }}
          >
            <div className="flex w-full h-full px-16">
              {/* Lado izquierdo - Contenido principal */}
              <div 
                className="flex-1 pl-8"
                style={{
                  transform: `translateY(${thirdSmoothProgress < 0.5 ? (1 - thirdSmoothProgress) * 300 : 0}px) translateX(${thirdSmoothProgress < 0.5 ? (1 - thirdSmoothProgress) * -150 : 0}px)`,
                  opacity: Math.min(1, thirdSmoothProgress * 2),
                  transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  willChange: 'transform, opacity'
                }}
              >
                <div className="max-w-[700px]"
                  style={{
                    transform: fourthSmoothProgress > 0 ? 'scale(0.4) translateX(-30%)' : 'scale(1)',
                    transformOrigin: 'left center',
                    opacity: fifthSmoothProgress > 0 ? 0 : 1,
                    transition: 'all 0.6s ease-out',
                    willChange: 'transform, opacity'
                  }}
                >
                  <h2 className="text-[70px] font-bold text-black font-morien leading-[1.1] mb-6 mt-28">
                    ELEVATE YOUR<br/>
                    DIGITAL<br/>
                    INFRASTRUCTURE
                  </h2>
                  <div style={{ opacity: fourthSmoothProgress > 0 ? 0 : 1 }} className="transition-opacity duration-500">
                    <p className="text-[32px] text-gray-800 font-inter mb-12">
                      Explore our core expertise
                    </p>
                    
                    {/* Servicios */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-morien mb-1">
                          Web Design & Development:
                        </h3>
                        <p className="text-base text-gray-600 font-inter">
                          Crafting sleek, responsive websites that convert and reflect<br/>
                          your brand with precision.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-morien mb-1">
                          AI Integrations
                        </h3>
                        <p className="text-base text-gray-600 font-inter">
                          Automating workflows, enhancing decision-making, and<br/>
                          unlocking new business capabilities with custom AI agents.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-morien mb-1">
                          Cybersecurity Consultancy
                        </h3>
                        <p className="text-base text-gray-600 font-inter">
                          Protecting your digital assets with proactive strategies and<br/>
                          robust security frameworks tailored to your operations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contenedor de Cards */}
              <div className="absolute inset-0">
                {/* Card 1 - WEB DESIGN & DEVELOPMENT */}
                <div 
                  className="absolute"
                  style={{
                    position: 'absolute',
                    left: fifthSmoothProgress > 0 ? '-8%' : (fourthSmoothProgress > 0 ? '50%' : '80%'),
                    top: '50%',
                    transform: `
                      translate(-50%, -50%)
                      rotate(${(fourthSmoothProgress > 0 && fifthSmoothProgress === 0) ? '0' : '-15'}deg)
                      translateY(${(1 - thirdSmoothProgress) * 200}px)
                      translateX(${(1 - thirdSmoothProgress) * 100}px)
                    `,
                    transformOrigin: 'center center',
                    opacity: thirdSmoothProgress,
                    transition: 'all 0.6s ease-out',
                    willChange: 'transform, left, opacity'
                  }}
                >
                  <div 
                    className="bg-gradient-to-br from-gray-200 to-gray-400 rounded-3xl p-12 shadow-2xl"
                    style={{
                      width: '600px',
                      height: '400px',
                      background: 'linear-gradient(135deg, #e5e7eb 0%, #9ca3af 100%)',
                    }}
                  >
                    <h3 className="text-4xl font-bold text-black font-morien mb-4">
                      WEB DESIGN &<br/>DEVELOPMENT
                    </h3>
                    <p className="text-2xl text-gray-700 font-inter mb-4">
                      Design That Converts
                    </p>
                    <p className="text-lg text-gray-600 font-inter leading-relaxed">
                      From sleek landing pages to complex platforms, we design and develop responsive, high-converting websites that adapt to your brand and scale with your business. Every pixel and line of code is crafted with purpose—to deliver speed, clarity, and results.
                    </p>
                  </div>
                </div>

                {/* Card 2 - AI INTEGRATIONS */}
                <div 
                  className="absolute"
                  style={{
                    left: sixthSmoothProgress > 0 ? '-8%' : (fifthSmoothProgress > 0 ? '45%' : (fourthSmoothProgress > 0 ? '98%' : '200%')),
                    top: '50%',
                    transform: `translate(-50%, -50%) rotate(${sixthSmoothProgress > 0 ? '-15' : (fifthSmoothProgress > 0 ? '0' : '-15')}deg)`,
                    opacity: fourthSmoothProgress > 0 ? 1 : 0,
                    transition: 'all 0.6s ease-out',
                    willChange: 'transform, left, opacity'
                  }}
                >
                  <div 
                    className="bg-gradient-to-br from-blue-200 to-blue-400 rounded-3xl p-12 shadow-2xl"
                    style={{
                      width: '600px',
                      height: '400px',
                      background: 'linear-gradient(135deg, #dbeafe 0%, #60a5fa 100%)',
                    }}
                  >
                    <h3 className="text-4xl font-bold text-black font-morien mb-4">
                      AI INTEGRATIONS
                    </h3>
                    <p className="text-2xl text-gray-700 font-inter mb-4">
                      Smarter Business Operations
                    </p>
                    <p className="text-lg text-gray-600 font-inter leading-relaxed">
                      We help businesses unlock the power of AI with custom-built solutions that automate workflows, streamline decision-making, and boost productivity. From internal tools to customer-facing experiences, we design AI that adapts to your goals—and delivers measurable impact.
                    </p>
                  </div>
                </div>

                {/* Card 3 - CYBERSECURITY CONSULTANCY */}
                <div 
                  className="absolute"
                  style={{
                    left: sixthSmoothProgress > 0 ? '50%' : (fifthSmoothProgress > 0 ? '98%' : '200%'),
                    top: '50%',
                    transform: `translate(-50%, -50%) rotate(${sixthSmoothProgress > 0 ? '0' : '-15'}deg)`,
                    opacity: fifthSmoothProgress,
                    transition: 'all 0.6s ease-out',
                    willChange: 'transform, left, opacity'
                  }}
                >
                  <div 
                    className="bg-gradient-to-br from-gray-400 to-gray-600 rounded-3xl p-12 shadow-2xl"
                    style={{
                      width: '600px',
                      height: '400px',
                      background: 'linear-gradient(135deg, #9ca3af 0%, #4b5563 100%)',
                    }}
                  >
                    <h3 className="text-4xl font-bold text-black font-morien mb-4">
                      CYBERSECURITY<br/>CONSULTANCY
                    </h3>
                    <p className="text-2xl text-gray-700 font-inter mb-4">
                      Protect What Matters
                    </p>
                    <p className="text-lg text-gray-600 font-inter leading-relaxed">
                      We help you safeguard your digital infrastructure with proactive cybersecurity strategies. From risk assessments to secure system architecture, we design and implement solutions that prevent threats, ensure compliance, and build long-term resilience across your operations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón Services centrado - SIEMPRE VISIBLE */}
            <div className="absolute left-1/2 -translate-x-1/2" style={{ 
              bottom: '5%',
              opacity: 1,
              transition: 'opacity 0.5s ease-out'
            }}>
              <button 
                className="flex items-center gap-4 px-12 py-4 bg-black text-white rounded-full font-morien text-lg hover:bg-gray-800 transition-colors"
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

          {/* SECCION D - Formulario de Contacto */}
          <div 
            style={{ 
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, ${seventhSmoothProgress < 0.5 ? '100%' : '-50%'})`,
              opacity: seventhSmoothProgress < 0.2 ? 0 : Math.min(1, seventhSmoothProgress * 1.5),
              visibility: seventhSmoothProgress > 0.1 ? 'visible' : 'hidden',
              transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              willChange: 'transform, opacity'
            }}
          >
            <div className="flex w-full h-full px-16">
              {/* Lado izquierdo - Información de contacto */}
              <div className="flex-1 flex flex-col justify-center pl-8"
                style={{
                  transform: `translateY(${seventhSmoothProgress < 0.6 ? (1 - seventhSmoothProgress) * 150 : 0}px) translateX(${seventhSmoothProgress < 0.6 ? (1 - seventhSmoothProgress) * -80 : 0}px)`,
                  opacity: Math.min(1, Math.max(0, (seventhSmoothProgress - 0.2) * 2)),
                  transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  willChange: 'transform, opacity'
                }}
              >
                <h2 className="text-[90px] font-bold text-black font-morien leading-[1.1] mb-12">
                  BOOK A CALL<br/>
                  NOW
                </h2>
                
                <div className="space-y-6 text-xl text-black font-inter">
                  <div>
                    <p className="mb-2">Phone Num: +351 999999999</p>
                  </div>
                  
                  <div>
                    <p className="mb-2">Email: info@diamondnxt.com</p>
                  </div>
                  
                  <div>
                    <p className="mb-2">Sede: Rua Conselheiro Veloso Cruz, N.º</p>
                    <p>10 Porto — 4400 092 Vila Nova de Gaia.</p>
                  </div>
                </div>
              </div>

              {/* Lado derecho - Formulario */}
              <div className="flex-1 flex items-center justify-center pr-16"
                style={{
                  transform: `translateY(${seventhSmoothProgress < 0.6 ? (1 - seventhSmoothProgress) * 150 : 0}px) translateX(${seventhSmoothProgress < 0.6 ? (1 - seventhSmoothProgress) * 80 : 0}px)`,
                  opacity: Math.min(1, Math.max(0, (seventhSmoothProgress - 0.2) * 2)),
                  transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  willChange: 'transform, opacity'
                }}
              >
                <div 
                  className="bg-gray-300 rounded-3xl p-12 shadow-2xl"
                  style={{
                    width: '600px',
                    background: 'linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%)',
                  }}
                >
                  <form className="space-y-6">
                    <div>
                      <input
                        type="text"
                        placeholder="First name"
                        className="w-full px-6 py-4 bg-white/70 rounded-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 font-inter"
                      />
                    </div>
                    
                    <div>
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="w-full px-6 py-4 bg-white/70 rounded-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 font-inter"
                      />
                    </div>
                    
                    <div>
                      <input
                        type="email"
                        placeholder="Whats your email"
                        className="w-full px-6 py-4 bg-white/70 rounded-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 font-inter"
                      />
                    </div>
                    
                    <div>
                      <textarea
                        placeholder="Tell us about your project..."
                        rows={6}
                        className="w-full px-6 py-4 bg-white/70 rounded-3xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none font-inter"
                      />
                    </div>
                    
                    <button 
                      type="submit"
                      className="w-full py-4 bg-black text-white rounded-full font-morien text-lg hover:bg-gray-800 transition-colors"
                    >
                      Book a call
                    </button>
                  </form>
                </div>
              </div>
            </div>
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
      
      {/* Contenido extra para las nuevas animaciones */}
      <div className="relative z-0 bg-transparent" style={{ height: '200vh' }}>
        {/* Espacio adicional para las transiciones del segundo nivel */}
      </div>
      
      {/* Contenido extra para la transición a la sección C */}
      <div className="relative z-0 bg-transparent" style={{ height: '200vh' }}>
        {/* Espacio adicional para las transiciones del tercer nivel */}
      </div>
      
      {/* Contenido extra para el efecto de carta al centro */}
      <div className="relative z-0 bg-transparent" style={{ height: '400vh' }}>
        {/* Espacio adicional para las transiciones del cuarto nivel - más espacio para 3 cartas */}
      </div>
      
      {/* Contenido extra para la transición de las 3 cartas */}
      <div className="relative z-0 bg-transparent" style={{ height: '400vh' }}>
        {/* Espacio adicional para las transiciones del quinto nivel - 3 cartas finales */}
      </div>
      
      {/* Contenido extra para la transición final */}
      <div className="relative z-0 bg-transparent" style={{ height: '400vh' }}>
        {/* Espacio adicional para las transiciones del sexto nivel - transición final */}
      </div>
      
      {/* Contenido extra para el formulario de contacto */}
      <div className="relative z-0 bg-transparent" style={{ height: '400vh' }}>
        {/* Espacio adicional para las transiciones del séptimo nivel - formulario */}
      </div>
    </div>
  )
} 