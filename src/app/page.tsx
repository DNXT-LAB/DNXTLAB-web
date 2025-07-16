'use client'

import React from 'react'
import { useLoadingAnimation } from '../hooks/useLoadingAnimation'
import LoadingAnimation from '../components/LoadingAnimation'
import VideoContent from '../components/VideoContent'

export default function Home() {
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