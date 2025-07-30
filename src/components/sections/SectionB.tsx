import React, { useState, useEffect } from 'react'
import type { SectionProps } from '@/types/animations'

const SectionB: React.FC<SectionProps> = ({ progress }) => {
  const { secondSmoothProgress, thirdSmoothProgress } = progress
  const [leftPosition, setLeftPosition] = useState('16%')

  // Función para calcular la posición left basada en el ancho de pantalla
  const calculateLeftPosition = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth
      if (width < 640) { // iPhone
        return '7%'
      } else if (width < 1024) { // iPad
        return '16%'
      } else if (width < 1540) { // Desktop
        return '36%'
      } else {
        return '50%'
      }
    }
    return '16%'
  }

  // Effect para actualizar la posición left cuando cambie el tamaño
  useEffect(() => {
    const updateLeftPosition = () => {
      setLeftPosition(calculateLeftPosition())
    }

    // Establecer posición inicial
    updateLeftPosition()

    // Escuchar cambios de tamaño
    window.addEventListener('resize', updateLeftPosition)
    
    return () => {
      window.removeEventListener('resize', updateLeftPosition)
    }
  }, [])

  const sectionStyle: React.CSSProperties = { 
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '57%',
    left: leftPosition,
    transform: `translate(-50%, ${secondSmoothProgress < 0.3 ? '100%' : '-50%'}) translateY(${thirdSmoothProgress > 0 ? -(thirdSmoothProgress * 900) : 0}px)`,
    transformOrigin: 'center center',
    opacity: secondSmoothProgress < 0.2 ? 0 : (thirdSmoothProgress > 0.3 ? Math.max(0, 1 - (thirdSmoothProgress * 2)) : 1),
    visibility: secondSmoothProgress > 0.1 && thirdSmoothProgress < 0.6 ? 'visible' : 'hidden',
    transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    willChange: 'transform, opacity'
  }

  return (
    <div style={sectionStyle}>
      <div className="h-full">
        <div className="flex justify-center mb-8 mt-12">
          <p className="text-xl md:text-2xl lg:text-3xl font-inter text-gray-600 uppercase tracking-wider text-center">
            STRATEGIC FLEXIBILITY
          </p>
        </div>
        
        <div className="mb-12 flex justify-center">
          <video 
            src="/video1.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="auto" 
            className="object-cover rounded-2xl shadow-lg w-68 md:w-[600px] h-48 md:h-64 lg:w-[75%] lg:h-[430px]"
            style={{
              background: 'linear-gradient(135deg, #0891b2 0%, #1e40af 50%, #7c3aed 100%)'
            }}
          />
        </div>
        
        <div className="flex flex-col text-center max-w-[1400px] mx-auto justify-center items-center px-4 md:px-8 lg:px-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-black font-morien mb-6 md:mb-8 leading-tight md:w-full">
            Solutions That Evolve <br className="md:hidden" /> <span className="font-bold">With Your Business</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 font-inter mx-auto max-w-sm md:max-w-2xl lg:max-w-4xl leading-relaxed">
            At DNXT LAB, we don&apos;t sell tools—we design intelligent frameworks tailored to your operations. By blending technical depth with strategic foresight, we ensure every AI or digital solution evolves with your business and supports long-term growth.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SectionB 