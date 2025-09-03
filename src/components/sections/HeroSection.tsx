import React from 'react'

const HeroSection: React.FC<{ onNavigateToSection?: (section: number) => void }> = ({ onNavigateToSection }) => {
  return (
    <div className="fixed left-2 right-2 bottom-8 sm:left-4 sm:right-auto sm:bottom-12 lg:bottom-6 z-20 px-2 sm:px-4 md:px-8 hero-root">
      <div className="flex flex-col items-start space-y-3 sm:space-y-4">
        
        {/* Heading */}
        <h1
          className="text-white font-bold uppercase font-poppins leading-tight hero-heading"
          style={{
            fontSize: 'clamp(1.5rem, 5vw, 4.5rem)', // Responsive font size
            lineHeight: '1.1'
          }}
        >
          BESPOKE AI & WEB <br /> DESIGN SOLUTIONS
        </h1>
        
        {/* Subtext */}
        <p
          className="text-white font-inter leading-relaxed hero-subtext"
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 2rem)', // Responsive font size
            maxWidth: 'clamp(63vw, 60vw, 800px)'
          }}
        >
          Empowering businesses through intelligent automation, data-driven experiences, 
          and future-proof digital design.
        </p>
        
        {/* CTA Button */}
        <button
          className="flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3
          bg-white rounded-full hover:opacity-90 transition
          focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
          aria-label="View DNXTLAB services"
          onClick={() => onNavigateToSection?.(3)}
          style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.25rem)'
          }}
        >
          <span className="text-black font-poppins mr-2 sm:mr-3" style={{ fontSize: 'inherit' }}>
            SERVICES
          </span>
          <svg 
            className="w-5 h-5 md:w-6 md:h-6"
            viewBox="0 0 37 37" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="18.5" cy="18.5" r="18.5" fill="black"/>
            <path d="M10.5146 18C9.96236 18 9.51465 18.4477 9.51465 19C9.51465 19.5523 9.96236 20 10.5146 20V18ZM28.1923 19.7071C28.5828 19.3166 28.5828 18.6834 28.1923 18.2929L21.8283 11.9289C21.4378 11.5384 20.8047 11.5384 20.4141 11.9289C20.0236 12.3195 20.0236 12.9526 20.4141 13.3431L26.071 19L20.4141 24.6569C20.0236 25.0474 20.0236 25.6805 20.4141 26.0711C20.8047 26.4616 21.4378 26.4616 21.8283 26.0711L28.1923 19.7071ZM10.5146 19V20H27.4852V19V18H10.5146V19Z" fill="white"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default HeroSection