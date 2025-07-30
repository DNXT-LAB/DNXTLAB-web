import React, { useState, useEffect } from 'react'
import type { SectionProps } from '@/types/animations'

const SectionB: React.FC<SectionProps> = ({ progress }) => {
  const { secondSmoothProgress, thirdSmoothProgress } = progress
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
    // Posición left relativa al viewport (centrado aproximadamente)
    const baseLeftPosition = viewportDimensions.width * 0.5 // 50% centrado
    
    // Dimensiones del video escaladas
    const baseVideoWidth = viewportDimensions.width * 0.75 // 75% del ancho de pantalla
    const baseVideoHeight = 430 // altura base
    
    return {
      leftPosition: baseLeftPosition,
      video: {
        width: baseVideoWidth,
        height: baseVideoHeight * scaleFactor
      }
    }
  }

  const dimensions = getScaledDimensions()

  // Calcular tamaños de fuente escalados
  const getScaledFontSizes = () => {
    return {
      subtitle: `${1.875 * scaleFactor}rem`, // text-3xl base
      title: `${3 * scaleFactor}rem`, // text-5xl base  
      description: `${1.25 * scaleFactor}rem`, // text-xl base
      spacing: {
        mb6: `${1.5 * scaleFactor}rem`,
        mb8: `${2 * scaleFactor}rem`,
        mb12: `${3 * scaleFactor}rem`,
        mt12: `${3 * scaleFactor}rem`,
        px4: `${1 * scaleFactor}rem`,
        px8: `${2 * scaleFactor}rem`,
        px12: `${3 * scaleFactor}rem`
      },
      maxWidth: {
        sm: `${20 * scaleFactor}rem`, // max-w-sm
        xl: `${32 * scaleFactor}rem`, // max-w-2xl  
        xxl: `${56 * scaleFactor}rem` // max-w-4xl
      }
    }
  }

  const fontSizes = getScaledFontSizes()

  const sectionStyle: React.CSSProperties = { 
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '57%',
    left: `${dimensions.leftPosition}px`,
    transform: `translate(-50%, ${secondSmoothProgress < 0.3 ? '100%' : '-50%'}) translateY(${thirdSmoothProgress > 0 ? -(thirdSmoothProgress * 900 * scaleFactor) : 0}px)`,
    transformOrigin: 'center center',
    opacity: secondSmoothProgress < 0.2 ? 0 : (thirdSmoothProgress > 0.3 ? Math.max(0, 1 - (thirdSmoothProgress * 2)) : 1),
    visibility: secondSmoothProgress > 0.1 && thirdSmoothProgress < 0.6 ? 'visible' : 'hidden',
    transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    willChange: 'transform, opacity'
  }

  return (
    <div style={sectionStyle}>
      <div className="h-full">
        <div 
          className="flex justify-center"
          style={{ marginBottom: fontSizes.spacing.mb8, marginTop: fontSizes.spacing.mt12 }}
        >
          <p 
            className="font-inter text-gray-600 uppercase tracking-wider text-center"
            style={{ fontSize: fontSizes.subtitle }}
          >
            STRATEGIC FLEXIBILITY
          </p>
        </div>
        
        <div 
          className="flex justify-center"
          style={{ marginBottom: fontSizes.spacing.mb12 }}
        >
          <video 
            src="/video1.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="auto" 
            className="object-cover rounded-2xl shadow-lg"
            style={{
              width: `${dimensions.video.width}px`,
              height: `${dimensions.video.height}px`,
              background: 'linear-gradient(135deg, #0891b2 0%, #1e40af 50%, #7c3aed 100%)'
            }}
          />
        </div>
        
        <div 
          className="flex flex-col text-center mx-auto justify-center items-center"
          style={{ 
            maxWidth: `${87.5 * scaleFactor}rem`, // 1400px base
            paddingLeft: fontSizes.spacing.px12,
            paddingRight: fontSizes.spacing.px12
          }}
        >
          <h2 
            className="text-black font-morien leading-tight"
            style={{ 
              fontSize: fontSizes.title,
              marginBottom: fontSizes.spacing.mb8
            }}
          >
            Solutions That Evolve <br className="md:hidden" /> <span className="font-bold">With Your Business</span>
          </h2>
          <p 
            className="text-gray-600 font-inter mx-auto leading-relaxed"
            style={{ 
              fontSize: fontSizes.description,
              maxWidth: fontSizes.maxWidth.xxl
            }}
          >
            At DNXT LAB, we don&apos;t sell tools—we design intelligent frameworks tailored to your operations. By blending technical depth with strategic foresight, we ensure every AI or digital solution evolves with your business and supports long-term growth.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SectionB 