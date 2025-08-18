'use client'

import React, { useRef, useEffect } from 'react'
import Navbar from './Navbar'
import HeroSection from './sections/HeroSection'
import SectionA from './sections/SectionA'
import SectionB from './sections/SectionB'
import SectionC from './sections/SectionC'
import SectionD from './sections/SectionD'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useContactForm } from '@/hooks/useContactForm'
import { SCROLL_LEVELS } from '@/utils/constants'

export default function VideoContent() {
  const videoRef = useRef<HTMLVideoElement>(null)
  
  // Hooks personalizados
  const {
    scrollY,
    windowHeight,
    // windowWidth,
    progress,
    sectionATransforms,
    tabProperties,
    navigateToSection
  } = useScrollAnimation()
  
  const {
    formState,
    handleInputChange,
    handleSubmit
  } = useContactForm()

  // Inicializar video
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch(error => {
        console.warn('Error al reproducir video:', error)
      })
    }
  }, [])

  const { tabTransform, tabHeight, tabTop } = tabProperties
  const { secondSmoothProgress } = progress

  return (
    <div className="relative w-screen bg-black">
      {/* Video Background - Fixed so it's always in the background */}
      <video
        ref={videoRef}
        className="fixed inset-0 w-screen h-screen object-fill z-0"
        style={{
          width: '100vw',
          height: '850px'
        }}
        src="/video.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-label="Background video showing DNXTLAB solutions"
      />
      
      {/* Overlay to improve readability */}
      <div className="fixed inset-0 bg-black/60 z-10" aria-hidden="true" style={{ width: '100vw', height: '100dvh' }} />
      
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-60 p-8">
        <Navbar 
          isDark={secondSmoothProgress > 0.3} 
          onNavigateToSection={navigateToSection}
        />
      </div>
      
      {/* Hero Section - Fixed main content */}
      <HeroSection onNavigateToSection={navigateToSection} />

      {/* White tab that slides from below */}
      <div 
        className="fixed h-full left-0 right-0 z-50 transition-all duration-500 ease-out"
        style={{
          transform: `translateY(${tabTransform}%)`,
          borderRadius: scrollY < SCROLL_LEVELS.SECOND_LEVEL_START ? '32px 32px 0 0' : `${16 * (1 - secondSmoothProgress)}px`,
          height: tabHeight,
          top: tabTop,
          width: '100vw',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.3)',
          transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-radius 0.4s ease-out, height 0.4s ease-out, top 0.4s ease-out'
        }}
      >
        <div 
          className="relative"
          style={{
            position: 'absolute',
            width: '1817px',
            height: '861px',
            left: '60px',
          }}
        >
          {/* Section A */}
          <SectionA 
            scrollY={scrollY}
            progress={progress}
            windowHeight={windowHeight}
            {...sectionATransforms}
            onNavigateToSection={navigateToSection}
          />
          
          {/* Section B */}
          <SectionB 
            scrollY={scrollY}
            progress={progress}
            windowHeight={windowHeight}
          />
          
          {/* Section C */}
          <SectionC 
            scrollY={scrollY}
            progress={progress}
            windowHeight={windowHeight}
            onNavigateToSection={navigateToSection}
          />

          {/* Section D */}
          <SectionD 
            scrollY={scrollY}
            progress={progress}
            windowHeight={windowHeight}
            formState={formState}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>

      {/* Contenido invisible para activar scroll */}
      <div className="relative z-0 bg-transparent" style={{ height: '200vh' }} />
      <div className="relative z-0 bg-transparent" style={{ height: '100vh' }} />
      <div className="relative z-0 bg-transparent" style={{ height: '200vh' }} />
      <div className="relative z-0 bg-transparent" style={{ height: '200vh' }} />
      <div className="relative z-0 bg-transparent" style={{ height: '400vh' }} />
      <div className="relative z-0 bg-transparent" style={{ height: '400vh' }} />
      <div className="relative z-0 bg-transparent" style={{ height: '400vh' }} />
      <div className="relative z-0 bg-transparent" style={{ height: '400vh' }} />
    </div>
  )
} 