import { useState, useEffect, useCallback, useMemo } from 'react'
import { AnimationPhase, AnimationState } from '../types'

const ANIMATION_CONFIG = {
  INITIAL_DELAY: 300,
  LETTER_DELAY: 80,
  FINAL_DELAY: 1000,
  TEXT: "DNXT LAB"
} as const

export function useLoadingAnimation(): AnimationState {
  const [mounted, setMounted] = useState(false)
  const [phase, setPhase] = useState<AnimationPhase>('initial')
  const [animatedLetters, setAnimatedLetters] = useState<boolean[]>([])

  // Memoize letters to avoid recalculating on each render
  const letters = useMemo(() => ANIMATION_CONFIG.TEXT.split(''), [])

  // Function to update animated letter
  const updateAnimatedLetter = useCallback((index: number) => {
    setAnimatedLetters(prev => {
      const newArray = [...prev]
      newArray[index] = true
      return newArray
    })
  }, [])

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = []

    // Mark as mounted
    setMounted(true)
    
    // Initialize animated letters array
    setAnimatedLetters(new Array(letters.length).fill(false))

    // Configure animation sequence
    const initialTimer = setTimeout(() => {
      setPhase('animating')
      
      // Schedule animation for each letter
      letters.forEach((_, index) => {
        const letterTimer = setTimeout(() => {
          updateAnimatedLetter(index)
        }, index * ANIMATION_CONFIG.LETTER_DELAY)
        
        timeouts.push(letterTimer)
      })

      // Schedule transition to video
      const videoTimer = setTimeout(() => {
        setPhase('video')
      }, letters.length * ANIMATION_CONFIG.LETTER_DELAY + ANIMATION_CONFIG.FINAL_DELAY)
      
      timeouts.push(videoTimer)
    }, ANIMATION_CONFIG.INITIAL_DELAY)

    timeouts.push(initialTimer)

    // Cleanup: clear all timeouts on unmount
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout))
    }
  }, [letters, updateAnimatedLetter])

  return {
    mounted,
    phase,
    animatedLetters,
    letters
  }
} 