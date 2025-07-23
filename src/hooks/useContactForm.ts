import { useState, useCallback } from 'react'
import { SCROLL_CONFIG } from '@/utils/constants'
import type { FormData, FormState } from '@/types/animations'

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  message: ''
}

export const useContactForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }, [])

  const clearMessage = useCallback(() => {
    setTimeout(() => {
      setSubmitMessage('')
      setSubmitStatus(null)
    }, SCROLL_CONFIG.MESSAGE_CLEAR_TIMEOUT)
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validación básica
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setSubmitMessage('Por favor, completa todos los campos')
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)
    setSubmitMessage('')
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitMessage('¡Gracias! Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo pronto.')
        setSubmitStatus('success')
        // Limpiar el formulario
        setFormData(initialFormData)
      } else {
        setSubmitMessage(data.error || 'Error al enviar el mensaje. Por favor, intenta de nuevo.')
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error:', error)
      setSubmitMessage('Error de conexión. Por favor, verifica tu conexión a internet y intenta de nuevo.')
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      clearMessage()
    }
  }, [formData, clearMessage])

  const formState: FormState = {
    formData,
    isSubmitting,
    submitMessage,
    submitStatus
  }

  return {
    formState,
    handleInputChange,
    handleSubmit
  }
} 