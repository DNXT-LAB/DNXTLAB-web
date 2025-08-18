import React from 'react'
import Image from 'next/image'
import { LoadingAnimationProps } from '../types'

export default function LoadingAnimation({ letters, animatedLetters, mounted }: LoadingAnimationProps) {
  return (
    <main className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="flex items-center">
        <div className="w-[40%] lg:w-[40%]">
          <Image 
            src="/logo.png" 
            alt="DNXT LAB Logo" 
            width={220}
            height={220}
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
                className={`font-bold font-poppins transition-all duration-3700 ease-out text-[200%] lg:text-[700%] ${
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