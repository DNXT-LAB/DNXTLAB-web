'use client'

import { useEffect } from 'react'

export function useVH() {
  useEffect(() => {
    function setVH() {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    setVH()

    // Listen for resize events
    window.addEventListener('resize', setVH)

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', setVH)
    }
  }, [])
} 