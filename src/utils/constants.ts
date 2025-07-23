import type { SectionPositions } from '@/types/animations'

// Posiciones exactas de cada sección
export const SECTION_POSITIONS: SectionPositions = [
  0,     // Sección 0: Video completo
  370,   // Sección A: Primera pestaña
  1000,  // Sección B: Strategic Flexibility
  1600,  // Sección C inicial: Texto completo
  2400,  // Sección C con Card 1 centrada
  3200,  // Sección C con Card 2 centrada
  4000,  // Sección C con Card 3 centrada
  4800   // Sección D: Formulario
] as const

// Configuraciones de scroll
export const SCROLL_CONFIG = {
  THRESHOLD: 50,
  NAVBAR_HEIGHT: 80,
  TRANSITION_TIMEOUT: 600,
  ANIMATION_DURATION: 100,
  MESSAGE_CLEAR_TIMEOUT: 5000
} as const

// Configuraciones de niveles de scroll
export const SCROLL_LEVELS = {
  SECOND_LEVEL_START: 650,
  SECOND_LEVEL_RANGE: 300,
  THIRD_LEVEL_START: 1000,
  THIRD_LEVEL_RANGE: 100,
  FOURTH_LEVEL_START: 1600,
  FOURTH_LEVEL_RANGE: 700,
  FIFTH_LEVEL_START: 2400,
  FIFTH_LEVEL_RANGE: 800,
  SIXTH_LEVEL_START: 3200,
  SIXTH_LEVEL_RANGE: 800,
  SEVENTH_LEVEL_START: 4000,
  SEVENTH_LEVEL_RANGE: 800
} as const

// Configuraciones de video
export const VIDEO_CONFIG = {
  ORIGINAL_LEFT: 60 + 60 + 306,
  ORIGINAL_TOP: 154 + 255,
  TEXT_ORIGINAL_LEFT: 60 + 780 + 473,
  TEXT_ORIGINAL_TOP: 400
} as const 