import React, { useState, useEffect } from "react";
import type { ContactSectionProps } from "@/types/animations";

const SectionD: React.FC<ContactSectionProps> = ({
  progress,
  formState,
  scrollY,
  handleInputChange,
  handleSubmit,
}) => {
  console.log('scrollY', scrollY)
  const { seventhSmoothProgress } = progress;
  const [isMobile, setIsMobile] = useState(false);

  // Detect browser zoom + mobile
  useEffect(() => {
    const updateDimensions = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
console.log('seventhSmoothProgress', seventhSmoothProgress)
  return (
    <div
      className={`
        fixed inset-0 flex items-center justify-center bg-white z-50
        transition-opacity duration-800 ease-out lg:mt-[-150px]
        container-contact
        ${
          seventhSmoothProgress > 0.017 || scrollY > 4600
            ? "visible opacity-100"
            : "invisible opacity-0"
        }
      `}
      style={{
        transform: !isMobile ? `scale(0.8)` : "none",
        transformOrigin: "center",
      }}
    >
      <div className="w-full max-w-[1800px] px-5 py-8 flex flex-col gap-10 lg:gap-15 relative md:mt-0 lg:left-[-6.5rem] form-section">
        {/* Title */}
        <h2 className="text-[36px] leading-[48px] lg:text-[100px] lg:leading-[110px] lg:mb-10 font-bold font-[Poppins] text-black text-center">
          BOOK A CALL NOW
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className=" w-full mx-auto flex flex-col gap-6 sm:max-w-sm md:max-w-md lg:max-w-[100%] lg:grid lg:grid-cols-2 lg:gap-20 form-main"
          
        >
          {/* Left Side */}
          <div className="flex flex-col gap-6">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={formState.formData.firstName}
              onChange={handleInputChange}
              required
              className="w-full h-[50px] lg:h-[85px] px-4 lg:px-10 text-sm md:text-base lg:text-2xl rounded-xl lg:rounded-full bg-gradient-to-t from-gray-300 to-white shadow-sm outline-none"
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formState.formData.lastName}
              onChange={handleInputChange}
              required
              className="w-full h-[50px] lg:h-[85px] px-4 lg:px-10 text-sm md:text-base lg:text-2xl rounded-xl lg:rounded-full bg-gradient-to-t from-gray-300 to-white shadow-sm outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formState.formData.email}
              onChange={handleInputChange}
              required
              className="w-full h-[50px] lg:h-[85px] px-4 lg:px-10 text-sm md:text-base lg:text-2xl rounded-xl lg:rounded-full bg-gradient-to-t from-gray-300 to-white shadow-sm outline-none"
            />

            {/* Desktop only contact info */}
            {!isMobile && (
              <div className="hidden lg:flex flex-col gap-3 text-2xl text-black mt-auto">
                <p>Phone Num: +351 999999999</p>
                <p>Email: info@diamondnxt.com</p>
                <p>Sede: Rua Conselheiro Veloso Cruz, N.º 10</p>
                <p>Porto — 4400 092 Vila Nova de Gaia.</p>
              </div>
            )}
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-6">
            <textarea
              name="message"
              placeholder="Tell us about your project..."
              value={formState.formData.message}
              onChange={handleInputChange}
              required
              className="w-full resize-none h-[120px] md:h-[180px] lg:h-[450px] px-4 lg:px-10 py-3 lg:py-8 text-sm md:text-base lg:text-2xl rounded-xl lg:rounded-[32px] bg-gradient-to-t from-gray-300 to-white shadow-sm outline-none"
            />

            <button
              type="submit"
              disabled={formState.isSubmitting}
              className="w-full h-[50px] lg:h-[85px] text-sm md:text-base lg:text-2xl rounded-xl lg:rounded-full bg-black text-white transition disabled:opacity-50"
            >
              {formState.isSubmitting ? "Sending..." : "Book a call"}
            </button>

            {/* Mobile contact info */}
            {isMobile && (
              <div className="flex flex-col gap-1 text-xs md:text-sm text-black mt-2">
                <p>Phone Num: +351 999999999</p>
                <p>Email: info@diamondnxt.com</p>
                <p>Sede: Rua Conselheiro Veloso Cruz, N.º 10</p>
                <p>Porto — 4400 092 Vila Nova de Gaia.</p>
              </div>
            )}
          </div>
        </form>

        {/* Status message */}
        {formState.submitMessage && (
          <div
            className={`absolute w-full text-center ${
              formState.submitStatus === "success"
                ? "text-green-600"
                : "text-red-600"
            } text-sm lg:text-xl`}
            style={{
              bottom: isMobile ? "-30px" : "-50px",
            }}
          >
            {formState.submitMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionD;
