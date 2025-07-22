import React from 'react'
import Image from 'next/image'
import { LoadingAnimationProps } from '../types'

export default function LoadingAnimation({ letters, animatedLetters, mounted }: LoadingAnimationProps) {
  return (
    <main className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="flex items-center">
        <div className="logo-size">
          <Image 
            src="/logo2.png" 
            alt="DNXT LAB Logo" 
            width={520}
            height={520}
            className="logo-size"
            priority
            quality={90}
          />
        </div>
        <div className="flex">
          {letters.map((letter, index) => {
            const isAnimated = mounted && animatedLetters[index]
            return (
              <span
                key={`${letter}-${index}`}
                className={`font-medium transition-all duration-1500 ease-out text-logo-size ${
                  isAnimated ? 'text-animation-active' : 'text-animation-initial'
                }`}
                style={{
                  transitionDelay: mounted ? `${index * 0}ms` : '0ms'
                }}
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