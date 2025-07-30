import React from 'react'

interface ServiceCardProps {
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
        className="rounded-3xl p-6 md:p-8 lg:p-12 shadow-2xl w-[300px] h-[350px] md:w-[400px] md:h-[400px] lg:w-[800px] lg:h-[450px]"
        style={{
          background: gradient,
        }}
      >
        <h3 className="text-lg md:text-2xl lg:text-4xl font-bold text-black font-morien mb-2 md:mb-3 lg:mb-4">
          {title}
        </h3>
        <p className="text-sm md:text-lg lg:text-2xl text-gray-700 font-inter mb-2 md:mb-3 lg:mb-4">
          {subtitle}
        </p>
        <p className="text-xs md:text-sm lg:text-lg text-gray-600 font-inter leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}

export default ServiceCard 