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
    // Use last SECTION_POSITIONS entry as the maximum logical scroll offset
    const maxScroll = SECTION_POSITIONS[SECTION_POSITIONS.length - 1] ?? 0

    const handleNativeScroll = () => {
      // Read native scroll and clamp internal state only (do not write to window/document here)
      const nativeY = Math.min(window.scrollY, maxScroll)
      setScrollY(nativeY)

      const sectionIndex = Math.round(nativeY / window.innerHeight)
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

      // initialize internal scrollY (do not modify window/document here)
      setScrollY(Math.min(window.scrollY, maxScroll))

      return () => {
        window.removeEventListener('scroll', handleNativeScroll)
        window.removeEventListener('resize', handleResize)
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