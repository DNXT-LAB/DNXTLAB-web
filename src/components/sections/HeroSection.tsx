import React from 'react'

const HeroSection: React.FC = () => {
  return (
    <div className="fixed left-8 z-20" style={{ bottom: '1.5rem' }}>
      <div className="flex flex-col items-start">
        <h1 className="force-white-text font-bold mb-8 uppercase font-morien text-main-title line-height-90">
          BESPOKE AI & WEB<br />
          DESIGN SOLUTIONS
        </h1>
        <p className="force-white-text mb-8 font-inter text-description font-normal line-height-110 max-w-description">
          Empowering businesses through intelligent automation, data-driven experiences, and future-proof digital design.
        </p>
        <button 
          className="flex items-center justify-center hover:opacity-90 transition-opacity bg-white rounded-full button-size border-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
          aria-label="Ver servicios de DNXTLAB"
        >
          <span className="force-black-text font-morien text-button font-light line-height-110 mr-3">
            SERVICES
          </span>
          <svg 
            className="svg-size" 
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