import React, { useState, useEffect } from 'react';
import type { ContactSectionProps } from '@/types/animations';

const SectionD: React.FC<ContactSectionProps> = ({
  progress,
  formState,
  handleInputChange,
  handleSubmit,
}) => {
  const { seventhSmoothProgress } = progress;
  const [browserZoom, setBrowserZoom] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar y actualizar el zoom del navegador y el estado móvil
  useEffect(() => {
    const updateDimensions = () => {
      const zoom = Math.round((window.outerWidth / window.innerWidth) * 100) / 100;
      setBrowserZoom(zoom);
      setIsMobile(window.innerWidth < 1024);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const sectionStyle: React.CSSProperties = {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: '-6%',
    left: '0',
    right: '0',
    bottom: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: seventhSmoothProgress < 0.4 ? 0 : Math.min(1, (seventhSmoothProgress - 0.4) * 2.5),
    visibility: seventhSmoothProgress > 0.35 ? 'visible' : 'hidden',
    transition: 'opacity 0.5s ease-out',
    willChange: 'opacity',
    transform: !isMobile ? `scale(${0.75 / browserZoom})` : 'none',
    transformOrigin: 'center center'
  };

  const contentStyle: React.CSSProperties = !isMobile ? {
    width: '1600px',
    minWidth: '1600px',
    maxWidth: '1600px',
    padding: '60px',
    display: 'flex',
    flexDirection: 'column',
    gap: '60px',
    position: 'relative'
  } : {
    width: '100%',
    padding: '20px',
    paddingTop: '0', // Reducido el padding superior
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    position: 'relative'
  };

  const formStyle: React.CSSProperties = !isMobile ? {
    display: 'grid',
    gridTemplateColumns: '700px 700px',
    gap: '60px',
    width: '1480px',
    minWidth: '1480px',
    maxWidth: '1480px'
  } : {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%'
  };

  const inputStyle: React.CSSProperties = !isMobile ? {
    width: '700px',
    minWidth: '700px',
    maxWidth: '700px',
    height: '80px',
    minHeight: '80px',
    maxHeight: '80px',
    padding: '0 40px',
    fontSize: '20px',
    lineHeight: '80px',
    color: 'black',
    background: 'linear-gradient(0deg, #D6D6D6, #ffffff)',
    borderRadius: '9999px',
    border: 'none',
    outline: 'none',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  } : {
    width: '100%',
    height: '50px',
    padding: '0 20px',
    fontSize: '16px',
    lineHeight: '50px',
    color: 'black',
    background: 'linear-gradient(0deg, #D6D6D6, #ffffff)',
    borderRadius: '25px',
    border: 'none',
    outline: 'none',
    boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1)'
  };

  const textareaStyle: React.CSSProperties = !isMobile ? {
    width: '700px',
    minWidth: '700px',
    maxWidth: '700px',
    height: '450px',
    minHeight: '450px',
    maxHeight: '450px',
    padding: '32px 40px',
    fontSize: '20px',
    lineHeight: '30px',
    color: 'black',
    background: 'linear-gradient(0deg, #D6D6D6, #ffffff)',
    borderRadius: '32px',
    border: 'none',
    outline: 'none',
    resize: 'none',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  } : {
    width: '100%',
    height: '100px',
    padding: '15px 20px',
    fontSize: '16px',
    lineHeight: '24px',
    color: 'black',
    background: 'linear-gradient(0deg, #D6D6D6, #ffffff)',
    borderRadius: '20px',
    border: 'none',
    outline: 'none',
    resize: 'none',
    boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1)'
  };

  const buttonStyle: React.CSSProperties = !isMobile ? {
    width: '700px',
    minWidth: '700px',
    maxWidth: '700px',
    height: '80px',
    minHeight: '80px',
    maxHeight: '80px',
    fontSize: '20px',
    lineHeight: '80px',
    color: 'white',
    backgroundColor: 'black',
    borderRadius: '9999px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    padding: '0'
  } : {
    width: '100%',
    height: '50px',
    fontSize: '16px',
    lineHeight: '50px',
    color: 'white',
    backgroundColor: 'black',
    borderRadius: '25px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    padding: '0'
  };

  const titleStyle: React.CSSProperties = !isMobile ? {
    fontSize: '100px',
    lineHeight: '88px',
    fontWeight: '600',
    fontFamily: 'Poppins, sans-serif',
    color: 'black',
    margin: '0',
    padding: '0',
    width: '1480px',
    minWidth: '1480px',
    maxWidth: '1480px'
  } : {
    fontSize: '36px',
    lineHeight: '44px',
    fontWeight: '600',
    fontFamily: 'Poppins, sans-serif',
    color: 'black',
    margin: '0',
    padding: '0',
    width: '100%',
    textAlign: 'center'
  };

  const contactInfoStyle: React.CSSProperties = !isMobile ? {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    fontSize: '20px',
    lineHeight: '30px',
    color: 'black',
    fontFamily: 'Poppins, sans-serif',
    width: '700px',
    minWidth: '700px',
    maxWidth: '700px'
  } : {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontSize: '14px',
    lineHeight: '20px',
    color: 'black',
    fontFamily: 'Poppins, sans-serif',
    width: '100%',
    textAlign: 'center',
    marginTop: '20px'
  };

  return (
    <div style={sectionStyle}>
      <div style={contentStyle}>
        {/* Title */}
        <h2 style={titleStyle}>
          BOOK A CALL NOW
        </h2>

        {/* Form Container */}
        <form onSubmit={handleSubmit} style={formStyle}>
          {!isMobile ? (
            <>
              {/* Desktop Layout */}
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '32px', 
                width: '700px'
              }}>
                <input
                  type="text"
                  name="firstName"
                  value={formState.formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First name"
                  style={inputStyle}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  value={formState.formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  style={inputStyle}
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formState.formData.email}
                  onChange={handleInputChange}
                  placeholder="Your email"
                  style={inputStyle}
                  required
                />
                {/* Contact Info */}
                <div style={{ marginTop: 'auto', width: '700px' }}>
                  <div style={contactInfoStyle}>
                    <p style={{ margin: '0', padding: '0' }}>Phone Num: +351 999999999</p>
                    <p style={{ margin: '0', padding: '0' }}>Email: info@diamondnxt.com</p>
                    <p style={{ margin: '0', padding: '0' }}>Sede: Rua Conselheiro Veloso Cruz, N.º 10</p>
                    <p style={{ margin: '0', padding: '0' }}>Porto — 4400 092 Vila Nova de Gaia.</p>
                  </div>
                </div>
              </div>

              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '32px',
                width: '700px'
              }}>
                <textarea
                  name="message"
                  value={formState.formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project..."
                  style={textareaStyle}
                  required
                />
                <button
                  type="submit"
                  disabled={formState.isSubmitting}
                  style={{
                    ...buttonStyle,
                    opacity: formState.isSubmitting ? '0.5' : '1'
                  }}
                >
                  {formState.isSubmitting ? 'Sending...' : 'Book a call'}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Mobile Layout */}
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '20px', 
                width: '100%'
              }}>
                <input
                  type="text"
                  name="firstName"
                  value={formState.formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First name"
                  style={inputStyle}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  value={formState.formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  style={inputStyle}
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formState.formData.email}
                  onChange={handleInputChange}
                  placeholder="Your email"
                  style={inputStyle}
                  required
                />
                <textarea
                  name="message"
                  value={formState.formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project..."
                  style={textareaStyle}
                  required
                />
                <button
                  type="submit"
                  disabled={formState.isSubmitting}
                  style={{
                    ...buttonStyle,
                    opacity: formState.isSubmitting ? '0.5' : '1'
                  }}
                >
                  {formState.isSubmitting ? 'Sending...' : 'Book a call'}
                </button>
                {/* Contact Info al final en móvil */}
                <div style={contactInfoStyle}>
                  <p style={{ margin: '0', padding: '0' }}>Phone Num: +351 999999999</p>
                  <p style={{ margin: '0', padding: '0' }}>Email: info@diamondnxt.com</p>
                  <p style={{ margin: '0', padding: '0' }}>Sede: Rua Conselheiro Veloso Cruz, N.º 10</p>
                  <p style={{ margin: '0', padding: '0' }}>Porto — 4400 092 Vila Nova de Gaia.</p>
                </div>
              </div>
            </>
          )}
        </form>

        {/* Form Status Message */}
        {formState.submitMessage && (
          <div
            style={{
              position: 'absolute',
              bottom: !isMobile ? '-50px' : '-30px',
              left: '0',
              width: !isMobile ? '1480px' : '100%',
              textAlign: 'center',
              fontSize: !isMobile ? '20px' : '14px',
              lineHeight: !isMobile ? '30px' : '20px',
              color: formState.submitStatus === 'success' ? '#059669' : '#DC2626'
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