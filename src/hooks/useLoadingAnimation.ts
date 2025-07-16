import { useState, useEffect } from 'react'
import { AnimationPhase, AnimationState } from '../types'

export function useLoadingAnimation(): AnimationState {
  const [mounted, setMounted] = useState(false)
  const [phase, setPhase] = useState<AnimationPhase>('initial')
  const [animatedLetters, setAnimatedLetters] = useState<boolean[]>([])

  const text = "DNXT LAB"
  const letters = text.split('')

  useEffect(() => {
    setMounted(true)
    // Inicializar array de letras animadas
    setAnimatedLetters(new Array(letters.length).fill(false))

    // Después de 500ms, comenzar la animación
    const initialTimer = setTimeout(() => {
      setPhase('animating')
      
      // Animar letras de izquierda a derecha
      letters.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedLetters(prev => {
            const newArray = [...prev]
            newArray[index] = true
            return newArray
          })
        }, index * 120) // 120ms de retraso entre cada letra
      })

      // Después de que todas las letras estén animadas, mostrar video
      setTimeout(() => {
        setPhase('video')
      }, letters.length * 120 + 1500) // Extra 1500ms para completar la animación
    }, 500)

    return () => clearTimeout(initialTimer)
  }, [letters.length])

  return {
    mounted,
    phase,
    animatedLetters,
    letters
  }
} 