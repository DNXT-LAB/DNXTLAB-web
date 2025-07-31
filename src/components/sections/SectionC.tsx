import React, { useState, useEffect } from 'react'
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

  const [scaleFactor, setScaleFactor] = useState(1)
  const [viewportDimensions, setViewportDimensions] = useState({ width: 1920, height: 1080 })

  // Función para calcular el factor de escala basado en el viewport
  const calculateScaleAndDimensions = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth
      const height = window.innerHeight
      
      // Base de referencia: 1920x1080 (pantalla estándar)
      const baseWidth = 1920
      const baseHeight = 1080
      
      // Calcular factor de escala basado en el ancho, con límites mínimos y máximos
      const widthScale = width / baseWidth
      const heightScale = height / baseHeight
      
      // Usar el menor de los dos factores para mantener proporciones
      const scale = Math.min(widthScale, heightScale)
      
      // Aplicar límites para evitar escalas extremas
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

  // Effect para actualizar el factor de escala cuando cambie el tamaño
  useEffect(() => {
    const updateScale = () => {
      const { scaleFactor: newScale, width, height } = calculateScaleAndDimensions()
      setScaleFactor(newScale)
      setViewportDimensions({ width, height })
    }

    // Establecer escala inicial
    updateScale()

    // Escuchar cambios de tamaño
    window.addEventListener('resize', updateScale)
    
    return () => {
      window.removeEventListener('resize', updateScale)
    }
  }, [])

  // Calcular dimensiones y posiciones escaladas
  const getScaledDimensions = () => {
    // Posición left responsiva según tamaño de pantalla
    const getResponsiveLeftPosition = () => {
      if (viewportDimensions.width >= 1536) return 0.45      // 2XL: 45% (perfecto)
      if (viewportDimensions.width >= 1280) return 0.60      // XL: 48% (más centrado)
      return 0.5                                             // Desktop: 50% (centrado para mejor visibilidad)
    }
    
    const getResponsiveMaxWidth = () => {
      if (viewportDimensions.width >= 1536) return 700       // 2XL: 700px (perfecto)
      if (viewportDimensions.width >= 1280) return 650       // XL: 650px (más junto al centro)
      return 600                                             // Desktop: 600px (más junto al centro)
    }
    
    const getResponsivePaddingX = () => {
      if (viewportDimensions.width >= 1536) return 4         // 2XL: 4rem (original)
      if (viewportDimensions.width >= 1280) return 3         // XL: 3rem (más junto)
      return 2                                               // Desktop: 2rem (más junto)
    }
    
    const getResponsivePaddingLeft = () => {
      if (viewportDimensions.width >= 1536) return 2         // 2XL: 2rem (perfecto)
      if (viewportDimensions.width >= 1280) return 4         // XL: 4rem (mover más al centro)
      return 6                                               // Desktop: 6rem (mover más al centro)
    }
    
    const baseLeftPosition = viewportDimensions.width * getResponsiveLeftPosition()
    
    return {
      leftPosition: baseLeftPosition,
      maxWidths: {
        small: 330 * scaleFactor, // max-w-[330px]
        large: getResponsiveMaxWidth() * scaleFactor  // Responsivo según pantalla
      },
      padding: {
        px16: getResponsivePaddingX() * scaleFactor, // Responsivo según pantalla
        pl8: getResponsivePaddingLeft() * scaleFactor,  // Responsivo
        p4: 1 * scaleFactor,   // p-4 escalado
        p6: 1.5 * scaleFactor  // p-6 escalado
      }
    }
  }

  const dimensions = getScaledDimensions()

  // Calcular tamaños de fuente escalados responsivamente
  const getScaledFontSizes = () => {
    const getResponsiveMainTitle = () => {
      if (viewportDimensions.width >= 1536) return 5.5       // 2XL: 5.5rem
      if (viewportDimensions.width >= 1280) return 4.5       // XL: 4.5rem
      return 3.5                                             // Desktop: 3.5rem (más compacto)
    }
    
    return {
      mainTitle: {
        mobile: `${2.5 * scaleFactor}rem`,      // text-2xl aumentado
        desktop: `${getResponsiveMainTitle() * scaleFactor}rem` // Responsivo
      },
      mobileTitle: `${3.2 * scaleFactor}rem`, // text-4xl aumentado
      subtitle: `${2.8 * scaleFactor}rem`,   // text-[36px] aumentado
      subtitleMobile: `${1.8 * scaleFactor}rem`, // text-[24px] aumentado
      serviceTitle: `${1.4 * scaleFactor}rem`, // text-lg aumentado
      serviceDescription: `${1.2 * scaleFactor}rem`, // text-base aumentado
      button: {
        mobile: `${1.1 * scaleFactor}rem`, // text-sm aumentado
        desktop: `${1.4 * scaleFactor}rem` // text-lg aumentado
      },
      spacing: {
        mb1: `${0.4 * scaleFactor}rem`,
        mb6: `${2.2 * scaleFactor}rem`,
        mb8: `${3 * scaleFactor}rem`,
        mb12: `${4.5 * scaleFactor}rem`,
        mt28: `${8.5 * scaleFactor}rem`,
        mt36: `${11 * scaleFactor}rem`,
        gap4: `${1.5 * scaleFactor}rem`,
        gap6: `${2.2 * scaleFactor}rem`,
        spaceY6: `${2.2 * scaleFactor}rem`
      },
      buttonPadding: {
        mobile: {
          x: `${2 * scaleFactor}rem`, // px-6 aumentado
          y: `${1 * scaleFactor}rem` // py-3 aumentado
        },
        desktop: {
          x: `${4 * scaleFactor}rem`, // px-12 aumentado
          y: `${1.4 * scaleFactor}rem`  // py-4 aumentado
        }
      }
    }
  }

  const fontSizes = getScaledFontSizes()

  const sectionStyle: React.CSSProperties = { 
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '50%',
    left: `${dimensions.leftPosition}px`,
    transform: `translate(-50%, ${thirdSmoothProgress < 0.4 ? '100%' : '-50%'}) translateY(${seventhSmoothProgress > 0 ? -(seventhSmoothProgress * 1200 * scaleFactor) : 0}px)`,
    transformOrigin: 'center center',
    opacity: thirdSmoothProgress < 0.4 ? 0 : (seventhSmoothProgress > 0.3 ? Math.max(0, 1 - (seventhSmoothProgress * 2)) : 1),
    visibility: thirdSmoothProgress > 0.35 && seventhSmoothProgress < 0.6 ? 'visible' : 'hidden',
    transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    willChange: 'transform, opacity'
  }

  const leftContentStyle = {
    transform: `translateY(${thirdSmoothProgress < 0.6 ? (1 - thirdSmoothProgress) * 300 * scaleFactor : 0}px) translateX(${thirdSmoothProgress < 0.6 ? (1 - thirdSmoothProgress) * -150 * scaleFactor : 0}px)`,
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

  // Función para obtener posición inicial de card1 responsiva
  const getResponsiveCard1Position = () => {
    if (viewportDimensions.width >= 1536) return '108%'      // 2XL: 108% (original)
    return '75%'                                             // Desktop/XL: 75% (más visible)
  }

  // Calcular posiciones y rotaciones de las cards
  const card1Position = sixthSmoothProgress > 0 
    ? `${-8 + (-8 - 50) * Math.min(1, sixthSmoothProgress * 1.8)}%` 
    : (fifthSmoothProgress > 0 ? '-8%' : (fourthSmoothProgress > 0 ? '50%' : getResponsiveCard1Position()))
  
  const card2Position = sixthSmoothProgress > 0 
    ? '-8%' 
    : (fifthSmoothProgress > 0 ? '50%' : (fourthSmoothProgress > 0 ? '100%' : '200%')) // Cambio: 118% -> 100% (más visible)
  
  const card3Position = sixthSmoothProgress > 0 
    ? '50%' 
    : (fifthSmoothProgress > 0 ? '100%' : '200%') // Cambio: 118% -> 100% (más visible)

  const card1Rotation = fifthSmoothProgress > 0 ? '15' : (fourthSmoothProgress > 0 && fifthSmoothProgress === 0) ? '0' : '-15'
  const card2Rotation = sixthSmoothProgress > 0 ? '15' : (fifthSmoothProgress > 0 ? '0' : '-15')
  const card3Rotation = sixthSmoothProgress > 0 ? '0' : '-15'

  const card1Opacity = thirdSmoothProgress < 0.4 ? 0 : Math.min(1, (thirdSmoothProgress - 0.4) * 2.5)
  const card2Opacity = fourthSmoothProgress > 0 ? 1 : 0
  const card3Opacity = fifthSmoothProgress > 0 ? 1 : 0

  return (
    <div style={sectionStyle}>
      {/* Layout Desktop - Solo visible en pantallas >= 1024px */}
      <div 
        className="hidden lg:flex w-full h-full"
        style={{ paddingLeft: `${dimensions.padding.px16}rem`, paddingRight: `${dimensions.padding.px16}rem` }}
      >
        {/* Contenido principal lado izquierdo */}
        <div 
          className="flex-1"
          style={{ 
            ...leftContentStyle, 
            paddingLeft: `${dimensions.padding.pl8}rem` 
          }}
        >
          <div 
            style={{ 
              ...titleStyle,
              maxWidth: `${dimensions.maxWidths.large}px`
            }}
          >
            <h2 
              className="font-bold text-black font-poppins leading-[1.1]"
              style={{ 
                fontSize: fontSizes.mainTitle.desktop,
                marginBottom: fontSizes.spacing.mb6,
                marginTop: viewportDimensions.width >= 1536 ? fontSizes.spacing.mt28 : '20rem', // 2XL: original, otros: mt-80
                textAlign: 'start'
              }}
            >
              ELEVATE YOUR<br/>
              DIGITAL<br/>
              INFRASTRUCTURE
            </h2>
            <div style={{ opacity: servicesOpacity }} className="transition-opacity duration-500">
              <p 
                className="text-black font-poppins"
                style={{ 
                  fontSize: fontSizes.subtitle,
                  marginBottom: fontSizes.spacing.mb12
                }}
              >
                Explore our core expertise
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: fontSizes.spacing.spaceY6 }}>
                <div>
                  <h3 
                    className="font-poppins"
                    style={{ 
                      fontSize: fontSizes.serviceTitle,
                      marginBottom: fontSizes.spacing.mb1
                    }}
                  >
                    Web Design & Development:
                  </h3>
                  <p 
                    className="text-gray-600 font-poppins"
                    style={{ fontSize: fontSizes.serviceDescription }}
                  >
                    Crafting sleek, responsive websites that convert and reflect<br/>
                    your brand with precision.
                  </p>
                </div>
                
                <div>
                  <h3 
                    className="font-poppins"
                    style={{ 
                      fontSize: fontSizes.serviceTitle,
                      marginBottom: fontSizes.spacing.mb1
                    }}
                  >
                    AI Integrations
                  </h3>
                  <p 
                    className="text-gray-600 font-poppins"
                    style={{ fontSize: fontSizes.serviceDescription }}
                  >
                    Automating workflows, enhancing decision-making, and<br/>
                    unlocking new business capabilities with custom AI agents.
                  </p>
                </div>
                
                <div>
                  <h3 
                    className="font-poppins"
                    style={{ 
                      fontSize: fontSizes.serviceTitle,
                      marginBottom: fontSizes.spacing.mb1
                    }}
                  >
                    Cybersecurity Consultancy
                  </h3>
                  <p 
                    className="text-gray-600 font-poppins"
                    style={{ fontSize: fontSizes.serviceDescription }}
                  >
                    Protecting your digital assets with proactive strategies and<br/>
                    robust security frameworks tailored to your operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenedor de Cards Desktop */}
        <div 
          className="absolute inset-0"
          style={{
            marginTop: viewportDimensions.width >= 1536 ? '20rem' : '10rem' // 2XL: mt-80, otros: mt-40 (más arriba)
          }}
        >
          <ServiceCard 
            title="WEB DESIGN & DEVELOPMENT"
            subtitle="Design That Converts"
            description="From sleek landing pages to complex platforms, we design and develop responsive, high-converting websites that adapt to your brand and scale with your business. Every pixel and line of code is crafted with purpose—to deliver speed, clarity, and results."
            gradient="linear-gradient(135deg, #e5e7eb 0%, #9ca3af 100%)"
            position={card1Position}
            rotation={card1Rotation}
            opacity={card1Opacity}
            scaleFactor={scaleFactor}
          />
          
          <ServiceCard 
            title="AI INTEGRATIONS"
            subtitle="Smarter Business Operations"
            description="We help businesses unlock the power of AI with custom-built solutions that automate workflows, streamline decision-making, and boost productivity. From poppinsnal tools to customer-facing experiences, we design AI that adapts to your goals—and delivers measurable impact."
            gradient="linear-gradient(135deg, #dbeafe 0%, #60a5fa 100%)"
            position={card2Position}
            rotation={card2Rotation}
            opacity={card2Opacity}
            scaleFactor={scaleFactor}
          />
          
          <ServiceCard 
            title="CYBERSECURITY CONSULTANCY"
            subtitle="Protect What Matters"
            description="We help you safeguard your digital infrastructure with proactive cybersecurity strategies. From risk assessments to secure system architecture, we design and implement solutions that prevent threats, ensure compliance, and build long-term resilience across your operations."
            gradient="linear-gradient(135deg, #9ca3af 0%, #4b5563 100%)"
            position={card3Position}
            rotation={card3Rotation}
            opacity={card3Opacity}
            scaleFactor={scaleFactor}
          />
        </div>
      </div>

            {/* Layout Mobile & iPad - Visible en pantallas < 1024px */}
      <div className="block lg:hidden bg-white mt-20 relative overflow-hidden">
        {/* Título fijo arriba - Siempre visible */}
        <div className="mb-6 absolute top-4 left-[700px] md:left-[560px] right-0 text-left z-50 bg-white pt-4">
          <h2 className="text-[33px] md:text-3xl font-bold text-black font-poppins leading-none mr-28 md:mr-40">
            ELEVATE YOUR<br/>
            DIGITAL<br/>
            INFRASTRUCTURE
          </h2>
        </div>

        {/* Contenido de servicios - Se oculta cuando aparecen cards */}
        <div 
          className="flex flex-col justify-center h-full"
          style={{ 
            opacity: thirdSmoothProgress < 30000.6 ? 1 : Math.max(0, 1 - ((thirdSmoothProgress - 0.6) * 2.5)),
            transition: 'opacity 0.8s ease-out'
          }}
        >
          <div className="text-center mt-52">
            <p className="text-xl md:text-3xl text-black font-semibold font-poppins mb-8 mr-40 md:mr-80">
              Explore our core expertise
            </p>
            <div className="mr-40 mt-6">
              <h3 className="text-sm md:text-lg mr-16 font-poppins text-black">
                Web Design & Development:
              </h3>
              <p className="text-sm md:text-base text-black font-poppins text-left ml-[700px] w-80">
                Crafting sleek, responsive websites that convert and reflect your brand with precision.
              </p>
            </div>

            <div className="mr-40 mt-5">
              <h3 className="text-sm md:text-lg mr-40 font-poppins text-black">
                AI Integrations
              </h3>
              <p className="text-sm md:text-base text-gray-600 font-poppins text-left ml-[700px] w-80">
                Automating workflows, enhancing decision-making, and unlocking new business capabilities with custom AI agents.
              </p>
            </div>
            
            <div className="mr-40 mt-5">
              <h3 className="text-sm md:text-lg mr-16 font-poppins text-black">
                Cybersecurity Consultancy
              </h3>
              <p className="text-sm md:text-base text-gray-600 font-poppins text-left ml-[700px] w-80">
                Protecting your digital assets with proactive strategies and robust security frameworks tailored to your operations.
              </p>
            </div>
          </div>
        </div>

        {/* Cards con efecto derecha a izquierda - Aparecen progresivamente */}
        <div className="absolute inset-0 pt-20">
          {/* ServiceCard 1 - Aparece primero con efecto */}
          {thirdSmoothProgress >= 0.4 && (
            <ServiceCard 
              title="WEB DESIGN & DEVELOPMENT"
              subtitle="Design That Converts"
              description="From sleek landing pages to complex platforms, we design and develop responsive, high-converting websites that adapt to your brand and scale with your business. Every pixel and line of code is crafted with purpose—to deliver speed, clarity, and results."
              gradient="linear-gradient(135deg, #e5e7eb 0%, #9ca3af 100%)"
              position={card1Position}
              rotation={card1Rotation}
              opacity={card1Opacity}
              scaleFactor={0.6}
            />
          )}
          
          {/* ServiceCard 2 - Aparece segundo con efecto */}
          {fourthSmoothProgress > 0 && (
            <ServiceCard 
              title="AI INTEGRATIONS"
              subtitle="Smarter Business Operations"
              description="We help businesses unlock the power of AI with custom-built solutions that automate workflows, streamline decision-making, and boost productivity. From poppinsnal tools to customer-facing experiences, we design AI that adapts to your goals—and delivers measurable impact."
              gradient="linear-gradient(135deg, #dbeafe 0%, #60a5fa 100%)"
              position={card2Position}
              rotation={card2Rotation}
              opacity={card2Opacity}
              scaleFactor={0.6}
            />
          )}
          
          {/* ServiceCard 3 - Aparece tercero con efecto */}
          {fifthSmoothProgress > 0 && (
            <ServiceCard 
              title="CYBERSECURITY CONSULTANCY"
              subtitle="Protect What Matters"
              description="We help you safeguard your digital infrastructure with proactive cybersecurity strategies. From risk assessments to secure system architecture, we design and implement solutions that prevent threats, ensure compliance, and build long-term resilience across your operations."
              gradient="linear-gradient(135deg, #9ca3af 0%, #4b5563 100%)"
              position={card3Position}
              rotation={card3Rotation}
              opacity={card3Opacity}
              scaleFactor={0.6}
            />
          )}
        </div>
      </div>

      {/* Botón Services centrado */}
      <div className="absolute left-1/2 -translate-x-1/2" style={{ 
        bottom: '-35%',
        opacity: 1,
        transition: 'opacity 0.5s ease-out'
      }}>
        <button 
          className="flex items-center bg-black text-white rounded-full font-poppins hover:bg-gray-800 transition-colors"
          style={{
            gap: fontSizes.spacing.gap4,
            paddingLeft: fontSizes.buttonPadding.desktop.x,
            paddingRight: fontSizes.buttonPadding.desktop.x,
            paddingTop: fontSizes.buttonPadding.desktop.y,
            paddingBottom: fontSizes.buttonPadding.desktop.y,
            fontSize: fontSizes.button.desktop
          }}
        >
          SERVICES
          <svg 
            style={{ 
              width: `${2 * scaleFactor}rem`, 
              height: `${2 * scaleFactor}rem` 
            }}
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