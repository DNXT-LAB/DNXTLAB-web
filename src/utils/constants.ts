import type { SectionPositions } from '@/types/animations'

// Exact positions of each section
export const SECTION_POSITIONS: SectionPositions = [
  0,     // Section 0: Full video
  250,   // Section A: First tab (reduced from 370)
  1000,  // Section B: Strategic Flexibility
  1600,  // Section C initial: Full text
  2400,  // Section C with Card 1 centered
  3200,  // Section C with Card 2 centered
  4000,  // Section C with Card 3 centered
  4800   // Section D: Form
] as const

// Scroll configurations
export const SCROLL_CONFIG = {
  THRESHOLD: 50,
  NAVBAR_HEIGHT: 130,
  TRANSITION_TIMEOUT: 400,    // Reduced from 600
  ANIMATION_DURATION: 80,     // Reduced from 100
  MESSAGE_CLEAR_TIMEOUT: 5000
} as const

// Configuraciones de niveles de scroll
export const SCROLL_LEVELS = {
  SECOND_LEVEL_START: 700,    // Reduced from 650
  SECOND_LEVEL_RANGE: 300,    // Reduced from 300
  THIRD_LEVEL_START: 1500,
  THIRD_LEVEL_RANGE: 300,
  FOURTH_LEVEL_START: 2200,
  FOURTH_LEVEL_RANGE: 700,
  FIFTH_LEVEL_START: 3000,
  FIFTH_LEVEL_RANGE: 1000,
  SIXTH_LEVEL_START: 3800,
  SIXTH_LEVEL_RANGE: 1000,
  SEVENTH_LEVEL_START: 4600,
  SEVENTH_LEVEL_RANGE: 800
} as const

// Configuraciones de video
export const VIDEO_CONFIG = {
  ORIGINAL_LEFT: 60 + 60 + 306,
  ORIGINAL_TOP: 154 + 255,
  TEXT_ORIGINAL_LEFT: 60 + 780 + 473,
  TEXT_ORIGINAL_TOP: 400
} as const 