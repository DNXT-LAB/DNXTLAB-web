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

    // Después de 1 segundo, comenzar la animación
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
        }, index * 200) // 200ms de retraso entre cada letra
      })

      // Después de que todas las letras estén animadas, mostrar video
      setTimeout(() => {
        setPhase('video')
      }, letters.length * 200 + 1500) // Extra 1500ms para completar la animación
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
              className="text-6xl font-bold text-gray-400"
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
        {letters.map((letter, index) => (
          <span
            key={index}
            className={`text-6xl font-bold transition-colors duration-700 ${
              phase === 'initial' || !animatedLetters[index]
                ? 'text-gray-400'
                : 'text-white'
            }`}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </div>
    </main>
  )
} 