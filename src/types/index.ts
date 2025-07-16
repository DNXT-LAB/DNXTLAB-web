export interface LoadingAnimationProps {
  letters: string[]
  animatedLetters: boolean[]
  mounted: boolean
}

export type AnimationPhase = 'initial' | 'animating' | 'video'

export interface AnimationState {
  mounted: boolean
  phase: AnimationPhase
  animatedLetters: boolean[]
  letters: string[]
} 