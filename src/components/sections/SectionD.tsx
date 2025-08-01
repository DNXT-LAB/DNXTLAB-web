import React, { useState, useEffect } from 'react'
import ContactForm from '@/components/ui/ContactForm'
import type { ContactSectionProps } from '@/types/animations'

const SectionD: React.FC<ContactSectionProps> = ({ 
  progress, 
  formState, 
  handleInputChange, 
  handleSubmit 
}) => {
  const { seventhSmoothProgress } = progress
  const [leftPosition, setLeftPosition] = useState('50%')

  // Función para calcular la posición left basada en el ancho de pantalla
  const calculateLeftPosition = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth
      if (width < 640) { // iPhone
        return '7%'
      } else if (width < 1024) { // iPad
        return '18%'
      } else if (width < 1540) { // Desktop
        return '38%'
      } else {
        return '50%'
      }
    }
    return '38%'
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
    width: '90%',
    height: '100%',
    top: '50%',
    left: leftPosition,
    transform: `translate(-50%, ${seventhSmoothProgress < 0.4 ? '100%' : '-50%'})`,
    opacity: seventhSmoothProgress < 0.4 ? 0 : Math.min(1, (seventhSmoothProgress - 0.4) * 2.5),
    visibility: seventhSmoothProgress > 0.35 ? 'visible' : 'hidden',
    transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    willChange: 'transform, opacity'
  }

  const leftContentStyle = {
    transform: `translateY(${seventhSmoothProgress < 0.8 ? (1 - seventhSmoothProgress) * 150 : 0}px) translateX(${seventhSmoothProgress < 0.8 ? (1 - seventhSmoothProgress) * -80 : 0}px)`,
    opacity: Math.min(1, Math.max(0, (seventhSmoothProgress - 0.4) * 2.5)),
    transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    willChange: 'transform, opacity'
  }

  const rightContentStyle = {
    transform: `translateY(${seventhSmoothProgress < 0.8 ? (1 - seventhSmoothProgress) * 150 : 0}px) translateX(${seventhSmoothProgress < 0.8 ? (1 - seventhSmoothProgress) * 80 : 0}px)`,
    opacity: Math.min(1, Math.max(0, (seventhSmoothProgress - 0.4) * 2.5)),
    transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    willChange: 'transform, opacity'
  }

  return (
    <div style={sectionStyle}>
      {/* Layout Desktop - Solo visible en pantallas >= 1024px */}
      <div className="hidden lg:flex w-full h-full px-16">
        {/* Lado izquierdo - Información de contacto */}
        <div className="flex-1 flex flex-col justify-center pl-8" style={leftContentStyle}>
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
        <div className="flex-1 flex items-center justify-center pr-16" style={rightContentStyle}>
          <ContactForm 
            formState={formState}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>

      {/* Layout Mobile & iPad - Visible en pantallas < 1024px */}
      <div className="block lg:hidden w-full h-full p-3 md:p-6 flex flex-col justify-center mt-20">
        {/* Título arriba */}
        <div className="text-center mb-4 mt-20">
          <h2 className="text-3xl md:text-6xl font-bold text-black font-morien leading-[1.1]">
            BOOK A CALL
            NOW
          </h2>
        </div>
        
        {/* Información de contacto en medio */}
        <div className="text-center md:mb-8">
          <div className="space-y-2 md:space-y-4 text-sm md:text-lg text-black font-inter">
            <div>
              <p>Phone Num: +351 999999999</p>
            </div>
            
            <div>
              <p>Email: info@diamondnxt.com</p>
            </div>
            
            <div>
              <p>Sede: Rua Conselheiro Veloso Cruz, N.º</p>
              <p>10 Porto — 4400 092 Vila Nova de Gaia.</p>
            </div>
          </div>
        </div>
        
        {/* Formulario abajo */}
        <div className="flex justify-center">
          <div className="scale-55 md:scale-100 origin-center">
            <ContactForm 
              formState={formState}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionD 