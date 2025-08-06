import React from 'react'

export interface ServiceCardProps {
  title: string
  subtitle: string
  description: string
  gradient: string
  position: string
  rotation: string
  opacity: number
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  subtitle,
  description,
  gradient,
  position,
  rotation,
  opacity
}) => {
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
        className="shadow-2xl rounded-3xl p-8 lg:p-12 w-[320px] h-[400px] md:w-[600px] md:h-[400px] lg:w-[800px] lg:h-[450px]"
        style={{
          background: gradient,
        }}
      >
        <h3 
          className="font-bold text-black font-morien text-2xl md:text-3xl lg:text-4xl mb-4"
        >
          {title}
        </h3>
        <p 
          className="text-gray-700 font-inter text-lg md:text-xl lg:text-2xl mb-4"
        >
          {subtitle}
        </p>
        <p 
          className="text-gray-600 font-inter leading-relaxed text-base md:text-lg"
        >
          {description}
        </p>
      </div>
    </div>
  )
}

export default ServiceCard 