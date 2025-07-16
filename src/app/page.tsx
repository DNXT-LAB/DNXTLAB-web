'use client'

import React, { useState, useEffect } from 'react'

export default function Home() {
  const [phase, setPhase] = useState<'initial' | 'animating' | 'video'>('initial')
  const [animatedLetters, setAnimatedLetters] = useState<boolean[]>([])

  const text = "DNXT LAB"
  const letters = text.split('')

  useEffect(() => {
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
        }, index * 100) // 100ms de retraso entre cada letra
      })

      // Después de que todas las letras estén animadas, mostrar video
      setTimeout(() => {
        setPhase('video')
      }, letters.length * 100 + 500) // Extra 500ms para completar la animación
    }, 1000)

    return () => clearTimeout(initialTimer)
  }, [])

  if (phase === 'video') {
    return (
      <div className="fixed inset-0 w-screen h-screen overflow-hidden">
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
            className={`text-4xl font-bold transition-colors duration-300 ${
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