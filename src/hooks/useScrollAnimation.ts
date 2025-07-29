import { useState, useEffect, useCallback } from 'react'
import { SECTION_POSITIONS, SCROLL_CONFIG } from '@/utils/constants'
import { calculateScrollProgress, calculateSectionATransforms, calculateTabProperties } from '@/utils/animations'

export const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0)
  const [windowHeight, setWindowHeight] = useState(800)
  const [windowWidth, setWindowWidth] = useState(1200)
  const [currentSection, setCurrentSection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Función para navegar a una sección específica
  const navigateToSection = useCallback((targetSection: number) => {
    if (targetSection >= 0 && targetSection < SECTION_POSITIONS.length) {
      setIsTransitioning(true)
      setCurrentSection(targetSection)
      
      const targetPosition = SECTION_POSITIONS[targetSection]
      if (targetPosition !== undefined) {
        setScrollY(targetPosition)
      }
      
      setTimeout(() => setIsTransitioning(false), 200)
    }
  }, [])

  // Effect para manejar eventos de scroll y resize
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      
      if (isTransitioning) return
      
      setIsTransitioning(true)
      
      if (e.deltaY > 0) {
        setCurrentSection(prev => Math.min(prev + 1, SECTION_POSITIONS.length - 1))
      } else {
        setCurrentSection(prev => Math.max(prev - 1, 0))
      }
      
      setTimeout(() => setIsTransitioning(false), SCROLL_CONFIG.TRANSITION_TIMEOUT)
    }

    const handleResize = () => {
      setWindowHeight(window.innerHeight)
      setWindowWidth(window.innerWidth)
    }

    if (typeof window !== 'undefined') {
      // Configurar valores iniciales
      setWindowHeight(window.innerHeight)
      setWindowWidth(window.innerWidth)

      // Actualizar scrollY basado en la sección actual con transición suave
      const targetPosition = SECTION_POSITIONS[currentSection]
      if (targetPosition !== undefined) {
        const startPosition = scrollY
        const duration = SCROLL_CONFIG.ANIMATION_DURATION
        const startTime = performance.now()
        
        const animateScroll = (currentTime: number) => {
          const elapsed = currentTime - startTime
          const progress = Math.min(elapsed / duration, 1)
          
          // Easing function (ease-out-cubic)
          const easeProgress = 1 - Math.pow(1 - progress, 3)
          
          const newScrollY = startPosition + (targetPosition - startPosition) * easeProgress
          setScrollY(newScrollY)
          
          if (progress < 1) {
            requestAnimationFrame(animateScroll)
          }
        }
        
        requestAnimationFrame(animateScroll)
      }
      
      window.addEventListener('wheel', handleWheel, { passive: false })
      window.addEventListener('resize', handleResize)
      
      return () => {
        window.removeEventListener('wheel', handleWheel)
        window.removeEventListener('resize', handleResize)
      }
    }
    
    return () => {}
  }, [currentSection, scrollY, isTransitioning])

  // Calcular todos los valores derivados
  const progress = calculateScrollProgress(scrollY)
  const sectionATransforms = calculateSectionATransforms(scrollY, progress, { width: windowWidth, height: windowHeight })
  const tabProperties = calculateTabProperties(scrollY, windowHeight)

  return {
    scrollY,
    windowHeight,
    windowWidth,
    currentSection,
    isTransitioning,
    progress,
    sectionATransforms,
    tabProperties,
    navigateToSection
  }
} 