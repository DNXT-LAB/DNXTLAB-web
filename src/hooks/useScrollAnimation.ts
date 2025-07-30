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

  // Effect para configurar eventos de scroll y resize (solo una vez)
  useEffect(() => {
    let touchStartY = 0
    let touchEndY = 0

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

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches[0]) {
        touchStartY = e.touches[0].clientY
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      // No prevenir el comportamiento por defecto aquí para permitir scroll nativo
      if (e.touches[0]) {
        touchEndY = e.touches[0].clientY
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isTransitioning) return
      
      const touchDiff = touchStartY - touchEndY
      const minSwipeDistance = 50 // Mínima distancia para considerar un swipe
      
      if (Math.abs(touchDiff) > minSwipeDistance) {
        setIsTransitioning(true)
        
        if (touchDiff > 0) {
          // Swipe hacia arriba (scroll down)
          setCurrentSection(prev => Math.min(prev + 1, SECTION_POSITIONS.length - 1))
        } else {
          // Swipe hacia abajo (scroll up)
          setCurrentSection(prev => Math.max(prev - 1, 0))
        }
        
        setTimeout(() => setIsTransitioning(false), SCROLL_CONFIG.TRANSITION_TIMEOUT)
      }
    }

    const handleResize = () => {
      setWindowHeight(window.innerHeight)
      setWindowWidth(window.innerWidth)
    }

    if (typeof window !== 'undefined') {
      // Configurar valores iniciales solo una vez
      setWindowHeight(window.innerHeight)
      setWindowWidth(window.innerWidth)
      
      // Eventos de ratón (desktop)
      window.addEventListener('wheel', handleWheel, { passive: false })
      
      // Eventos touch (móvil)
      window.addEventListener('touchstart', handleTouchStart, { passive: true })
      window.addEventListener('touchmove', handleTouchMove, { passive: true })
      window.addEventListener('touchend', handleTouchEnd, { passive: true })
      
      // Evento resize
      window.addEventListener('resize', handleResize)
      
      return () => {
        window.removeEventListener('wheel', handleWheel)
        window.removeEventListener('touchstart', handleTouchStart)
        window.removeEventListener('touchmove', handleTouchMove)
        window.removeEventListener('touchend', handleTouchEnd)
        window.removeEventListener('resize', handleResize)
      }
    }
    
    return () => {}
  }, [isTransitioning])

  // Effect separado para animaciones de scroll basadas en currentSection
  useEffect(() => {
    if (typeof window !== 'undefined') {
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
    }
  }, [currentSection])

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