import React from 'react'

export interface ServiceCardProps {
  title: string
  subtitle: string
  description: string
  gradient: string
  position: string
  rotation: string
  opacity: number
  scaleFactor?: number
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  subtitle,
  description,
  gradient,
  position,
  rotation,
  opacity,
  scaleFactor = 1
}) => {
  // Calcular dimensiones escaladas
  const getScaledDimensions = () => {
    return {
      width: 800 * scaleFactor, // lg:w-[800px] como base
      height: 450 * scaleFactor, // lg:h-[450px] como base
      padding: 3 * scaleFactor, // lg:p-12 como base (12*0.25rem = 3rem)
      borderRadius: 1.5 * scaleFactor // rounded-3xl (24px = 1.5rem)
    }
  }

  // Calcular tamaños de fuente escalados
  const getScaledFontSizes = () => {
    return {
      title: `${2.25 * scaleFactor}rem`, // lg:text-4xl como base
      subtitle: `${1.5 * scaleFactor}rem`, // lg:text-2xl como base
      description: `${1.125 * scaleFactor}rem`, // lg:text-lg como base
      spacing: {
        mb2: `${0.5 * scaleFactor}rem`, // lg:mb-4 como base (convertido a rem)
        mb3: `${0.75 * scaleFactor}rem`,
        mb4: `${1 * scaleFactor}rem`
      }
    }
  }

  const dimensions = getScaledDimensions()
  const fontSizes = getScaledFontSizes()

  const cardStyle: React.CSSProperties = {
    position: 'absolute',
    left: position,
    top: '50%',
    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
    opacity,
    transition: 'all 0.6s ease-out',
    willChange: 'transform, left, opacity'
  }

  return (
    <div style={cardStyle}>
      <div 
        className="shadow-2xl"
        style={{
          background: gradient,
          borderRadius: `${dimensions.borderRadius}rem`,
          padding: `${dimensions.padding}rem`,
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`
        }}
      >
        <h3 
          className="font-bold text-black font-morien"
          style={{ 
            fontSize: fontSizes.title,
            marginBottom: fontSizes.spacing.mb4
          }}
        >
          {title}
        </h3>
        <p 
          className="text-gray-700 font-inter"
          style={{ 
            fontSize: fontSizes.subtitle,
            marginBottom: fontSizes.spacing.mb4
          }}
        >
          {subtitle}
        </p>
        <p 
          className="text-gray-600 font-inter leading-relaxed"
          style={{ fontSize: fontSizes.description }}
        >
          {description}
        </p>
      </div>
    </div>
  )
}

export default ServiceCard 