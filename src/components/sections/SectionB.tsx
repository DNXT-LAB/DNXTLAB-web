import React from 'react'
import type { SectionProps } from '@/types/animations'

const SectionB: React.FC<SectionProps> = ({ progress }) => {
  const { secondSmoothProgress, thirdSmoothProgress } = progress

  const sectionStyle: React.CSSProperties = { 
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '57%',
    left: '50%',
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
        <div className="flex justify-center mb-8 mt-12 mr-40">
          <p className="text-3xl font-inter text-gray-600 uppercase tracking-wider">
            STRATEGIC FLEXIBILITY
          </p>
        </div>
        
        <div className="mb-12">
          <video 
            src="/video1.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="auto" 
            className="object-cover rounded-2xl shadow-lg"
            style={{
              width: '87%',
              height: '430px',
              background: 'linear-gradient(135deg, #0891b2 0%, #1e40af 50%, #7c3aed 100%)'
            }}
          />
        </div>
        
        <div className="text-center w-full max-w-[1400px] ml-32">
          <h2 className="text-5xl text-black font-morien mb-8">
            Solutions That Evolve <span className="font-bold">With Your Business</span>
          </h2>
          <p className="text-xl text-gray-600 font-inter mx-auto" style={{ maxWidth: '1030px' }}>
            At DNXT LAB, we don't sell tools—we design intelligent frameworks tailored to your operations. By blending technical depth with strategic foresight, we ensure every AI or digital solution evolves with your business and supports long-term growth.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SectionB 