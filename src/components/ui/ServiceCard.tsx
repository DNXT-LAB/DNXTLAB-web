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
        className="rounded-3xl p-12 shadow-2xl"
        style={{
          width: '800px',
          height: '450px',
          background: gradient,
        }}
      >
        <h3 className="text-4xl font-bold text-black font-morien mb-4">
          {title}
        </h3>
        <p className="text-2xl text-gray-700 font-inter mb-4">
          {subtitle}
        </p>
        <p className="text-lg text-gray-600 font-inter leading-relaxed w-[450px]">
          {description}
        </p>
      </div>
    </div>
  )
}

export default ServiceCard 