import { useState, useEffect, useCallback, useRef } from 'react'
import { SECTION_POSITIONS } from '@/utils/constants'
import { calculateScrollProgress, calculateSectionATransforms, calculateTabProperties } from '@/utils/animations'

export const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0)
  const [windowHeight, setWindowHeight] = useState(800)
  const [windowWidth, setWindowWidth] = useState(1200)
  const [currentSection, setCurrentSection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const currentSectionRef = useRef(currentSection)

  useEffect(() => {
    currentSectionRef.current = currentSection
  }, [currentSection])

  // Only scroll to section on navigation, not on every scroll event
  const navigateToSection = useCallback((targetSection: number) => {
    if (targetSection >= 0 && targetSection < SECTION_POSITIONS.length) {
      setIsTransitioning(true)
      setCurrentSection(targetSection)
      const targetPosition = SECTION_POSITIONS[targetSection]
      if (typeof window !== 'undefined' && targetPosition !== undefined) {
        window.scrollTo({ top: targetPosition, behavior: 'smooth' })
      }
      setTimeout(() => setIsTransitioning(false), 200)
    }
  }, [])

  useEffect(() => {
    const handleNativeScroll = () => {
      setScrollY(window.scrollY)
      const sectionIndex = Math.round(window.scrollY / window.innerHeight)
      const clampedSection = Math.max(0, Math.min(sectionIndex, SECTION_POSITIONS.length - 1))
      if (clampedSection !== currentSectionRef.current) {
        setCurrentSection(clampedSection)
      }
    }

    const handleResize = () => {
      setWindowHeight(window.innerHeight)
      setWindowWidth(window.innerWidth)
    }

    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight)
      setWindowWidth(window.innerWidth)
      window.addEventListener('scroll', handleNativeScroll, { passive: true })
      window.addEventListener('resize', handleResize)
      // Only set body height for desktop
      if (window.innerWidth >= 1024) {
        document.body.style.height = `${SECTION_POSITIONS.length * 100}vh`
        document.body.style.overflow = 'auto'
        document.documentElement.style.overflow = 'auto'
      } else {
        document.body.style.height = ''
        document.body.style.overflow = ''
        document.documentElement.style.overflow = ''
      }
      return () => {
        window.removeEventListener('scroll', handleNativeScroll)
        window.removeEventListener('resize', handleResize)
        document.body.style.height = ''
        document.body.style.overflow = ''
        document.documentElement.style.overflow = ''
      }
    }
    return () => {}
  }, [])

  // Calculate all derived values
  const effectiveScrollY = scrollY
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