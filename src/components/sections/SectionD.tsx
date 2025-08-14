import React from 'react';
import type { ContactSectionProps } from '@/types/animations';

const SectionD: React.FC<ContactSectionProps> = ({
  progress,
  formState,
  handleInputChange,
  handleSubmit,
}) => {
  const { seventhSmoothProgress } = progress;

  const sectionStyle: React.CSSProperties = {
    position: 'absolute',
    height: '100%',
    top: '50%',
    transform: `translate(-50%, ${
      seventhSmoothProgress < 0.4 ? '100vh' : '-50%'
    })`,
    opacity:
      seventhSmoothProgress < 0.4
        ? 0
        : Math.min(1, (seventhSmoothProgress - 0.4) * 2.5),
    visibility: seventhSmoothProgress > 0.35 ? 'visible' : 'hidden',
    transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease-out',
    willChange: 'transform, opacity',
  };

  const contentStyle: React.CSSProperties = {
    opacity: Math.min(1, Math.max(0, (seventhSmoothProgress - 0.4) * 2.5)),
    transition: 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    willChange: 'opacity',
  };

  return (
    <div style={sectionStyle} className="flex items-center justify-center md:mt-[4%] lg:mt-[1%] w-[20%] ml-[8%] md:ml-[18%] md:w-[40%] lg:w-[70%] lg:ml-[39%] 2xl:w-[85%] 2xl:ml-[46%]">
      <div
        style={contentStyle}
        className="w-full flex flex-col justify-center px-6 sm:px-8 md:px-12 mb-28 lg:mb-0 mx-auto"
      >
        {/* Title */}
        <div className="text-center lg:text-left mb-6 lg:mb-10 2xl:mt-[20%]">
          <h2 className="text-[150%] md:text-[300%] lg:text-[600%] 2xl:text-[700%] font-semibold text-black font-poppins leading-tight">
            BOOK A CALL NOW
          </h2>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 xl:w-[150%] "
        >
          {/* === Left Column: Inputs & Desktop Contact Info === */}
          <div className="flex flex-col space-y-8">
            <input
              type="text"
              name="firstName"
              value={formState.formData.firstName}
              onChange={handleInputChange}
              placeholder="First name"
              className="w-[100%] px-[3%] py-[1%] md:py-[2%] 2xl:py-[3%] text-[100%] 2xl:text-[110%] text-black placeholder-gray-500 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-black bg-white shadow-md"
              style={{ background: 'linear-gradient(0deg, #D6D6D6, #ffffff)' }}
              required
            />
            <input
              type="text"
              name="lastName"
              value={formState.formData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
              className="w-[100%] px-[3%] py-[1%] md:py-[2%] 2xl:py-[3%] text-[100%] 2xl:text-[110%] text-black placeholder-gray-500 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-black bg-white shadow-md"
              style={{ background: 'linear-gradient(0deg, #D6D6D6, #ffffff)' }}
              required
            />
            <input
              type="email"
              name="email"
              value={formState.formData.email}
              onChange={handleInputChange}
              placeholder="Your email"
              className="w-[100%] px-[3%] py-[1%] md:py-[2%] 2xl:py-[3%] text-[100%] 2xl:text-[110%] text-black placeholder-gray-500 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-black bg-white shadow-md"
              style={{ background: 'linear-gradient(0deg, #D6D6D6, #ffffff)' }}
              required
            />
            {/* Desktop Contact Info */}
            <div className="hidden lg:block pt-6">
              <div className="space-y-2 text-base 2xl:text-[200%] text-black font-poppins">
                <p>Phone Num: +351 999999999</p>
                <p>Email: info@diamondnxt.com</p>
                <p>Sede: Rua Conselheiro Veloso Cruz, N.º 10</p>
                <p>Porto — 4400 092 Vila Nova de Gaia.</p>
              </div>
            </div>
          </div>

          {/* === Right Column: Textarea & Desktop Button === */}
          <div className="flex flex-col">
            <textarea
              name="message"
              value={formState.formData.message}
              onChange={handleInputChange}
              placeholder="Tell us about your project..."
              className="w-full h-28 md:h-48 lg:h-full px-6 py-4 2xl:py-6 text-base 2xl:text-lg text-black placeholder-gray-500 border-none rounded-3xl focus:outline-none focus:ring-2 focus:ring-black resize-none bg-white shadow-md"
              style={{ background: 'linear-gradient(0deg, #D6D6D6, #ffffff)' }}
              required
            />
            <div className="hidden lg:flex mt-4">
              <button
                type="submit"
                disabled={formState.isSubmitting}
                className="w-[100%] px-[6%] py-[2%] 2xl:py-[3%] bg-black text-white text-[100%] 2xl:text-[110%] font-medium rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {formState.isSubmitting ? 'Sending...' : 'Book a call'}
              </button>
            </div>
          </div>

          {/* Mobile/Tablet Button - full width row */}
          <div className="w-full lg:hidden mt-2 col-span-1 lg:col-span-2">
            <button
              type="submit"
              disabled={formState.isSubmitting}
              className="w-[100%] py-[3%] bg-black text-white text-[110%] font-medium rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {formState.isSubmitting ? 'Sending...' : 'Book a call'}
            </button>
          </div>
        </form>

        {/* Contact Info (Mobile/Tablet Only) */}
        <div className="block lg:hidden text-center mt-8 sm:mt-10">
          <div className="space-y-2 text-sm text-black font-poppins">
            <p>Phone Num: +351 999999999</p>
            <p>Email: info@diamondnxt.com</p>
            <p>Sede: Rua Conselheiro Veloso Cruz, N.º 10 Porto — 4400 092 Vila Nova de Gaia.</p>
          </div>
        </div>

        {/* Form Status Message */}
        {formState.submitMessage && (
          <div
            className={`text-center text-base mt-6 ${
              formState.submitStatus === 'success'
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {formState.submitMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionD;