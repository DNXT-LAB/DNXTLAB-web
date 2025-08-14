import { SCROLL_LEVELS, SCROLL_CONFIG } from './constants'
import type { ScrollProgress } from '@/types/animations'

// Easing functions
export const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3)
export const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4)

// Calculate scroll progress for each level
export const calculateScrollProgress = (scrollY: number): ScrollProgress => {
  const secondLevelProgress = Math.max(0, Math.min((scrollY - SCROLL_LEVELS.SECOND_LEVEL_START) / SCROLL_LEVELS.SECOND_LEVEL_RANGE, 1))
  const thirdLevelProgress = Math.max(0, Math.min((scrollY - SCROLL_LEVELS.THIRD_LEVEL_START) / SCROLL_LEVELS.THIRD_LEVEL_RANGE, 1))
  const fourthLevelProgress = Math.max(0, Math.min((scrollY - SCROLL_LEVELS.FOURTH_LEVEL_START) / SCROLL_LEVELS.FOURTH_LEVEL_RANGE, 1))
  const fifthLevelProgress = Math.max(0, Math.min((scrollY - SCROLL_LEVELS.FIFTH_LEVEL_START) / SCROLL_LEVELS.FIFTH_LEVEL_RANGE, 1))
  const sixthLevelProgress = Math.max(0, Math.min((scrollY - SCROLL_LEVELS.SIXTH_LEVEL_START) / SCROLL_LEVELS.SIXTH_LEVEL_RANGE, 1))
  const seventhLevelProgress = Math.max(0, Math.min((scrollY - SCROLL_LEVELS.SEVENTH_LEVEL_START) / SCROLL_LEVELS.SEVENTH_LEVEL_RANGE, 1))

  return {
    secondSmoothProgress: easeOutCubic(secondLevelProgress),
    thirdSmoothProgress: easeOutCubic(thirdLevelProgress),
    fourthSmoothProgress: easeOutCubic(fourthLevelProgress),
    fifthSmoothProgress: easeOutCubic(fifthLevelProgress),
    sixthSmoothProgress: easeOutCubic(sixthLevelProgress),
    seventhSmoothProgress: easeOutCubic(seventhLevelProgress)
  }
}

// Calculate transformations for Section A
export const calculateSectionATransforms = (scrollY: number, progress: ScrollProgress, windowSize: { width: number; height: number }) => {
  const { secondSmoothProgress } = progress
  const { SECOND_LEVEL_START } = SCROLL_LEVELS

  // Usar easing más suave en táctiles
  const isTouch = windowSize.width < 1024
  const eased = isTouch ? easeOutQuart(secondSmoothProgress) : secondSmoothProgress
  
  const sectionATranslateY = scrollY < SECOND_LEVEL_START ? 0 : -(eased * 600)
  const sectionAScale = scrollY < SECOND_LEVEL_START ? 1 : 1 - (eased * 0.4)
  
  // Video and text converge to center
  const centerX = windowSize.width / 2
  const centerY = windowSize.height / 2
  const videoOriginalLeft = 60 + 60 + 306
  const videoOriginalTop = 154 + 255
  const textOriginalLeft = 60 + 780 + 473
  const textOriginalTop = 400
  
  const videoConvergeX = scrollY < SECOND_LEVEL_START ? 0 : (centerX - videoOriginalLeft) * eased
  const videoConvergeY = scrollY < SECOND_LEVEL_START ? 0 : (centerY - videoOriginalTop) * eased
  const textConvergeX = scrollY < SECOND_LEVEL_START ? 0 : (centerX - textOriginalLeft) * eased
  const textConvergeY = scrollY < SECOND_LEVEL_START ? 0 : (centerY - textOriginalTop) * eased
  
  return {
    sectionATranslateY,
    sectionAScale,
    videoConvergeX,
    videoConvergeY,
    textConvergeX,
    textConvergeY
  }
}

// Calculate tab properties
export const calculateTabProperties = (scrollY: number, windowHeight: number, windowWidth: number) => {
  const { THRESHOLD } = SCROLL_CONFIG
  const { SECOND_LEVEL_START } = SCROLL_LEVELS
  
  // En táctiles, incrementa maxScroll para transiciones más largas y suaves
  const isTouch = windowWidth < 1024
  const baseMax = Math.max(300, windowHeight * 0.2)
  const maxScroll = isTouch ? Math.max(500, windowHeight * 0.35) : baseMax
  const adjustedScroll = Math.max(0, scrollY - THRESHOLD)
  const tabProgress = Math.max(0, Math.min(adjustedScroll / maxScroll, 1))
  const smoothTabProgress = isTouch ? easeOutCubic(tabProgress) : easeOutQuart(tabProgress)
  
  // Determine base value according to section and responsive breakpoint
  const getResponsiveBaseTransform = () => {
    if (windowWidth < 640) return 90    // Mobile: más cerca para empezar
    if (windowWidth < 1024) return 90   // Tablet: más cerca para empezar
    if (windowWidth < 1536) return 80   // Desktop
    return 50                            // 2xl
  }

  // Responsive navbar height according to Tailwind breakpoints
  const getResponsiveNavbarHeight = () => {
    if (windowWidth < 768) return 100      // mobile
    if (windowWidth < 1024) return 120    // md
    if (windowWidth < 1536) return 130   // lg
    if (windowWidth < 1736) return 140
    return 130                           // 2xl
  }
  
  const baseTransform = scrollY >= 1000 ? 100 : getResponsiveBaseTransform()
  const tabTransform = scrollY < THRESHOLD ? 100 : baseTransform - (smoothTabProgress * baseTransform)
  const NAVBAR_HEIGHT = getResponsiveNavbarHeight()
  const tabHeight = scrollY < SECOND_LEVEL_START ? `calc(120vh - ${NAVBAR_HEIGHT}px)` : '120vh'
  const tabTop = scrollY < SECOND_LEVEL_START ? `${NAVBAR_HEIGHT}px` : '0px'
  
  return {
    tabTransform,
    tabHeight,
    tabTop,
    smoothTabProgress
  }
} 