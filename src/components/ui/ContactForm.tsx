import React from 'react'
import type { FormState } from '@/types/animations'

interface ContactFormProps {
  formState: FormState
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent) => void
}

const ContactForm: React.FC<ContactFormProps> = ({
  formState,
  handleInputChange,
  handleSubmit
}) => {
  const { formData, isSubmitting, submitMessage, submitStatus } = formState

  return (
    <div 
      className="bg-gray-300 rounded-3xl p-12 shadow-2xl"
      style={{
        width: '600px',
        background: 'linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%)',
      }}
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="First name"
            disabled={isSubmitting}
            className="w-full px-6 py-4 bg-white/70 rounded-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 font-inter disabled:opacity-50"
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
            className="w-full px-6 py-4 bg-white/70 rounded-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 font-inter disabled:opacity-50"
            required
          />
        </div>
        
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Whats your email"
            disabled={isSubmitting}
            className="w-full px-6 py-4 bg-white/70 rounded-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 font-inter disabled:opacity-50"
            required
          />
        </div>
        
        <div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Tell us about your project..."
            rows={6}
            disabled={isSubmitting}
            className="w-full px-6 py-4 bg-white/70 rounded-3xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none font-inter disabled:opacity-50"
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
        
        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-black text-white rounded-full font-morien text-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enviando...
            </>
          ) : 'Book a call'}
        </button>
      </form>
    </div>
  )
}

export default ContactForm 