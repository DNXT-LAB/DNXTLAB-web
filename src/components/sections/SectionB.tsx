import React, { useState, useEffect } from "react";
import type { SectionProps } from "@/types/animations";

interface SectionBProps extends SectionProps {
  tabTop?: string;
}

const SectionB: React.FC<SectionBProps> = ({ progress, tabTop }) => {
  const { secondSmoothProgress, thirdSmoothProgress } = progress;
  const [scaleFactor, setScaleFactor] = useState(1);
  // Function to calculate scale factor based on viewport
  const calculateScaleAndDimensions = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Reference base: 1920x1080 (standard screen)
      const baseWidth = 1920;
      const baseHeight = 1080;

      // Calculate scale factor based on width, with minimum and maximum limits
      const widthScale = width / baseWidth;
      const heightScale = height / baseHeight;

      // Usar el menor de los dos factores para mantener proporciones
      const scale = Math.min(widthScale, heightScale);

      // Apply limits to avoid extreme scales
      const clampedScale = Math.max(0.6, Math.min(2.5, scale));

      return {
        scaleFactor: clampedScale,
        width,
        height,
      };
    }
    return {
      scaleFactor: 1,
      width: 1920,
      height: 1080,
    };
  };

  // Effect to update scale factor when size changes
  useEffect(() => {
    const updateScale = () => {
      const { scaleFactor: newScale } = calculateScaleAndDimensions();
      setScaleFactor(newScale);
    };

    // Establecer escala inicial
    updateScale();

    // Listen for size changes
    window.addEventListener("resize", updateScale);

    return () => {
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  const sectionStyle: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    // Remove height property entirely for better flex centering
    top: "45%",
    left: "50%",
    transform: `translate(-50%, ${
      secondSmoothProgress < 0.3 ? "100%" : "-50%"
    }) translateY(${
      thirdSmoothProgress > 0 ? -(thirdSmoothProgress * 500 * scaleFactor) : 0
    }px)`, // Reduced from 900 to 500 for slower scroll-out
    transformOrigin: "center center",
    opacity:
      (thirdSmoothProgress >= 0.009 && !(tabTop && typeof tabTop === "string" && parseInt(tabTop) >= 80))
        ? 0
        : 1,
    visibility:
      (thirdSmoothProgress >= 0.009 && !(tabTop && typeof tabTop === "string" && parseInt(tabTop) >= 80))
        ? "hidden"
        : "visible",
    transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    willChange: "transform, opacity",
  };

  return (
    <div style={sectionStyle} className="strategic-section-main">
      <div className="w-full min-h-screen flex flex-col justify-center items-center px-2 md:px-8">
        {/* Title */}
        <div className="w-full mb-6 md:mb-8 text-center">
          <p className="font-poppins text-black uppercase tracking-wider text-lg md:text-2xl mt-8 md:mt-20 strategic-title">
            STRATEGIC FLEXIBILITY
          </p>
        </div>
        {/* Video */}
        <div className="w-full mb-6 md:mb-8 flex justify-center">
          <video
            src="/video1.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-3xl h-48 sm:h-60 md:h-72 object-cover rounded-2xl shadow-lg stategic-video"
            style={{
              background:
                "linear-gradient(135deg, #0891b2 0%, #1e40af 50%, #7c3aed 100%)",
              maxWidth: "90%",
              height: "430px",
            }}
          />
        </div>
        {/* Text */}
        <div className="flex flex-col w-[90%] max-md:w-[90%] lg:text-center lg:items-center">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl text-black font-poppins mb-4 leading-tight text-left lg:text-center ">
            Solutions That Evolve
            <b> With Your Bussiness</b>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-black font-poppins leading-relaxed max-w-full lg:max-w-3xl lg:mx-auto stategic-content text-left lg:text-center px-0 sm:px-0 lg:px-0 main-text">
            At DNXT LAB, we don&apos;t sell tools—we design intelligent
            frameworks tailored to your operations. By blending technical depth
            with strategic foresight, we ensure every AI or digital solution
            evolves with your business and supports long-term growth.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionB;
