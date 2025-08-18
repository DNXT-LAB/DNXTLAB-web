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

  // Detectar y actualizar el zoom del navegador
  useEffect(() => {
    const updateZoom = () => {
      const zoom = Math.round((window.outerWidth / window.innerWidth) * 100) / 100;
      setBrowserZoom(zoom);
    };

    updateZoom();
    window.addEventListener('resize', updateZoom);
    return () => window.removeEventListener('resize', updateZoom);
  }, []);

  const sectionStyle: React.CSSProperties = {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity:
      seventhSmoothProgress < 0.4
        ? 0
        : Math.min(1, (seventhSmoothProgress - 0.4) * 2.5),
    visibility: seventhSmoothProgress > 0.35 ? 'visible' : 'hidden',
    transition: 'opacity 0.5s ease-out',
    willChange: 'opacity',
    transform: `scale(${0.75 / browserZoom})`,
    transformOrigin: 'center center'
  };

  const contentStyle: React.CSSProperties = {
    width: '1600px',
    minWidth: '1600px',
    maxWidth: '1600px',
    padding: '60px',
    display: 'flex',
    flexDirection: 'column',
    gap: '60px',
    position: 'relative'
  };

  const formStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '700px 700px',
    gap: '60px',
    width: '1480px',
    minWidth: '1480px',
    maxWidth: '1480px'
  };

  const inputStyle: React.CSSProperties = {
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
  };

  const textareaStyle: React.CSSProperties = {
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
  };

  const buttonStyle: React.CSSProperties = {
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
  };

  return (
    <div style={sectionStyle}>
      <div style={contentStyle}>
        {/* Title */}
        <h2 style={{
          fontSize: '80px',
          lineHeight: '88px',
          fontWeight: '600',
          fontFamily: 'Poppins, sans-serif',
          color: 'black',
          margin: '0',
          padding: '0',
          width: '1480px',
          minWidth: '1480px',
          maxWidth: '1480px'
        }}>
          BOOK A CALL NOW
        </h2>

        {/* Form Container */}
        <form onSubmit={handleSubmit} style={formStyle}>
          {/* === Left Column: Inputs & Desktop Contact Info === */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '700px', minWidth: '700px', maxWidth: '700px' }}>
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
            {/* Desktop Contact Info */}
            <div style={{ marginTop: 'auto', width: '700px', minWidth: '700px', maxWidth: '700px' }}>
              <div style={{
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
              }}>
                <p style={{ margin: '0', padding: '0' }}>Phone Num: +351 999999999</p>
                <p style={{ margin: '0', padding: '0' }}>Email: info@diamondnxt.com</p>
                <p style={{ margin: '0', padding: '0' }}>Sede: Rua Conselheiro Veloso Cruz, N.º 10</p>
                <p style={{ margin: '0', padding: '0' }}>Porto — 4400 092 Vila Nova de Gaia.</p>
              </div>
            </div>
          </div>

          {/* === Right Column: Textarea & Button === */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '700px', minWidth: '700px', maxWidth: '700px' }}>
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
        </form>

        {/* Form Status Message */}
        {formState.submitMessage && (
          <div
            style={{
              position: 'absolute',
              bottom: '-50px',
              left: '0',
              width: '1480px',
              textAlign: 'center',
              fontSize: '20px',
              lineHeight: '30px',
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