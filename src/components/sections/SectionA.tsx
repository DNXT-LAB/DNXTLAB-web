import React from 'react'
import type { SectionAProps } from '@/types/animations'

const SectionA: React.FC<SectionAProps> = ({
  progress,
  sectionATranslateY,
  sectionAScale,
  videoConvergeX,
  videoConvergeY,
  textConvergeX,
  textConvergeY
}) => {
  const { secondSmoothProgress } = progress

  const sectionStyle: React.CSSProperties = { 
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    transform: `translateY(${sectionATranslateY}px) scale(${sectionAScale})`,
    opacity: secondSmoothProgress > 0.7 ? 0 : 1 - (secondSmoothProgress * 1.2),
    visibility: secondSmoothProgress > 0.8 ? 'hidden' : 'visible',
    transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    willChange: 'transform, opacity'
  }

  const videoStyle: React.CSSProperties = {
    position: 'absolute',
    width: '612px',
    height: '510px',
    left: '60px',
    top: '104px',
    transform: `translateY(${sectionATranslateY + videoConvergeY}px) translateX(${videoConvergeX}px) scale(${sectionAScale})`,
    transformOrigin: 'center center',
    opacity: secondSmoothProgress > 0.7 ? 0 : 1 - (secondSmoothProgress * 1.2)
  }

  const textStyle: React.CSSProperties = { 
    position: 'absolute',
    width: '947px',
    height: '753px',
    left: '780px',
    top: 'calc(50% - 853px/2 + 44.5px)',
    transform: `translateY(${sectionATranslateY + textConvergeY}px) translateX(${textConvergeX}px) scale(${sectionAScale})`,
    transformOrigin: 'center center',
    opacity: secondSmoothProgress > 0.7 ? 0 : 1 - (secondSmoothProgress * 1.2)
  }

  return (
    <div style={sectionStyle}>
      <video 
        src="/video2.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline 
        preload="auto" 
        className="object-cover shadow-2xl transition-transform duration-700 ease-out rounded-2xl"
        style={videoStyle}
      />
      
      <div 
        className="transition-transform duration-700 ease-out"
        style={textStyle}
      >
        <h2 className="text-7xl font-bold text-black font-morien mb-6 leading-tight">
          WE BUILD WITH<br/>INTELLIGENCE AND<br/>INTENT
        </h2>
        <p className="text-4xl text-gray-700 font-inter mb-8 leading-tight">
          Smart systems. Seamless design.<br/>Real results.
        </p>
        <p className="text-xl text-gray-600 font-inter max-w-3xl mb-12 leading-relaxed">
          At DNXT LAB, we create intelligent digital solutions that think, adapt, and scale—combining AI automation, UX strategy, and high-performance web design to help you launch faster, work smarter, and grow stronger.
        </p>
        <button 
          className="text-lg px-10 py-5 bg-black text-white rounded-full font-morien hover:bg-gray-800 transition-colors flex items-center gap-4"
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

export default SectionA 