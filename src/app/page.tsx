'use client'

import React from 'react'
import ClientOnly from '../components/ClientOnly'
import { useLoadingAnimation } from '../hooks/useLoadingAnimation'
import LoadingAnimation from '../components/LoadingAnimation'
import VideoContent from '../components/VideoContent'

function HomeContent() {
  const { mounted, phase, animatedLetters, letters } = useLoadingAnimation()

  // Mostrar animación inicial hasta que se complete
  if (phase !== 'video') {
    return (
      <LoadingAnimation 
        letters={letters}
        animatedLetters={animatedLetters}
        mounted={mounted}
      />
    )
  }

  // Mostrar contenido principal con video
  return <VideoContent />
}

// Fallback loading simple para el servidor
function LoadingFallback() {
  return (
    <main className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="flex items-center">
        <div className="w-[120px] h-[120px] bg-gray-800 rounded-lg mr-6 animate-pulse"></div>
        <div className="flex space-x-1">
          {"DNXT LAB".split('').map((letter, index) => (
            <span
              key={index}
              className="font-black text-white text-6xl"
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </div>
      </div>
    </main>
  )
}

export default function Home() {
  return (
    <ClientOnly fallback={<LoadingFallback />}>
      <HomeContent />
    </ClientOnly>
  )
} 