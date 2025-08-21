import React, { useState, useEffect } from 'react'
import type { SectionProps } from '@/types/animations'

const SectionB: React.FC<SectionProps> = ({ progress }) => {
  const { secondSmoothProgress, thirdSmoothProgress } = progress
  const [scaleFactor, setScaleFactor] = useState(1)
  const [viewportDimensions, setViewportDimensions] = useState({ width: 1920, height: 1080 })

  // Function to calculate scale factor based on viewport
  const calculateScaleAndDimensions = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth
      const height = window.innerHeight
      
              // Reference base: 1920x1080 (standard screen)
      const baseWidth = 1920
      const baseHeight = 1080
      
              // Calculate scale factor based on width, with minimum and maximum limits
      const widthScale = width / baseWidth
      const heightScale = height / baseHeight
      
      // Usar el menor de los dos factores para mantener proporciones
      const scale = Math.min(widthScale, heightScale)
      
              // Apply limits to avoid extreme scales
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

  // Effect to update scale factor when size changes
  useEffect(() => {
    const updateScale = () => {
      const { scaleFactor: newScale, width, height } = calculateScaleAndDimensions()
      setScaleFactor(newScale)
      setViewportDimensions({ width, height })
    }

    // Establecer escala inicial
    updateScale()

            // Listen for size changes
    window.addEventListener('resize', updateScale)
    
    return () => {
      window.removeEventListener('resize', updateScale)
    }
  }, [])

  // Calculate scaled dimensions and positions
  const getScaledDimensions = () => {
    const baseVideoWidth = viewportDimensions.width * 0.75
    const baseVideoHeight = 530
    
    return {
      video: {
        width: baseVideoWidth,
        height: baseVideoHeight * scaleFactor
      }
    }
  }

  const dimensions = getScaledDimensions()

  // Calculate scaled font sizes
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
    // Remove height property entirely for better flex centering
    top: '45%',
    left: '50%',
    transform: `translate(-50%, ${secondSmoothProgress < 0.3 ? '100%' : '-50%'}) translateY(${thirdSmoothProgress > 0 ? -(thirdSmoothProgress * 900 * scaleFactor) : 0}px)`,
    transformOrigin: 'center center',
    opacity: secondSmoothProgress < 0.2 ? 0 : (thirdSmoothProgress > 0.3 ? Math.max(0, 1 - (thirdSmoothProgress * 2)) : 1),
    visibility: secondSmoothProgress > 0.1 && thirdSmoothProgress < 0.6 ? 'visible' : 'hidden',
    transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    willChange: 'transform, opacity'
  }

  return (
    <div style={sectionStyle}>
      <div className="w-full min-h-screen flex flex-col justify-center items-center px-2 md:px-8">
        {/* Title */}
        <div className="w-full mb-6 md:mb-8 text-center">
          <p className="font-poppins text-black uppercase tracking-wider text-lg md:text-2xl mt-8 md:mt-20">
            STRATEGIC FLEXIBILITY
          </p>
        </div>
        {/* Video */}
        <div className="w-full mb-6 md:mb-8 flex justify-center">
          <video 
            src="/video1.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="auto" 
            className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-3xl h-48 sm:h-60 md:h-72 object-cover rounded-2xl shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #0891b2 0%, #1e40af 50%, #7c3aed 100%)'
            }}
          />
        </div>
        {/* Text */}
        <div className="flex flex-col text-center w-full items-center">
          <h2 className="font-bold text-black font-poppins mb-3 md:mb-6 leading-tight text-xl sm:text-2xl md:text-4xl lg:text-5xl max-w-2xl">
            Solutions That Evolve <br className="hidden md:block" />With Your Business
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-black font-poppins leading-relaxed max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
            At DNXT LAB, we don&apos;t sell tools—we design intelligent frameworks tailored to your operations. By blending technical depth with strategic foresight, we ensure every AI or digital solution evolves with your business and supports long-term growth.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SectionB