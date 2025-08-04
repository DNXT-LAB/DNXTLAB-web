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
    // Left position relative to viewport (approximately centered)
    const baseLeftPosition = viewportDimensions.width * 0.5 // 50% centered
    
    // Dimensiones del video escaladas
    const baseVideoWidth = viewportDimensions.width * 0.75 // 75% of screen width
    const baseVideoHeight = 530 // altura base
    
    return {
      leftPosition: baseLeftPosition,
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
              {/* Desktop Layout - Only visible on screens >= 1024px */}
      <div className="hidden lg:block h-full">
        <div 
          className="flex justify-center"
          style={{ marginBottom: fontSizes.spacing.mb8, marginTop: fontSizes.spacing.mt12 }}
        >
          <p 
            className="font-poppins text-black uppercase tracking-wider text-center mt-20"
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
            className="text-black font-poppins leading-tight"
            style={{ 
              fontSize: fontSizes.title,
              marginBottom: fontSizes.spacing.mb8
            }}
          >
            Solutions That Evolve <br className="md:hidden" /> <span className="font-bold">With Your Business</span>
          </h2>
          <p 
            className="text-black font-poppins mx-auto leading-relaxed"
            style={{ 
              fontSize: fontSizes.description,
              maxWidth: fontSizes.maxWidth.xxl
            }}
          >
            At DNXT LAB, we don&apos;t sell tools—we design intelligent frameworks tailored to your operations. By blending technical depth with strategic foresight, we ensure every AI or digital solution evolves with your business and supports long-term growth.
          </p>
        </div>
      </div>

              {/* Mobile & iPad Layout - Visible on screens < 1024px */}
      <div className="block lg:hidden w-full h-full mt-12 md:mt-40 flex flex-col justify-center items-center">
        {/* Title at top */}
        <div className="w-full mb-6 md:mb-8 text-center">
          <p className="text-xl md:text-2xl font-poppins text-black uppercase tracking-wider mr-28  md:mr-32">
            STRATEGIC FLEXIBILITY
          </p>
        </div>
        
        {/* Video en el medio */}
        <div className="w-full mb-6 md:mb-8 flex justify-center">
          <video 
            src="/video1.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="auto" 
            className="w-80 md:w-[670px] h-60 md:h-72 object-cover rounded-2xl shadow-lg mr-28  md:mr-32"
            style={{
              background: 'linear-gradient(135deg, #0891b2 0%, #1e40af 50%, #7c3aed 100%)'
            }}
          />
        </div>
        
        {/* Text below */}
        <div className="flex-1 flex flex-col text-center px-4 md:px-8 mr-28  md:mr-32">
          <h2 className="text-3xl md:text-4xl font-bold text-black font-poppins mb-4 md:mb-6 leading-tight">
            Solutions That Evolve <br/>With Your Business
          </h2>
          
          <p className="text-sm md:text-base text-black font-poppins leading-relaxed max-w-[300px] md:max-w-[600px] mx-auto">
            At DNXT LAB, we don&apos;t sell tools—we design intelligent frameworks tailored to your operations. By blending technical depth with strategic foresight, we ensure every AI or digital solution evolves with your business and supports long-term growth.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SectionB 