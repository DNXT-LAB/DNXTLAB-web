import React, { useState, useEffect } from "react";
import type { ContactSectionProps } from "@/types/animations";

const SectionD: React.FC<ContactSectionProps> = ({
  progress,
  formState,
  handleInputChange,
  handleSubmit,
}) => {
  const { seventhSmoothProgress } = progress;
  const [browserZoom, setBrowserZoom] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Detect browser zoom + mobile
  useEffect(() => {
    const updateDimensions = () => {
      const zoom =
        Math.round((window.outerWidth / window.innerWidth) * 100) / 100;
      setBrowserZoom(zoom);
      setIsMobile(window.innerWidth < 1024);
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div
      className={`
        fixed inset-0 flex items-center justify-center bg-white z-50
        transition-opacity duration-800 ease-out
        ${
          seventhSmoothProgress > 0.35
            ? "visible opacity-100"
            : "invisible opacity-0"
        }
      `}
      style={{
        transform: !isMobile ? `scale(${0.75 / browserZoom})` : "none",
        transformOrigin: "center",
      }}
    >
      <div className="w-full max-w-[1800px] px-5 py-8 flex flex-col gap-10 lg:gap-15 mt-[25px] relative md:mt-0">
        {/* Title */}
        <h2 className="text-[36px] leading-[48px] lg:text-[70px] lg:leading-[110px] font-semibold font-[Poppins] text-black text-center lg:text-left">
          BOOK A CALL NOW
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className=" w-full mx-auto flex flex-col gap-6 sm:max-w-sm md:max-w-md lg:max-w-[100%] lg:grid lg:grid-cols-2 lg:gap-20 "
          
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
              className="w-full h-[50px] lg:h-[80px] px-4 lg:px-10 text-sm md:text-base lg:text-xl rounded-xl lg:rounded-full bg-gradient-to-t from-gray-300 to-white shadow-sm outline-none"
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formState.formData.lastName}
              onChange={handleInputChange}
              required
              className="w-full h-[50px] lg:h-[80px] px-4 lg:px-10 text-sm md:text-base lg:text-xl rounded-xl lg:rounded-full bg-gradient-to-t from-gray-300 to-white shadow-sm outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formState.formData.email}
              onChange={handleInputChange}
              required
              className="w-full h-[50px] lg:h-[80px] px-4 lg:px-10 text-sm md:text-base lg:text-xl rounded-xl lg:rounded-full bg-gradient-to-t from-gray-300 to-white shadow-sm outline-none"
            />

            {/* Desktop only contact info */}
            {!isMobile && (
              <div className="hidden lg:flex flex-col gap-3 text-lg text-black mt-auto">
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
              className="w-full resize-none h-[120px] md:h-[180px] lg:h-[450px] px-4 lg:px-10 py-3 lg:py-8 text-sm md:text-base lg:text-xl rounded-xl lg:rounded-[32px] bg-gradient-to-t from-gray-300 to-white shadow-sm outline-none"
            />

            <button
              type="submit"
              disabled={formState.isSubmitting}
              className="w-full h-[50px] lg:h-[80px] text-sm md:text-base lg:text-2xl rounded-xl lg:rounded-full bg-black text-white transition disabled:opacity-50"
            >
              {formState.isSubmitting ? "Sending..." : "Book a call"}
            </button>

            {/* Mobile contact info */}
            {isMobile && (
              <div className="flex flex-col gap-1 text-xs md:text-sm text-black text-center mt-2">
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
