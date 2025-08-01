import { useState, useEffect, useCallback, useRef } from 'react'
import { SECTION_POSITIONS, SCROLL_CONFIG } from '@/utils/constants'
import { calculateScrollProgress, calculateSectionATransforms, calculateTabProperties } from '@/utils/animations'

export const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0)
  const [windowHeight, setWindowHeight] = useState(800)
  const [windowWidth, setWindowWidth] = useState(1200)
  const [currentSection, setCurrentSection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  // Ref para acceder a currentSection sin crear dependencia
  const currentSectionRef = useRef(currentSection)
  
  // Actualizar ref cada vez que cambie currentSection
  useEffect(() => {
    currentSectionRef.current = currentSection
  }, [currentSection])

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
    // Detectar si estamos en un dispositivo móvil
    const isMobile = () => {
      return typeof window !== 'undefined' && (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 1024
      )
    }



    const handleWheel = (e: WheelEvent) => {
      // En móvil, no interferir con el scroll nativo
      if (isMobile()) return
      
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

    const handleNativeScroll = () => {
      if (!isMobile()) return
      
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      
      // Calcular qué sección debería estar activa basada en el scroll nativo
      const sectionIndex = Math.round(scrollPosition / windowHeight)
      const clampedSection = Math.max(0, Math.min(sectionIndex, SECTION_POSITIONS.length - 1))
      
      if (clampedSection !== currentSectionRef.current) {
        setCurrentSection(clampedSection)
        setScrollY(SECTION_POSITIONS[clampedSection] || 0)
      }
    }

    const handleResize = () => {
      setWindowHeight(window.innerHeight)
      setWindowWidth(window.innerWidth)
    }

    if (typeof window !== 'undefined') {
      // Configurar valores iniciales
      setWindowHeight(window.innerHeight)
      setWindowWidth(window.innerWidth)
      
      if (isMobile()) {
        // En móvil: usar scroll nativo
        document.body.style.overflow = 'auto'
        document.documentElement.style.overflow = 'auto'
        
        // Establecer altura del contenido para permitir scroll nativo
        document.body.style.height = `${SECTION_POSITIONS.length * 100}vh`
        
        window.addEventListener('scroll', handleNativeScroll, { passive: true })
      } else {
        // En desktop: usar scroll personalizado
        document.body.style.overflow = 'hidden'
        document.documentElement.style.overflow = 'hidden'
        
        window.addEventListener('wheel', handleWheel, { passive: false })
      }
      
      window.addEventListener('resize', handleResize)
      
      return () => {
        window.removeEventListener('wheel', handleWheel)
        window.removeEventListener('scroll', handleNativeScroll)
        window.removeEventListener('resize', handleResize)
        
        // Restaurar estilos
        if (typeof document !== 'undefined') {
          document.body.style.overflow = ''
          document.documentElement.style.overflow = ''
          document.body.style.height = ''
        }
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
  const tabProperties = calculateTabProperties(scrollY, windowHeight, windowWidth)

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