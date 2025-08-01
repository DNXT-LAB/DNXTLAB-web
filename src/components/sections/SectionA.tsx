import React, { useState, useEffect } from 'react'
import type { SectionAProps } from '@/types/animations'

const SectionA: React.FC<SectionAProps> = ({
  progress,
  sectionATranslateY,
  sectionAScale,
  videoConvergeX,
  videoConvergeY,
  textConvergeX,
  textConvergeY
}) => {
  const { secondSmoothProgress } = progress
  const [scaleFactor, setScaleFactor] = useState(1)
  const [viewportDimensions, setViewportDimensions] = useState({ width: 1920, height: 1080 })

  // Función para calcular el factor de escala basado en el viewport
  const calculateScaleAndDimensions = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth
      const height = window.innerHeight
      
      // Base de referencia: 1920x1080 (pantalla estándar)
      const baseWidth = 1920
      const baseHeight = 1080
      
      // Calcular factor de escala basado en el ancho, con límites mínimos y máximos
      const widthScale = width / baseWidth
      const heightScale = height / baseHeight
      
      // Usar el menor de los dos factores para mantener proporciones
      const scale = Math.min(widthScale, heightScale)
      
      // Aplicar límites para evitar escalas extremas
      const clampedScale = Math.max(0.6, Math.min(2.5, scale))
      
      return {
        scaleFactor: clampedScale,
        width,
        height
      }
    }
    return {
      scaleFactor: 1,
      width: 1920,
      height: 1080
    }
  }

  // Effect para actualizar el factor de escala cuando cambie el tamaño
  useEffect(() => {
    const updateScale = () => {
      const { scaleFactor: newScale, width, height } = calculateScaleAndDimensions()
      setScaleFactor(newScale)
      setViewportDimensions({ width, height })
    }

    // Establecer escala inicial
    updateScale()

    // Escuchar cambios de tamaño
    window.addEventListener('resize', updateScale)
    
    return () => {
      window.removeEventListener('resize', updateScale)
    }
  }, [])

  // Calcular dimensiones y posiciones escaladas
  const getScaledDimensions = () => {
    // Dimensiones base
    const baseVideo = { width: 812, height: 638 }
    const baseText = { width: 1147, height: 853 } // Aumentada para extender la pestaña
    
    // Posiciones base (relativas al viewport) - Responsivo
    const getResponsiveVideoLeft = () => {
      return viewportDimensions.width >= 1536 ? 0.11 : 0.0004  // 2XL: 0.11, Desktop: 0.0004
    }
    
    const getResponsiveTextLeft = () => {
      return viewportDimensions.width >= 1536 ? 0.52 : 0.48    // 2XL: 0.52, Desktop: 0.48
    }
    
    const getResponsiveTextTopBase = () => {
      if (viewportDimensions.width >= 1536) return 753        // 2XL: 753
      if (viewportDimensions.width >= 1280) return 1120       // XL: 1120  
      return 753                                               // Menores: 753
    }
    
    const baseVideoLeft = viewportDimensions.width * getResponsiveVideoLeft()
    const baseVideoTop = 74
    const baseTextLeft = viewportDimensions.width * getResponsiveTextLeft()
    
    return {
      video: {
        width: baseVideo.width * scaleFactor,
        height: baseVideo.height * scaleFactor,
        left: baseVideoLeft,
        top: baseVideoTop * scaleFactor
      },
      text: {
        width: baseText.width * scaleFactor,
        height: baseText.height * scaleFactor,
        left: baseTextLeft,
        top: `calc(50% - ${(getResponsiveTextTopBase() * scaleFactor)/2}px + ${44.5 * scaleFactor}px)`
      }
    }
  }

  const dimensions = getScaledDimensions()

  const sectionStyle: React.CSSProperties = { 
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
  }

  const videoStyle: React.CSSProperties = {
    position: 'absolute',
    width: `${dimensions.video.width}px`,
    height: `${dimensions.video.height}px`,
    left: `${dimensions.video.left}px`,
    top: `${dimensions.video.top}px`,
    transform: `translateY(${sectionATranslateY + videoConvergeY}px) translateX(${videoConvergeX}px) scale(${sectionAScale})`,
    transformOrigin: 'center center',
    opacity: secondSmoothProgress > 0.7 ? 0 : 1 - (secondSmoothProgress * 1.2)
  }

  const textStyle: React.CSSProperties = { 
    position: 'absolute',
    width: `${dimensions.text.width}px`,
    height: `${dimensions.text.height}px`,
    left: `${dimensions.text.left}px`,
    top: dimensions.text.top,
    transform: `translateY(${sectionATranslateY + textConvergeY}px) translateX(${textConvergeX}px) scale(${sectionAScale})`,
    transformOrigin: 'center center',
    opacity: secondSmoothProgress > 0.7 ? 0 : 1 - (secondSmoothProgress * 1.2)
  }

  // Calcular tamaños de fuente escalados
  const getScaledFontSizes = () => {
    return {
      mainTitle: `${6 * scaleFactor}rem`,
      subtitle: `${3 * scaleFactor}rem`,
      description: `${1.25 * scaleFactor}rem`,
      button: `${1.125 * scaleFactor}rem`,
      buttonPadding: {
        x: `${2.5 * scaleFactor}rem`,
        y: `${1.25 * scaleFactor}rem`
      },
      gap: `${1 * scaleFactor}rem`,
      spacing: {
        mb6: `${1.5 * scaleFactor}rem`,
        mb8: `${2 * scaleFactor}rem`,
        mb12: `${3 * scaleFactor}rem`
      }
    }
  }

  const fontSizes = getScaledFontSizes()

  return (
    <div style={sectionStyle}>
      {/* Layout Desktop - Solo visible en pantallas >= 1024px */}
      <div className="hidden lg:block">
        <video 
          src="/video2.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="auto" 
          className="object-cover transition-transform duration-700 ease-out rounded-2xl shadow-2xl drop-shadow-[0px_10px_10px_rgba(0,0,0,0.7)]"
          style={videoStyle}
        />
        
        <div 
          className="transition-transform duration-700 ease-out"
          style={textStyle}
        >
          <h2 
            className="font-bold text-black font-poppins leading-tight"
            style={{ 
              fontSize: fontSizes.mainTitle, 
              marginBottom: fontSizes.spacing.mb6 
            }}
          >
            WE BUILD WITH<br/>INTELLIGENCE AND<br/>INTENT
          </h2>
          <p 
            className="text-black font-inter leading-tight"
            style={{ 
              fontSize: fontSizes.subtitle, 
              marginBottom: fontSizes.spacing.mb8 
            }}
          >
            Smart systems. Seamless design.<br/>Real results.
          </p>
          <p 
            className="text-black font-poppins leading-relaxed"
            style={{ 
              fontSize: fontSizes.description, 
              marginBottom: fontSizes.spacing.mb12,
              maxWidth: `${38 * scaleFactor}rem`
            }}
          >
            At DNXT LAB, we create intelligent digital solutions that think, adapt, and scale—combining AI automation, UX strategy, and high-performance web design to help you launch faster, work smarter, and grow stronger.
          </p>
          <button 
            className="bg-black text-white rounded-full font-morien hover:bg-gray-800 transition-colors flex items-center"
            style={{
              fontSize: fontSizes.button,
              paddingLeft: fontSizes.buttonPadding.x,
              paddingRight: fontSizes.buttonPadding.x,
              paddingTop: fontSizes.buttonPadding.y,
              paddingBottom: fontSizes.buttonPadding.y,
              gap: fontSizes.gap
            }}
          >
            SERVICES
            <svg 
              style={{ 
                width: `${1.5 * scaleFactor}rem`, 
                height: `${1.5 * scaleFactor}rem` 
              }}
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

      {/* Layout Mobile & iPad - Visible en pantallas < 1024px */}
      <div className="block lg:hidden w-full h-full mt-12 flex flex-col">
        {/* Video arriba con padding */}
        <div className="w-full mb-6 md:mb-8">
          <video 
            src="/video2.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="auto" 
            className="w-72 md:w-[650px] h-40 md:h-64 object-cover shadow-2xl rounded-2xl"
          />
        </div>
        
        {/* Texto abajo */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-2xl md:text-5xl font-bold text-black font-poppins mb-4 md:mb-6 leading-tight">
            WE BUILD WITH<br/>INTELLIGENCE AND<br/>INTENT
          </h2>
          
          <p className="text-lg md:text-2xl text-black font-inter mb-4 md:mb-6 leading-tight">
            Smart systems. Seamless design.<br/>Real results.
          </p>
          
          <p className="text-[12px] md:text-base text-black font-inter mb-6 md:mb-8 leading-relaxed max-w-[300px] md:max-w-[600px]">
            At DNXT LAB, we create intelligent digital solutions that think, adapt, and scale—combining AI automation, UX strategy, and high-performance web design to help you launch faster, work smarter, and grow stronger.
          </p>
          
          <button 
            className="text-sm md:text-base px-6 py-3 md:px-8 md:py-4 bg-black text-white rounded-full font-morien hover:bg-gray-800 transition-colors flex items-center gap-3 self-start"
          >
            SERVICES
            <svg 
              className="w-4 h-4 md:w-5 md:h-5" 
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
  )
}

export default SectionA 