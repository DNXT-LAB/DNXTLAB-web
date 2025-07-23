// Tipos para las animaciones de scroll
export interface ScrollProgress {
  secondSmoothProgress: number
  thirdSmoothProgress: number
  fourthSmoothProgress: number
  fifthSmoothProgress: number
  sixthSmoothProgress: number
  seventhSmoothProgress: number
}

// Tipos para los datos del formulario
export interface FormData {
  firstName: string
  lastName: string
  email: string
  message: string
}

export interface FormState {
  formData: FormData
  isSubmitting: boolean
  submitMessage: string
  submitStatus: 'success' | 'error' | null
}

// Props para las secciones
export interface SectionProps {
  scrollY: number
  progress: ScrollProgress
  windowHeight: number
}

export interface SectionAProps extends SectionProps {
  sectionATranslateY: number
  sectionAScale: number
  videoConvergeX: number
  videoConvergeY: number
  textConvergeX: number
  textConvergeY: number
}

export interface ContactSectionProps extends SectionProps {
  formState: FormState
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent) => void
}

// Tipos para las posiciones de las secciones
export type SectionPositions = readonly number[]

// Props para la navegación
export interface NavigationProps {
  onNavigateToSection: (section: number) => void
  currentSection: number
} 