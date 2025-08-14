import { useState, useEffect, useCallback, useRef } from 'react'
import { SECTION_POSITIONS, SCROLL_CONFIG } from '@/utils/constants'
import { calculateScrollProgress, calculateSectionATransforms, calculateTabProperties } from '@/utils/animations'

export const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0)
  const [windowHeight, setWindowHeight] = useState(800)
  const [windowWidth, setWindowWidth] = useState(1200)
  const [currentSection, setCurrentSection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  // Smoothed scroll value used only on touch devices to avoid stutters
  const [smoothedScrollY, setSmoothedScrollY] = useState(0)
  
  // Ref para acceder a currentSection sin crear dependencia
  const currentSectionRef = useRef(currentSection)
  
  // Update ref every time currentSection changes
  useEffect(() => {
    currentSectionRef.current = currentSection
  }, [currentSection])

  // Function to navigate to a specific section
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

  // Effect to configure scroll and resize events (only once)
  useEffect(() => {
    // Detect if we are on a mobile device
    const isMobile = () => {
      return typeof window !== 'undefined' && (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 1024
      )
    }

    const handleWheel = (e: WheelEvent) => {
      // On mobile, don't interfere with native scroll
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
      setScrollY(scrollPosition) // Actualizar scrollY directamente

      // Elegir la sección más cercana según posiciones reales para evitar saltos
      let nearestIndex = 0
      let nearestDistance = Infinity
      for (let i = 0; i < SECTION_POSITIONS.length; i++) {
        const at = SECTION_POSITIONS[i]
        if (typeof at !== 'number') continue
        const distance = Math.abs(scrollPosition - at)
        if (distance < nearestDistance) {
          nearestDistance = distance
          nearestIndex = i
        }
      }

      if (nearestIndex !== currentSectionRef.current) {
        setCurrentSection(nearestIndex)
      }
    }

    const handleResize = () => {
      setWindowHeight(window.innerHeight)
      setWindowWidth(window.innerWidth)
    }

    if (typeof window !== 'undefined') {
      // Configure initial values
      setWindowHeight(window.innerHeight)
      setWindowWidth(window.innerWidth)
      
      if (isMobile()) {
        // On mobile: use native scroll
        document.body.style.overflow = 'auto'
        document.documentElement.style.overflow = 'auto'
        
        // Set content height to allow native scroll
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
  }, [isTransitioning, navigateToSection])

  // Smooth the scroll signal on touch devices to avoid stutters between sections
  useEffect(() => {
    const isTouch = () => typeof window !== 'undefined' && window.innerWidth < 1024
    let rafId = 0

    const animate = () => {
      setSmoothedScrollY(prev => {
        const target = scrollY
        if (!isTouch()) return target
        
        // Limitar velocidad por frame y aumentar respuesta
        const maxStep = Math.max(60, windowHeight * 1.1) // límite de píxeles por frame
        let delta = target - prev
        if (Math.abs(delta) > maxStep) delta = Math.sign(delta) * maxStep
        const responsiveness = 0.22 // 0..1
        return prev + delta * responsiveness
      })
      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [scrollY, windowHeight])

  // Effect separado para animaciones de scroll basadas en currentSection
  useEffect(() => {
    const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 1024

    if (typeof window !== 'undefined' && !isMobile()) {
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
  }, [currentSection, scrollY])

  // Calculate all derived values
  const effectiveScrollY = (typeof window !== 'undefined' && windowWidth < 1024) ? smoothedScrollY : scrollY
  const progress = calculateScrollProgress(effectiveScrollY)
  const sectionATransforms = calculateSectionATransforms(effectiveScrollY, progress, { width: windowWidth, height: windowHeight })
  const tabProperties = calculateTabProperties(effectiveScrollY, windowHeight, windowWidth)

  return {
    scrollY: effectiveScrollY,
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