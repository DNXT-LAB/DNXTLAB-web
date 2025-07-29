import { useState, useEffect, useCallback, useMemo } from 'react'
import { AnimationPhase, AnimationState } from '../types'

const ANIMATION_CONFIG = {
  INITIAL_DELAY: 500,
  LETTER_DELAY: 120,
  FINAL_DELAY: 1500,
  TEXT: "DNXT LAB"
} as const

export function useLoadingAnimation(): AnimationState {
  const [mounted, setMounted] = useState(false)
  const [phase, setPhase] = useState<AnimationPhase>('initial')
  const [animatedLetters, setAnimatedLetters] = useState<boolean[]>([])

  // Memoizar las letras para evitar recalcular en cada render
  const letters = useMemo(() => ANIMATION_CONFIG.TEXT.split(''), [])

  // Función para actualizar letra animada
  const updateAnimatedLetter = useCallback((index: number) => {
    setAnimatedLetters(prev => {
      const newArray = [...prev]
      newArray[index] = true
      return newArray
    })
  }, [])

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = []

    // Marcar como montado
    setMounted(true)
    
    // Inicializar array de letras animadas
    setAnimatedLetters(new Array(letters.length).fill(false))

    // Configurar la secuencia de animación
    const initialTimer = setTimeout(() => {
      setPhase('animating')
      
      // Programar animación de cada letra
      letters.forEach((_, index) => {
        const letterTimer = setTimeout(() => {
          updateAnimatedLetter(index)
        }, index * ANIMATION_CONFIG.LETTER_DELAY)
        
        timeouts.push(letterTimer)
      })

      // Programar transición a video
      const videoTimer = setTimeout(() => {
        setPhase('video')
      }, letters.length * ANIMATION_CONFIG.LETTER_DELAY + ANIMATION_CONFIG.FINAL_DELAY)
      
      timeouts.push(videoTimer)
    }, ANIMATION_CONFIG.INITIAL_DELAY)

    timeouts.push(initialTimer)

    // Cleanup: limpiar todos los timeouts al desmontar
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