import React from 'react'
import ServiceCard from '@/components/ui/ServiceCard'
import type { SectionProps } from '@/types/animations'

const SectionC: React.FC<SectionProps> = ({ progress }) => {
  const { 
    thirdSmoothProgress, 
    fourthSmoothProgress, 
    fifthSmoothProgress, 
    sixthSmoothProgress, 
    seventhSmoothProgress 
  } = progress

  const sectionStyle: React.CSSProperties = { 
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '50%',
    left: '45%',
    transform: `translate(-50%, ${thirdSmoothProgress < 0.4 ? '100%' : '-50%'}) translateY(${seventhSmoothProgress > 0 ? -(seventhSmoothProgress * 1200) : 0}px)`,
    transformOrigin: 'center center',
    opacity: thirdSmoothProgress < 0.4 ? 0 : (seventhSmoothProgress > 0.3 ? Math.max(0, 1 - (seventhSmoothProgress * 2)) : 1),
    visibility: thirdSmoothProgress > 0.35 && seventhSmoothProgress < 0.6 ? 'visible' : 'hidden',
    transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    willChange: 'transform, opacity'
  }

  const leftContentStyle = {
    transform: `translateY(${thirdSmoothProgress < 0.6 ? (1 - thirdSmoothProgress) * 300 : 0}px) translateX(${thirdSmoothProgress < 0.6 ? (1 - thirdSmoothProgress) * -150 : 0}px)`,
    opacity: thirdSmoothProgress < 0.4 ? 0 : Math.min(1, (thirdSmoothProgress - 0.4) * 2.5),
    transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    willChange: 'transform, opacity'
  }

  const titleStyle = {
    transform: fourthSmoothProgress > 0 ? 'scale(0.4) translateX(-10%)' : 'scale(1)',
    transformOrigin: 'left center',
    opacity: fifthSmoothProgress > 0 ? 0 : 1,
    transition: 'all 0.6s ease-out',
    willChange: 'transform, opacity'
  }

  const servicesOpacity = fourthSmoothProgress > 0 ? 0 : 1

  // Calcular posiciones y rotaciones de las cards
  const card1Position = sixthSmoothProgress > 0 
    ? `${-8 + (-8 - 50) * Math.min(1, sixthSmoothProgress * 1.8)}%` 
    : (fifthSmoothProgress > 0 ? '-8%' : (fourthSmoothProgress > 0 ? '50%' : '78%'))
  
  const card2Position = sixthSmoothProgress > 0 
    ? '-8%' 
    : (fifthSmoothProgress > 0 ? '50%' : (fourthSmoothProgress > 0 ? '108%' : '200%'))
  
  const card3Position = sixthSmoothProgress > 0 
    ? '50%' 
    : (fifthSmoothProgress > 0 ? '108%' : '200%')

  const card1Rotation = fifthSmoothProgress > 0 ? '15' : (fourthSmoothProgress > 0 && fifthSmoothProgress === 0) ? '0' : '-15'
  const card2Rotation = sixthSmoothProgress > 0 ? '15' : (fifthSmoothProgress > 0 ? '0' : '-15')
  const card3Rotation = sixthSmoothProgress > 0 ? '0' : '-15'

  const card1Opacity = thirdSmoothProgress < 0.4 ? 0 : Math.min(1, (thirdSmoothProgress - 0.4) * 2.5)
  const card2Opacity = fourthSmoothProgress > 0 ? 1 : 0
  const card3Opacity = fifthSmoothProgress > 0 ? 1 : 0

  return (
    <div style={sectionStyle}>
      <div className="flex w-full h-full px-16">
        {/* Contenido principal lado izquierdo */}
        <div className="flex-1 md:pl-8" style={leftContentStyle}>
          <div className="max-w-[330px] md:max-w-[700px]" style={titleStyle}>
            <h2 className="text-[32px] text-center md:text-start md:text-[70px] font-bold text-black font-morien leading-[1.1] mb-6 mt-36 md:mt-28">
              ELEVATE YOUR<br/>
              DIGITAL<br/>
              INFRASTRUCTURE
            </h2>
            <div style={{ opacity: servicesOpacity }} className="transition-opacity duration-500">
              <p className="text-[24px] md:text-[36px] text-black font-inter mb-12">
                Explore our core expertise
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-morien mb-1">
                    Web Design & Development:
                  </h3>
                  <p className="text-base text-gray-600 font-inter">
                    Crafting sleek, responsive websites that convert and reflect<br/>
                    your brand with precision.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-morien mb-1">
                    AI Integrations
                  </h3>
                  <p className="text-base text-gray-600 font-inter">
                    Automating workflows, enhancing decision-making, and<br/>
                    unlocking new business capabilities with custom AI agents.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-morien mb-1">
                    Cybersecurity Consultancy
                  </h3>
                  <p className="text-base text-gray-600 font-inter">
                    Protecting your digital assets with proactive strategies and<br/>
                    robust security frameworks tailored to your operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenedor de Cards */}
        <div className="absolute inset-0">
          <ServiceCard 
            title="WEB DESIGN & DEVELOPMENT"
            subtitle="Design That Converts"
            description="From sleek landing pages to complex platforms, we design and develop responsive, high-converting websites that adapt to your brand and scale with your business. Every pixel and line of code is crafted with purpose—to deliver speed, clarity, and results."
            gradient="linear-gradient(135deg, #e5e7eb 0%, #9ca3af 100%)"
            position={card1Position}
            rotation={card1Rotation}
            opacity={card1Opacity}
          />
          
          <ServiceCard 
            title="AI INTEGRATIONS"
            subtitle="Smarter Business Operations"
            description="We help businesses unlock the power of AI with custom-built solutions that automate workflows, streamline decision-making, and boost productivity. From internal tools to customer-facing experiences, we design AI that adapts to your goals—and delivers measurable impact."
            gradient="linear-gradient(135deg, #dbeafe 0%, #60a5fa 100%)"
            position={card2Position}
            rotation={card2Rotation}
            opacity={card2Opacity}
          />
          
          <ServiceCard 
            title="CYBERSECURITY CONSULTANCY"
            subtitle="Protect What Matters"
            description="We help you safeguard your digital infrastructure with proactive cybersecurity strategies. From risk assessments to secure system architecture, we design and implement solutions that prevent threats, ensure compliance, and build long-term resilience across your operations."
            gradient="linear-gradient(135deg, #9ca3af 0%, #4b5563 100%)"
            position={card3Position}
            rotation={card3Rotation}
            opacity={card3Opacity}
          />
        </div>
      </div>

      {/* Botón Services centrado */}
      <div className="absolute left-1/2 -translate-x-1/2" style={{ 
        bottom: '5%',
        opacity: 1,
        transition: 'opacity 0.5s ease-out'
      }}>
        <button 
          className="flex items-center gap-4 px-12 py-4 bg-black text-white rounded-full font-morien text-lg hover:bg-gray-800 transition-colors"
        >
          SERVICES
          <svg 
            className="w-6 h-6" 
            viewBox="0 0 37 37" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="18.5" cy="18.5" r="18.5" fill="white"/>
            <path d="M10.5146 18C9.96236 18 9.51465 18.4477 9.51465 19C9.51465 19.5523 9.96236 20 10.5146 20V18ZM28.1923 19.7071C28.5828 19.3166 28.5828 18.6834 28.1923 18.2929L21.8283 11.9289C21.4378 11.5384 20.8047 11.5384 20.4141 11.9289C20.0236 12.3195 20.0236 12.9526 20.4141 13.3431L26.071 19L20.4141 24.6569C20.0236 25.0474 20.0236 25.6805 20.4141 26.0711C20.8047 26.4616 21.4378 26.4616 21.8283 26.0711L28.1923 19.7071ZM10.5146 19V20H27.4852V19V18H10.5146V19Z" fill="black"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default SectionC 