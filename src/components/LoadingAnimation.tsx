import React from 'react'
import Image from 'next/image'
import { LoadingAnimationProps } from '../types'

export default function LoadingAnimation({ letters, animatedLetters, mounted }: LoadingAnimationProps) {
  if (!mounted) {
    return (
      <main className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black overflow-hidden">
        <div className="flex items-center">
          <Image 
            src="/logo.jpg" 
            alt="DNXT LAB Logo" 
            width={120}
            height={120}
            className="mr-6 logo-size"
          />
          <div className="flex">
            {letters.map((letter, index) => (
              <span
                key={index}
                className="font-black text-animation-initial text-logo-size"
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="flex items-center">
        <Image 
          src="/logo.jpg" 
          alt="DNXT LAB Logo" 
          width={120}
          height={120}
          className="mr-6 logo-size"
        />
        <div className="flex">
          {letters.map((letter, index) => {
            const isAnimated = animatedLetters[index]
            return (
              <span
                key={index}
                className={`font-black transition-all duration-1500 ease-out text-logo-size ${
                  isAnimated ? 'text-animation-active' : 'text-animation-initial'
                }`}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            )
          })}
        </div>
      </div>
    </main>
  )
} 