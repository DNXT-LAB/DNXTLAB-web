'use client'

import React from 'react'
import ClientOnly from '../components/ClientOnly'
import { useLoadingAnimation } from '../hooks/useLoadingAnimation'
import LoadingAnimation from '../components/LoadingAnimation'
import VideoContent from '../components/VideoContent'

function HomeContent() {
  const { mounted, phase, animatedLetters, letters } = useLoadingAnimation()

  // Show initial animation until completed
  if (phase !== 'video') {
    return (
      <LoadingAnimation 
        letters={letters}
        animatedLetters={animatedLetters}
        mounted={mounted}
      />
    )
  }

  // Show main content with video
  return <VideoContent />
}

// Simple loading fallback for server
function LoadingFallback() {
  return (
    <main className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="flex items-center">
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