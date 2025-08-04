import React, { useState, useEffect } from 'react'
import ContactForm from '@/components/ui/ContactForm'
import type { ContactSectionProps } from '@/types/animations'

const SectionD: React.FC<ContactSectionProps> = ({ 
  progress, 
  formState, 
  handleInputChange, 
  handleSubmit 
}) => {
  const { seventhSmoothProgress } = progress
  const [leftPosition, setLeftPosition] = useState('50%')

  // Function to calculate left position based on screen width
  const calculateLeftPosition = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth
      if (width < 640) { // iPhone
        return '7%'
      } else if (width < 1024) { // iPad
        return '18%'
      } else if (width < 1540) { // Desktop
        return '38%'
      } else {
        return '50%'
      }
    }
    return '38%'
  }

  // Effect to update left position when size changes
  useEffect(() => {
    const updateLeftPosition = () => {
      setLeftPosition(calculateLeftPosition())
    }

    // Set initial position
    updateLeftPosition()

    // Listen for size changes
    window.addEventListener('resize', updateLeftPosition)
    
    return () => {
      window.removeEventListener('resize', updateLeftPosition)
    }
  }, [])

  const sectionStyle: React.CSSProperties = { 
    position: 'absolute',
    width: '90%',
    height: '100%',
    top: '50%',
    left: leftPosition,
    transform: `translate(-50%, ${seventhSmoothProgress < 0.4 ? '100%' : '-50%'})`,
    opacity: seventhSmoothProgress < 0.4 ? 0 : Math.min(1, (seventhSmoothProgress - 0.4) * 2.5),
    visibility: seventhSmoothProgress > 0.35 ? 'visible' : 'hidden',
    transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    willChange: 'transform, opacity'
  }

  const contentStyle = {
    transform: `translateY(${seventhSmoothProgress < 0.8 ? (1 - seventhSmoothProgress) * 50 : 0}px)`,
    opacity: Math.min(1, Math.max(0, (seventhSmoothProgress - 0.4) * 2.5)),
    transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    willChange: 'transform, opacity'
  }

  return (
    <div style={sectionStyle}>
      {/* Desktop Layout - Only visible on screens >= 1024px */}
      <div className="hidden lg:flex w-full h-full flex flex-col px-[5%] 2xl:px-[1.5%] mt-[12%]" style={contentStyle}>
        {/* Centered title at top */}
        <div className="mb-[6%]">
          <h2 className="text-[4vw] xl:text-[3.8vw] 2xl:text-[4.5vw] font-semibold text-black font-poppins leading-[1.1]">
            BOOK A CALL NOW
          </h2>
        </div>
        
        {/* Custom Form Layout like the image */}
        <div className="w-[2000px] mb-[6%]">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex gap-[4%] mb-[4%]">
              {/* Left Column - Input Fields + Contact Info */}
              <div className="flex-1 space-y-[3%]">
                <input
                  type="text"
                  name="firstName"
                  value={formState.formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First name"
                  className="w-full px-[4%] py-[3%] text-[1.1vw] xl:text-[1vw] 2xl:text-[0.9vw] text-black placeholder-gray-500 border-none rounded-[25px] focus:outline-none focus:ring-2 focus:ring-black"
                  style={{ background: 'linear-gradient(0deg, #D6D6D6, #ffffff)' }}
                  required
                />
                
                <input
                  type="text"
                  name="lastName"
                  value={formState.formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="w-full px-[4%] py-[3%] text-[1.1vw] xl:text-[1vw] 2xl:text-[0.9vw] text-black placeholder-gray-500 border-none rounded-[25px] focus:outline-none focus:ring-2 focus:ring-black"
                  style={{ background: 'linear-gradient(0deg, #D6D6D6, #ffffff)' }}
                  required
                />
                
                <input
                  type="email"
                  name="email"
                  value={formState.formData.email}
                  onChange={handleInputChange}
                  placeholder="Your email"
                  className="w-full px-[4%] py-[3%] text-[1.1vw] xl:text-[1vw] 2xl:text-[0.9vw] text-black placeholder-gray-500 border-none rounded-[25px] focus:outline-none focus:ring-2 focus:ring-black"
                  style={{ background: 'linear-gradient(0deg, #D6D6D6, #ffffff)' }}
                  required
                />
                
                {/* Contact Information below email input */}
                <div className="mt-[4%] pt-[2%]">
                  <div className="space-y-[1%] text-[1.1vw] xl:text-[1vw] 2xl:text-[1.4vw] text-black font-poppins">
                    <p>Phone Num: +351 999999999</p>
                    <p>Email: info@diamondnxt.com</p>
                    <p>Sede: Rua Conselheiro Veloso Cruz, N.º 10</p>
                    <p>Porto — 4400 092 Vila Nova de Gaia.</p>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Textarea and Button */}
              <div className="flex-1 flex flex-col">
                <textarea
                  name="message"
                  value={formState.formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project..."
                  rows={6}
                  className="w-full h-[335px] px-[4%] py-[3%] text-[1.1vw] xl:text-[1vw] 2xl:text-[0.9vw] text-black placeholder-gray-500 border-none rounded-[25px] focus:outline-none focus:ring-2 focus:ring-black resize-none mb-[4%]"
                  style={{ background: 'linear-gradient(0deg, #D6D6D6, #ffffff)' }}
                  required
                />
                
                <button
                  type="submit"
                  disabled={formState.isSubmitting}
                  className="w-full py-[3%] px-[6%] bg-black text-white text-[1.1vw] xl:text-[1vw] 2xl:text-[0.9vw] font-medium rounded-[25px] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors disabled:opacity-50"
                >
                  {formState.isSubmitting ? 'Sending...' : 'Book a call'}
                </button>
              </div>
            </div>
            
            {/* Form Status Message */}
            {formState.submitMessage && (
              <div className={`text-center text-[1vw] xl:text-[0.9vw] 2xl:text-[0.8vw] mt-[2%] ${
                formState.submitStatus === 'success' ? 'text-green-600' : 'text-red-600'
              }`}>
                {formState.submitMessage}
              </div>
            )}
          </form>
        </div>

      </div>

      {/* Mobile & iPad Layout - Visible on screens < 1024px */}
      <div className="block lg:hidden w-full h-full p-[2%] md:p-[3%] flex flex-col justify-center mt-[8%]">
        {/* Title at top */}
        <div className="text-center mb-[3%] mt-[8%]">
          <h2 className="text-[6vw] md:text-[8vw] font-bold text-black font-morien leading-[1.1]">
            BOOK A CALL<br/>
            NOW
          </h2>
        </div>
        
        {/* Contact information in middle */}
        <div className="text-center md:mb-[4%]">
          <div className="space-y-[1%] md:space-y-[2%] text-[3vw] md:text-[2.5vw] text-black font-inter">
            <div>
              <p>Phone Num: +351 999999999</p>
            </div>
            
            <div>
              <p>Email: info@diamondnxt.com</p>
            </div>
            
            <div>
              <p>Sede: Rua Conselheiro Veloso Cruz, N.º</p>
              <p>10 Porto — 4400 092 Vila Nova de Gaia.</p>
            </div>
          </div>
        </div>
        
        {/* Form below */}
        <div className="flex justify-center">
          <div className="w-[90%] md:w-full md:scale-100 origin-center" style={{ transform: 'scale(0.55)' }}>
            <ContactForm 
              formState={formState}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionD 