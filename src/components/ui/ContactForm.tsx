import React from 'react'
import type { FormState } from '@/types/animations'

interface ContactFormProps {
  formState: FormState
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent) => void
  isDesktopLayout?: boolean
}

const ContactForm: React.FC<ContactFormProps> = ({
  formState,
  handleInputChange,
  handleSubmit,
  isDesktopLayout = false
}) => {
  const { formData, isSubmitting, submitMessage, submitStatus } = formState

  if (isDesktopLayout) {
    // Special desktop layout: inputs on the left, textarea and button on the right
    return (
      <div className="w-full max-w-[1200px]">
        <div className="flex gap-8">
          {/* Left side - Inputs */}
          <div className="flex-1 space-y-4">
            <div>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First name"
                disabled={isSubmitting}
                className="w-full px-8 py-6 bg-gray-200 rounded-full text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 font-inter disabled:opacity-50 text-lg"
                required
              />
            </div>
            
            <div>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                disabled={isSubmitting}
                className="w-full px-8 py-6 bg-gray-200 rounded-full text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 font-inter disabled:opacity-50 text-lg"
                required
              />
            </div>
            
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your email"
                disabled={isSubmitting}
                className="w-full px-8 py-6 bg-gray-200 rounded-full text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 font-inter disabled:opacity-50 text-lg"
                required
              />
            </div>
          </div>

          {/* Right side - Textarea and button */}
          <div className="flex-1 space-y-4">
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us about your project..."
                rows={8}
                disabled={isSubmitting}
                className="w-full px-8 py-6 bg-gray-200 rounded-3xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none font-inter disabled:opacity-50 text-lg"
                required
              />
            </div>
            
            <div className="pt-4">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 bg-black text-white rounded-full font-morien text-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </>
                ) : 'Book a call'}
              </button>
            </div>
          </div>
        </div>

        {/* Mensaje de respuesta */}
        {submitMessage && (
          <div className={`mt-6 p-4 rounded-2xl text-center font-inter ${
            submitStatus === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-300' 
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}>
            {submitMessage}
          </div>
        )}
      </div>
    )
  }

  // Normal layout (mobile/iPad): everything in vertical column
  return (
    <div className="w-full max-w-[600px]">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="First name"
            disabled={isSubmitting}
            className="w-full px-8 py-6 bg-gray-200 rounded-full text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 font-inter disabled:opacity-50 text-lg"
            required
          />
        </div>
        
        <div>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
            disabled={isSubmitting}
            className="w-full px-8 py-6 bg-gray-200 rounded-full text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 font-inter disabled:opacity-50 text-lg"
            required
          />
        </div>
        
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your email"
            disabled={isSubmitting}
            className="w-full px-8 py-6 bg-gray-200 rounded-full text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 font-inter disabled:opacity-50 text-lg"
            required
          />
        </div>
        
        <div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Tell us about your project..."
            rows={8}
            disabled={isSubmitting}
            className="w-full px-8 py-6 bg-gray-200 rounded-3xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none font-inter disabled:opacity-50 text-lg"
            required
          />
        </div>
        
        {/* Mensaje de respuesta */}
        {submitMessage && (
          <div className={`p-4 rounded-2xl text-center font-inter ${
            submitStatus === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-300' 
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}>
            {submitMessage}
          </div>
        )}
        
        <div className="pt-4">
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full py-6 bg-black text-white rounded-full font-morien text-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </>
            ) : 'Book a call'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm 