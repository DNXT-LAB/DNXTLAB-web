import { SCROLL_LEVELS, SCROLL_CONFIG } from './constants'
import type { ScrollProgress } from '@/types/animations'

// Funciones de easing
export const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3)
export const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4)

// Calcular el progreso de scroll para cada nivel
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

// Calcular las transformaciones para la Sección A
export const calculateSectionATransforms = (scrollY: number, progress: ScrollProgress, windowSize: { width: number; height: number }) => {
  const { secondSmoothProgress } = progress
  const { SECOND_LEVEL_START } = SCROLL_LEVELS
  
  const sectionATranslateY = scrollY < SECOND_LEVEL_START ? 0 : -(secondSmoothProgress * 600)
  const sectionAScale = scrollY < SECOND_LEVEL_START ? 1 : 1 - (secondSmoothProgress * 0.9)
  
  // Video y texto convergen al centro
  const centerX = windowSize.width / 2
  const centerY = windowSize.height / 2
  const videoOriginalLeft = 60 + 60 + 306
  const videoOriginalTop = 154 + 255
  const textOriginalLeft = 60 + 780 + 473
  const textOriginalTop = 400
  
  const videoConvergeX = scrollY < SECOND_LEVEL_START ? 0 : (centerX - videoOriginalLeft) * secondSmoothProgress
  const videoConvergeY = scrollY < SECOND_LEVEL_START ? 0 : (centerY - videoOriginalTop) * secondSmoothProgress
  const textConvergeX = scrollY < SECOND_LEVEL_START ? 0 : (centerX - textOriginalLeft) * secondSmoothProgress
  const textConvergeY = scrollY < SECOND_LEVEL_START ? 0 : (centerY - textOriginalTop) * secondSmoothProgress
  
  return {
    sectionATranslateY,
    sectionAScale,
    videoConvergeX,
    videoConvergeY,
    textConvergeX,
    textConvergeY
  }
}

// Calcular las propiedades de la pestaña
export const calculateTabProperties = (scrollY: number, windowHeight: number) => {
  const { THRESHOLD, NAVBAR_HEIGHT } = SCROLL_CONFIG
  const { SECOND_LEVEL_START } = SCROLL_LEVELS
  
  const maxScroll = Math.max(650, windowHeight * 0.35)
  const adjustedScroll = Math.max(0, scrollY - THRESHOLD)
  const tabProgress = Math.max(0, Math.min(adjustedScroll / maxScroll, 1))
  const smoothTabProgress = easeOutQuart(tabProgress)
  
  const tabTransform = scrollY < THRESHOLD ? 100 : 100 - (smoothTabProgress * 100)
  const tabHeight = scrollY < SECOND_LEVEL_START ? `calc(100vh - ${NAVBAR_HEIGHT}px)` : '100vh'
  const tabTop = scrollY < SECOND_LEVEL_START ? `${NAVBAR_HEIGHT}px` : '0px'
  
  return {
    tabTransform,
    tabHeight,
    tabTop,
    smoothTabProgress
  }
} 