import { Variants, Transition } from 'framer-motion'

// Professional animation presets following UX/UI best practices
export const animations = {
  // Entrance animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2, ease: 'easeInOut' }
  },

  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  },

  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  },

  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  },

  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  },

  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
  },

  // Button interactions
  buttonHover: {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    press: { scale: 0.95 },
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 17
    }
  },

  // Card hover effects
  cardHover: {
    rest: { y: 0, scale: 1 },
    hover: { 
      y: -4, 
      scale: 1.02,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    },
    press: { scale: 0.98 }
  },

  // Loading states
  loadingSpinner: {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  },

  loadingPulse: {
    animate: {
      opacity: [0.4, 1, 0.4],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  },

  // Modal animations
  modalOverlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2, ease: 'easeInOut' }
  },

  modalContent: {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 20 },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  },

  // Notification animations
  notificationSlide: {
    initial: { opacity: 0, y: -50, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -50, scale: 0.9 },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  },

  // Tab animations
  tabIndicator: {
    initial: { width: 0 },
    animate: { width: '100%' },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  },

  // Progress animations
  progressFill: {
    initial: { width: '0%' },
    animate: { width: '100%' },
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  },

  // Stagger animations for lists
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  },

  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  }
}

// Animation variants for different component states
export const variants: Record<string, Variants> = {
  // Button variants
  button: {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    disabled: { opacity: 0.6, cursor: 'not-allowed' }
  },

  // Card variants
  card: {
    hover: { 
      y: -4,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },
    tap: { scale: 0.98 }
  },

  // Input variants
  input: {
    focus: { scale: 1.02 },
    blur: { scale: 1 }
  },

  // Modal variants
  modal: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  },

  // Tooltip variants
  tooltip: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  },

  // Dropdown variants
  dropdown: {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -10 }
  }
}

// Professional transition presets
export const transitions: Record<string, Transition> = {
  // Fast transitions for UI feedback
  fast: {
    duration: 0.15,
    ease: [0.4, 0, 0.2, 1]
  },

  // Standard transitions
  standard: {
    duration: 0.2,
    ease: [0.4, 0, 0.2, 1]
  },

  // Smooth transitions for larger movements
  smooth: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1]
  },

  // Bouncy transitions for playful interactions
  bouncy: {
    type: 'spring',
    stiffness: 400,
    damping: 10
  },

  // Gentle spring transitions
  gentle: {
    type: 'spring',
    stiffness: 300,
    damping: 20
  },

  // Slow transitions for dramatic effects
  slow: {
    duration: 0.5,
    ease: [0.4, 0, 0.2, 1]
  }
}

// Animation utility functions
export const createStaggerAnimation = (delay = 0.1, staggerDirection = 1) => ({
  animate: {
    transition: {
      delayChildren: delay,
      staggerChildren: 0.1 * staggerDirection
    }
  }
})

export const createRevealAnimation = (direction: 'up' | 'down' | 'left' | 'right' = 'up') => {
  const directions = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 }
  }

  return {
    initial: { opacity: 0, ...directions[direction] },
    animate: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, ...directions[direction] }
  }
}

// Performance optimization for reduced motion
export const getReducedMotionAnimation = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return prefersReducedMotion ? { duration: 0 } : undefined
}

export type AnimationPresets = typeof animations
export type AnimationVariants = typeof variants
export type AnimationTransitions = typeof transitions
