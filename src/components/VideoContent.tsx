"use client";

import React, { useRef, useEffect, useState } from "react";
import Navbar from "./Navbar";
import HeroSection from "./sections/HeroSection";
import SectionA from "./sections/SectionA";
import SectionB from "./sections/SectionB";
import SectionC from "./sections/SectionC";
import SectionD from "./sections/SectionD";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useContactForm } from "@/hooks/useContactForm";
import { SCROLL_LEVELS, SECTION_POSITIONS } from "@/utils/constants";

export default function VideoContent() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [spacerHeight, setSpacerHeight] = useState<number>(0);

  // Hooks personalizados
  const { 
    scrollY,
    windowHeight,
    // windowWidth,
    progress,
    sectionATransforms,
    tabProperties,
    navigateToSection,
  } = useScrollAnimation();

  const { formState, handleInputChange, handleSubmit } = useContactForm();

  // Inicializar video
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch((error) => {
        console.warn("Error al reproducir video:", error);
      });
    }
  }, []);

  // Compute spacer height so page can scroll exactly up to last SECTION_POSITIONS value
  useEffect(() => {
    const compute = () => {
      const last = SECTION_POSITIONS[SECTION_POSITIONS.length - 1] ?? 0;
      const h = typeof window !== "undefined" ? last + window.innerHeight : last;
      setSpacerHeight(h);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // Apply spacer height to document.body on desktop so document height won't exceed intended value
  useEffect(() => {
    if (typeof window === "undefined") return;
    const apply = () => {
      if (window.innerWidth >= 1024 && spacerHeight > 0) {
        document.body.style.height = `${spacerHeight}px`;
      } else {
        document.body.style.height = "";
      }
    };
    apply();
    window.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("resize", apply);
      document.body.style.height = "";
    };
  }, [spacerHeight]);

  const { tabTransform, tabHeight, tabTop } = tabProperties;
  const { secondSmoothProgress } = progress;

  return (
    <div className="relative w-screen bg-black">
      {/* Video Background - Fixed so it's always in the background */}
      <video
        ref={videoRef}
        className="fixed inset-0 w-full h-[800px] lg:h-full object-cover z-0 md:h-[100vh] main-video"
        style={{
          transform: "scale(1.1)",
        }}
        src="/video.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-label="Background video showing DNXTLAB solutions"
      />

      {/* Overlay to improve readability */}
      <div
        className="fixed inset-0 bg-black/60 z-10"
        aria-hidden="true"
        style={{ width: "100vw", height: "100dvh" }}
      />

      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-60 p-8">
        <Navbar
          isDark={scrollY > 960}
          onNavigateToSection={navigateToSection}
        />
      </div>

      {/* Hero Section - Fixed main content */}
      <HeroSection onNavigateToSection={navigateToSection} />

      {/* White tab that slides from below */}
      <div
        className="fixed h-full left-0 right-0 z-50 transition-all duration-500 ease-out"
        style={{
          transform: `translateY(${tabTransform}%)`,
          borderRadius:
            scrollY < SCROLL_LEVELS.SECOND_LEVEL_START
              ? "32px 32px 0 0"
              : `${16 * (1 - secondSmoothProgress)}px`,
          height: tabHeight,
          top: tabTop,
          width: "100vw",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 -8px 32px rgba(0, 0, 0, 0.3)",
          transition:
            "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-radius 0.4s ease-out, height 0.4s ease-out, top 0.4s ease-out",
        }}
      >
        {/* Section A */}
        <SectionA
          scrollY={scrollY}
          progress={progress}
          windowHeight={windowHeight}
          {...sectionATransforms}
          onNavigateToSection={navigateToSection}
          tabTop={tabTop}
        />

        {/* Section B */}
        <SectionB
          scrollY={scrollY}
          progress={progress}
          windowHeight={windowHeight}
          tabTop={tabTop}
        />
        <div
          className="relative"
          style={{
            position: "absolute",
            width: "1817px",
            height: "861px",
            left: "60px",
          }}
        >
          {/* Section C */}
          <SectionC
            scrollY={scrollY}
            progress={progress}
            windowHeight={windowHeight}
            onNavigateToSection={navigateToSection}
          />
        </div>
        {/* Section D */}
        <SectionD
          scrollY={scrollY}
          progress={progress}
          windowHeight={windowHeight}
          formState={formState}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>

      {/* Single spacer computed from SECTION_POSITIONS to avoid scrolling past last section */}
      <div
        className="relative z-0 bg-transparent"
        style={{ height: spacerHeight ? `${spacerHeight}px` : "1px" }}
        aria-hidden="true"
      />
    </div>
  );
}
