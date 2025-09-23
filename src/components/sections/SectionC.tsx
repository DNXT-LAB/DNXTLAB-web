import React, { useState, useEffect } from "react";
import ServiceCard from "@/components/ui/ServiceCard";
import type { SectionProps } from "@/types/animations";

const SectionC: React.FC<SectionProps> = ({
  progress,
  onNavigateToSection,
}) => {
  const {
    thirdSmoothProgress,
    fourthSmoothProgress,
    fifthSmoothProgress,
    sixthSmoothProgress,
    seventhSmoothProgress,
  } = progress;
  const [scaleFactor, setScaleFactor] = useState(1);
  const [viewportDimensions, setViewportDimensions] = useState({
    width: 1920,
    height: 1080,
  });

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
      const {
        scaleFactor: newScale,
        width,
        height,
      } = calculateScaleAndDimensions();
      setScaleFactor(newScale);
      setViewportDimensions({ width, height });
    };

    // Establecer escala inicial
    updateScale();

    // Listen for size changes
    window.addEventListener("resize", updateScale);

    return () => {
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  // Calculate scaled dimensions and positions
  const getScaledDimensions = () => {
    // Responsive left position according to screen size
    const getResponsiveLeftPosition = () => {
      if (viewportDimensions.width >= 1536) return 0.45; // 2XL: 45% (perfecto)
      if (viewportDimensions.width >= 1280) return 0.6; // XL: 48% (more centered)
      return 0.5; // Desktop: 50% (centered for better visibility)
    };

    const getResponsiveMaxWidth = () => {
      if (viewportDimensions.width >= 1536) return 800; // 2XL: 700px (perfecto)
      if (viewportDimensions.width >= 1280) return 650; // XL: 650px (closer to center)
      return 600; // Desktop: 600px (closer to center)
    };

    const getResponsivePaddingX = () => {
      if (viewportDimensions.width >= 1536) return 4; // 2XL: 4rem (original)
      if (viewportDimensions.width >= 1280) return 3; // XL: 3rem (closer together)
      return 2; // Desktop: 2rem (closer together)
    };

    const getResponsivePaddingLeft = () => {
      if (viewportDimensions.width >= 1536) return 2; // 2XL: 2rem (perfecto)
      if (viewportDimensions.width >= 1280) return 4; // XL: 4rem (move closer to center)
      return 6; // Desktop: 6rem (move closer to center)
    };

    const baseLeftPosition =
      viewportDimensions.width * getResponsiveLeftPosition();

    return {
      leftPosition: baseLeftPosition,
      maxWidths: {
        small: 330 * scaleFactor, // max-w-[330px]
        large: getResponsiveMaxWidth() * scaleFactor, // Responsive according to screen
      },
      padding: {
        px16: getResponsivePaddingX() * scaleFactor, // Responsive according to screen
        pl8: getResponsivePaddingLeft() * scaleFactor, // Responsivo
        p4: 1 * scaleFactor, // p-4 escalado
        p6: 1.5 * scaleFactor, // p-6 escalado
        p8: 0.5 * scaleFactor, // p-8 escalado
      },
    };
  };

  const dimensions = getScaledDimensions();

  // Calculate responsively scaled font sizes
  const getScaledFontSizes = () => {
    const getResponsiveMainTitle = () => {
      if (viewportDimensions.width >= 1536) return 5.5; // 2XL: 5.5rem (increased from 3.5)
      if (viewportDimensions.width >= 1280) return 4.5; // XL: 4.5rem (increased from 3.5)
      return 4.0; // Desktop: 4.0rem (increased from 3.5)
    };

    return {
      mainTitle: {
        mobile: `${2.5 * scaleFactor}rem`, // text-2xl aumentado
        desktop: `${getResponsiveMainTitle() * scaleFactor}rem`, // Responsivo
      },
      mobileTitle: `${3.2 * scaleFactor}rem`, // text-4xl aumentado
      subtitle: `${2.8 * scaleFactor}rem`, // text-[36px] aumentado
      subtitleMobile: `${1.8 * scaleFactor}rem`, // text-[24px] aumentado
      serviceTitle: `${1.4 * scaleFactor}rem`, // text-lg aumentado
      serviceDescription: `${1.2 * scaleFactor}rem`, // text-base aumentado
      button: {
        mobile: `${1.1 * scaleFactor}rem`, // text-sm aumentado
        desktop: `${1.4 * scaleFactor}rem`, // text-lg aumentado
      },
      spacing: {
        mb1: `${0.4 * scaleFactor}rem`,
        mb6: `${2.2 * scaleFactor}rem`,
        mb8: `${3 * scaleFactor}rem`,
        mb12: `${4.5 * scaleFactor}rem`,
        mt28: `${8.5 * scaleFactor}rem`,
        mt36: `${11 * scaleFactor}rem`,
        gap4: `${1.5 * scaleFactor}rem`,
        gap6: `${2.2 * scaleFactor}rem`,
        spaceY6: `${2.2 * scaleFactor}rem`,
      },
      buttonPadding: {
        mobile: {
          x: `${2 * scaleFactor}rem`, // px-6 aumentado
          y: `${1 * scaleFactor}rem`, // py-3 aumentado
        },
        desktop: {
          x: `${4 * scaleFactor}rem`, // px-12 aumentado
          y: `${1.4 * scaleFactor}rem`, // py-4 aumentado
        },
      },
    };
  };
  const fontSizes = getScaledFontSizes();
  const sectionStyle: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "50%",
    left: `${dimensions.leftPosition}px`,
    transform: `translate(-50%, ${
      thirdSmoothProgress < 0.4 ? "100%" : "-50%"
    }) translateY(${
      seventhSmoothProgress > 0
        ? -(seventhSmoothProgress * 1200 * scaleFactor)
        : 0
    }px)`,
    transformOrigin: "center center",
    opacity: thirdSmoothProgress >= 0.05 ? 1 : 0,
    visibility: thirdSmoothProgress >= 0.05 ? "visible" : "hidden",
    transition: "all 1.4s cubic-bezier(0.22, 0.61, 0.36, 1)",
    willChange: "transform, opacity",
  };

  const titleStyle = {
    transform:
      fourthSmoothProgress > 0 ? "scale(0.7) translateX(-10%)" : "scale(1)",
    transformOrigin: "left center",
    opacity: fifthSmoothProgress > 0 ? 0 : 1,
        transition: "all 1s cubic-bezier(0.22, 0.61, 0.36, 1)",
    willChange: "transform, opacity",
  };

  // const getResponsiveBottomPosition = () => {
  //   if (viewportDimensions.width < 768) {
  //     return '30%'; // iPhone
  //   } else if (viewportDimensions.width < 1024) {
  //     return '10%'; // iPad
  //   } else if (viewportDimensions.width < 1536) {
  //     return '3%'; // Desktop
  //   } else {
  //     return '-30%'; // 2XL (valor actual)
  //   }
  // }

  const servicesOpacity = fourthSmoothProgress > 0 ? 0 : 1;

  // Function to get responsive initial position of card1
  const getResponsiveCard1Position = () => {
    if (viewportDimensions.width >= 2400) return "130%"; // 2XL: 108% (original)
    if (viewportDimensions.width >= 1536) return "108%"; // 2XL: 108% (original)
    return "75%"; // Desktop/XL: 75% (more visible)
  };

  // Helper to pick values by width: small (<1280), xl (1280-1535), 2xl (>=1536)
  const pickByWidth = (
    smallValue: string,
    xlValue: string,
    twoXlValue: string
  ) => {
    const w = viewportDimensions.width;
    if (w >= 1536) return twoXlValue;
    if (w >= 1280) return xlValue;
    return smallValue;
  };

  const centerPos = viewportDimensions.width <= 767 ? "45%" : "47%";

  // Calculate positions and rotations of  the cards
  const card1Position =
    sixthSmoothProgress > 0
      ? `${-8 + (-8 - 50) * Math.min(1, sixthSmoothProgress * 1.8)}%`
      : fifthSmoothProgress > 0
      ? pickByWidth("-30%", "-5%", "-15%")
      : fourthSmoothProgress > 0
      ? centerPos
      : getResponsiveCard1Position();

  // Helper for 2xl/2400+ for card2/card3
  const pickByWidthCardRight = (
    smallValue: string,
    xlValue: string,
    twoXlValue: string,
    ultraValue: string
  ) => {
    const w = viewportDimensions.width;
    if (w >= 2400) return ultraValue;
    if (w >= 1536) return twoXlValue;
    if (w >= 1280) return xlValue;
    return smallValue;
  };

  const card2Position =
    sixthSmoothProgress > 0
      ? pickByWidth("-30%", "-5%", "-15%")
      : fifthSmoothProgress > 0
      ? centerPos
      : fourthSmoothProgress > 0
      ? pickByWidthCardRight("150%", "96%", "130%", "145%")
      : "200%";

  const card3Position =
    sixthSmoothProgress > 0
      ? centerPos
      : fifthSmoothProgress > 0
      ? pickByWidthCardRight("150%", "96%", "130%", "145%")
      : "200%";

  const card1Rotation =
    fifthSmoothProgress > 0
      ? "15"
      : fourthSmoothProgress > 0 && fifthSmoothProgress === 0
      ? "0"
      : "-15";
  const card2Rotation =
    sixthSmoothProgress > 0 ? "15" : fifthSmoothProgress > 0 ? "0" : "-15";
  const card3Rotation = sixthSmoothProgress > 0 ? "0" : "-15";

  const card1Opacity =
    thirdSmoothProgress < 0
      ? 0
      : Math.min(1, (thirdSmoothProgress - 0.4) * 2.5);
  const card2Opacity = scrollY < 4622 ? 1 : 0;
  const card3Opacity = fifthSmoothProgress > 0 ? 1 : 0;
  return (
    <div style={sectionStyle}>
      {/* Desktop Layout - Only visible on screens >= 1024px */}
      <div
        className="hidden lg:flex w-full h-full"
        // style={{ paddingLeft: `${dimensions.padding.px16}rem`, paddingRight: `${dimensions.padding.px16}rem` }}
      >
        {/* Main content left side */}
        <div
          className={`2xl:mt-[3%] elevate-text ${fourthSmoothProgress > 0 ? 'card-sec-title' : ''}`}
          style={{
            position: "relative",
            marginLeft:
              viewportDimensions.width >= 1536
                ? viewportDimensions.width <= 1920
                  ? `calc(6% * ${1 / scaleFactor})`
                  : viewportDimensions.width <= 2400
                  ? `calc(-2% * ${1 / scaleFactor})`
                  : `calc(-1.8% * ${1 / scaleFactor})`
                : "7rem", // Add margin for non-2XL screens to move right
            transform: `scale(${scaleFactor})`,
            // transformOrigin: 'left center'
          }}
        >
          <div
            style={{
              ...titleStyle,
              // maxWidth: `${dimensions.maxWidths.large}px`,
            }}
          >
            <h2
              className="font-bold text-black font-poppins leading-[1.1]"
              style={{
                fontSize: "60px",
                marginBottom: fontSizes.spacing.mb6,
                marginTop:
                  viewportDimensions.width >= 2400
                    ? "15rem"
                    : viewportDimensions.width >= 1536
                    ? fontSizes.spacing.mt28
                    : "10rem",
                textAlign: "start",
              }}
            >
              ELEVATE YOUR
              <br />
              DIGITAL
              <br />
              INFRASTRUCTURE
            </h2>
            <div
              style={{ opacity: servicesOpacity }}
              className="transition-opacity duration-500"
            >
              <p className="text-black font-poppins mb-5 text-[40px] 2xl:text-[35px] elevate-subtitle">
                Explore our core expertise
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: fontSizes.spacing.spaceY6,
                }}
                className="elevate-p"
              >
                <div>
                  <h3 className="font-poppins text-[20px]">
                    Web Design & Development:
                  </h3>
                  <p className="font-poppins text-[20px] elevate-p ">
                    Crafting sleek, responsive websites that convert and reflect
                    <br />
                    your brand with precision.
                  </p>
                </div>

                <div>
                  <h3 className="font-poppins text-[20px]">AI Integrations</h3>
                  <p className="font-poppins text-[20px] elevate-p">
                    Automating workflows, enhancing decision-making, and
                    <br />
                    unlocking new business capabilities with custom AI agents.
                  </p>
                </div>

                <div>
                  <h3 className="font-poppins text-[20px]">
                    Cybersecurity Consultancy
                  </h3>
                  <p className="font-poppins text-[20px] elevate-p">
                    Protecting your digital assets with proactive strategies and
                    <br />
                    robust security frameworks tailored to your operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenedor de Cards Desktop */}
        <div
          className="absolute inset-0 web-cards-container"
          style={{
            marginTop:
              viewportDimensions.width >= 2400
                ? "25rem"
                : viewportDimensions.width >= 1536
                ? "20rem"
                : "10rem",
          }}
        >
          <ServiceCard
            title="WEB DESIGN & DEVELOPMENT"
            subtitle={
              <span className="text-black">Tailored Digital Platforms</span>
            }
            description={
              <ul className="list-disc pl-6 space-y-1 text-black">
                <li>Landing pages & full websites</li>
                <li>Optimized for speed, security, and conversions</li>
                <li>Mobile-first, responsive layouts</li>
                <li>Custom CMS or headless integration</li>
              </ul>
            }
            gradient="linear-gradient(10deg, #838383 0%, #F7F7F7 100%)"
            position={card1Position}
            rotation={card1Rotation}
            opacity={card1Opacity}
          />

          <ServiceCard
            title="AI INTEGRATIONS"
            subtitle={
              <span className="text-black">Custom Automation Systems</span>
            }
            description={
              <ul className="list-disc pl-6 space-y-1 text-black">
                <li>AI chatbots & agents</li>
                <li>Workflow & task automation</li>
                <li>Data processing tools</li>
                <li>API & platform integrations</li>
              </ul>
            }
            gradient="linear-gradient(135deg, #60c5ff 0%, #60c5ff 100%)"
            position={card2Position}
            rotation={card2Rotation}
            opacity={card2Opacity}
          />

          <ServiceCard
            title="CYBERSECURITY CONSULTANCY"
            subtitle={
              <span className="text-black">Compliance & Protection</span>
            }
            description={
              <ul className="list-disc pl-6 space-y-1 text-black">
                <li>GDPR & NIS compliance</li>
                <li>Vulnerability assessments</li>
                <li>Real-time threat detection</li>
                <li>Staff training & system audits</li>
              </ul>
            }
            gradient="linear-gradient(10deg, #fcd04c 0%, #ba9f4c 100%)"
            position={card3Position}
            rotation={card3Rotation}
            opacity={card3Opacity}
          />
        </div>
      </div>

      {/* Mobile & iPad Layout - Visible on screens < 1024px */}
      <div className="block lg:hidden bg-white mt-16 md:mt-32 relative overflow-hidden h-full">
        {/* Fixed title at top - Always visible */}
        <div className="mb-6 absolute top-4 left-[700px] md:left-[560px] right-0 text-left z-50 bg-white pt-4 ">
          <h2 className="text-[33px] md:text-3xl font-bold text-black font-poppins leading-none mr-28 md:mr-40">
            ELEVATE YOUR
            <br />
            DIGITAL
            <br />
            INFRASTRUCTURE
          </h2>
        </div>

        {/* Contenido de servicios - Se oculta cuando aparecen cards */}
        <div
          className="flex flex-col justify-center mt-[10%] md:mt-[8%] explore-text-wrapper"
          style={{
            opacity: servicesOpacity,
            transition: "opacity 0.3s ease-out",
          }}
        >
          <div className="text-center">
            <p className="text-xl md:text-3xl text-black font-semibold font-poppins mr-40 md:mr-80">
              Explore our core expertise
            </p>
            <div className="mr-40 md:mr-96 mt-2">
              <h3 className="text-sm md:text-lg mr-16 font-poppins text-black">
                Web Design & Development:
              </h3>
              <p className="text-sm md:text-base text-black font-poppins text-left ml-[700px] md:ml-[560px] w-80 md:w-96">
                Crafting sleek, responsive websites that convert and reflect
                your brand with precision.
              </p>
            </div>

            <div className="mr-40 md:mr-96 mt-5">
              <h3 className="text-sm md:text-lg mr-40 md:mr-48 font-poppins text-black">
                AI Integrations
              </h3>
              <p className="text-sm md:text-base text-gray-600 font-poppins text-left ml-[700px] md:ml-[560px] w-80 md:w-96">
                Automating workflows, enhancing decision-making, and unlocking
                new business capabilities with custom AI agents.
              </p>
            </div>

            <div className="mr-40 md:mr-96 mt-5">
              <h3 className="text-sm md:text-lg mr-16 font-poppins text-black">
                Cybersecurity Consultancy
              </h3>
              <p className="text-sm md:text-base text-gray-600 font-poppins text-left ml-[700px] md:ml-[560px] w-80 md:w-96">
                Protecting your digital assets with proactive strategies and
                robust security frameworks tailored to your operations.
              </p>
            </div>
          </div>
        </div>

        {/* Cards with right to left effect - Appear progressively */}
        <div className="absolute inset-0 mt-96 md:mt-48 ml-28">
          {/* ServiceCard 1 - Aparece primero con efecto */}
          {thirdSmoothProgress >= 0.4 && (
            <ServiceCard
              title="WEB DESIGN & DEVELOPMENT"
              subtitle={
                <span className="text-black">Tailored Digital Platforms</span>
              }
              description={
                <ul className="list-disc pl-6 space-y-1 text-black">
                  <li>Landing pages & full websites</li>
                  <li>Optimized for speed, security, and conversions</li>
                  <li>Mobile-first, responsive layouts</li>
                  <li>Custom CMS or headless integration</li>
                </ul>
              }
              gradient="linear-gradient(10deg, #838383 0%, #F7F7F7 100%)"
              position={card1Position}
              rotation={card1Rotation}
              opacity={card1Opacity}
            />
          )}

          {/* ServiceCard 2 - Aparece segundo con efecto */}
          {fourthSmoothProgress > 0 && (
            <ServiceCard
              title="AI INTEGRATIONS"
              subtitle={
                <span className="text-black">Custom Automation Systems</span>
              }
              description={
                <ul className="list-disc pl-6 space-y-1 text-black">
                  <li>AI chatbots & agents</li>
                  <li>Workflow & task automation</li>
                  <li>Data processing tools</li>
                  <li>API & platform integrations</li>
                </ul>
              }
              gradient="linear-gradient(135deg, #60c5ff 0%, #60c5ff 100%)"
              position={card2Position}
              rotation={card2Rotation}
              opacity={card2Opacity}
            />
          )}

          {/* ServiceCard 3 - Aparece tercero con efecto */}
          {fifthSmoothProgress > 0 && (
            <ServiceCard
              title="CYBERSECURITY CONSULTANCY"
              subtitle={
                <span className="text-black">Compliance & Protection</span>
              }
              description={
                <ul className="list-disc pl-6 space-y-1 text-black">
                  <li>GDPR & NIS compliance</li>
                  <li>Vulnerability assessments</li>
                  <li>Real-time threat detection</li>
                  <li>Staff training & system audits</li>
                </ul>
              }
              gradient="linear-gradient(10deg, #fcd04c 0%, #ba9f4c 100%)"
              position={card3Position}
              rotation={card3Rotation}
              opacity={card3Opacity}
            />
          )}
        </div>
      </div>

      {/* Centered Services button */}
      <div
        className="absolute left-[830px] mt-[-13%] md:mt-[-10%] lg:mt-0 md:left-[850px] lg:left[700px] 2xl:left-1/2 -translate-x-1/2 book-button"
        style={{
          marginTop:
            viewportDimensions.width >= 1024
              ? viewportDimensions.width <= 1920
                ? "-180px"
                : "240px"
              : undefined,
          opacity: 1,
          transition: "opacity 0.5s ease-out",
        }}
      >
        <button
          className="flex items-center bg-black text-white rounded-full font-poppins hover:bg-gray-800 transition-colors"
          style={{
            // gap: fontSizes.spacing.gap4,
            paddingLeft: fontSizes.buttonPadding.desktop.x,
            paddingRight: fontSizes.buttonPadding.desktop.x,
            paddingTop: fontSizes.buttonPadding.desktop.y,
            paddingBottom: fontSizes.buttonPadding.desktop.y,
            fontSize: fontSizes.button.desktop,
          }}
          onClick={() => onNavigateToSection?.(7)}
        >
          BOOK A CALL
          <svg
            style={{
              width: `${2 * scaleFactor}rem`,
              height: `${2 * scaleFactor}rem`,
              marginLeft: "30px",
            }}
            viewBox="0 0 37 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="18.5" cy="18.5" r="18.5" fill="white" />
            <path
              d="M10.5146 18C9.96236 18 9.51465 18.4477 9.51465 19C9.51465 19.5523 9.96236 20 10.5146 20V18ZM28.1923 19.7071C28.5828 19.3166 28.5828 18.6834 28.1923 18.2929L21.8283 11.9289C21.4378 11.5384 20.8047 11.5384 20.4141 11.9289C20.0236 12.3195 20.0236 12.9526 20.4141 13.3431L26.071 19L20.4141 24.6569C20.0236 25.0474 20.0236 25.6805 20.4141 26.0711C20.8047 26.4616 21.4378 26.4616 21.8283 26.0711L28.1923 19.7071ZM10.5146 19V20H27.4852V19V18H10.5146V19Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SectionC;
