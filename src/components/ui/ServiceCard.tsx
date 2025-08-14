import React from 'react'

export interface ServiceCardProps {
  title: string
  subtitle: React.ReactNode
  description: React.ReactNode
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
    opacity,
    transition: 'all 0.6s ease-out',
    willChange: 'transform, left, opacity'
  }

  const numericPosition = parseFloat(position)
  const isLeftSide = !Number.isNaN(numericPosition) && numericPosition <= 0
  const isCenteredTight = !Number.isNaN(numericPosition) && Math.abs(numericPosition - 50) <= 5
  const isCenteredWide = !Number.isNaN(numericPosition) && Math.abs(numericPosition - 50) <= 150
  const isCentered = isLeftSide ? isCenteredWide : isCenteredTight

  return (
    <div
      style={{ ...cardStyle, ['--tw-rotate' as any]: `${rotation}deg` }}
      className={`transform -translate-x-[60%] -translate-y-[50%] sm:-translate-x-[60%] sm:-translate-y-[50%] md:-translate-x-[60%] md:-translate-y-[10%] lg:-translate-x-[60%] lg:-translate-y-[10%] ${isCentered ? 'xl:-translate-x-[60%]' : 'xl:-translate-x-[70%]'} xl:-translate-y-[-10%] ${isCentered ? '2xl:-translate-x-[30%]' : '2xl:-translate-x-[100%]'} 2xl:-translate-y-[20%] rotate-[var(--tw-rotate)]`}
    >
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
        <div 
          className="text-gray-600 font-inter leading-relaxed text-base md:text-lg"
        >
          {description}
        </div>
      </div>
    </div>
  )
}

export default ServiceCard 