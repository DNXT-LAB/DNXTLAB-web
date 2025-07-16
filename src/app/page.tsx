'use client'

import React, { useState, useEffect } from 'react'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [phase, setPhase] = useState<'initial' | 'animating' | 'video'>('initial')
  const [animatedLetters, setAnimatedLetters] = useState<boolean[]>([])

  const text = "DNXT LAB"
  const letters = text.split('')

  useEffect(() => {
    setMounted(true)
    // Inicializar array de letras animadas
    setAnimatedLetters(new Array(letters.length).fill(false))

    // Después de 1.5 segundos, comenzar la animación
    const initialTimer = setTimeout(() => {
      setPhase('animating')
      
      // Animar letras de izquierda a derecha
      letters.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedLetters(prev => {
            const newArray = [...prev]
            newArray[index] = true
            console.log(`Animando letra ${index}: ${letters[index]}`)
            return newArray
          })
        }, index * 120) // 120ms de retraso entre cada letra para efecto más fluido
      })

      // Después de que todas las letras estén animadas, mostrar video
      setTimeout(() => {
        setPhase('video')
      }, letters.length * 120 + 2500) // Extra 2500ms para completar la animación
    }, 1500)

    return () => clearTimeout(initialTimer)
  }, [])

  // Prevenir hidratación hasta que el componente esté montado
  if (!mounted) {
    return (
      <main className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black overflow-hidden">
        <div className="flex">
          {letters.map((letter, index) => (
            <span
              key={index}
              className="font-black text-gray-400"
              style={{ 
                fontSize: 'clamp(3rem, 12vw, 8rem)',
                color: '#333333' 
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </div>
      </main>
    )
  }

  if (phase === 'video') {
    return (
      <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-black">
        <video
          className="w-full h-full object-cover"
          src="/video.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    )
  }

  return (
    <main className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="flex">
        {letters.map((letter, index) => {
          const isAnimated = animatedLetters[index]
          return (
            <span
              key={index}
              className="font-black transition-all duration-1200 ease-out"
              style={{ 
                fontSize: 'clamp(3rem, 12vw, 8rem)',
                color: isAnimated ? '#ffffff' : '#333333',
                textShadow: isAnimated ? '0 0 8px rgba(84, 79, 79, 0.2)' : 'none'
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          )
        })}
      </div>
    </main>
  )
} 