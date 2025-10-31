/** Design tokens extracted from Figma design */

// Colors
export const COLORS = {
  // Primary brand colors
  PRIMARY_BLUE: '#007bff',      // Blue for primary actions and headers
  ACCENT_ORANGE: '#ff9800',     // Orange for secondary actions
  
  // Background colors
  BG_PRIMARY: '#333333',        // Dark background
  BG_CARD: '#ffffff',           // White card background
  BG_OVERLAY: 'rgba(0, 0, 0, 0.3)', // Modal overlay
  BG_GLASS: 'rgba(31, 41, 55, 0.9)', // Glass morphism background
  BG_MENU: 'rgba(0, 0, 0, 0.8)', // Menu popup background
  
  // Text colors
  TEXT_DARK: '#333333',         // Dark text on light backgrounds
  TEXT_LIGHT: '#ffffff',        // Light text on dark backgrounds
  TEXT_SECONDARY: '#6b7280',    // Secondary text
  TEXT_MUTED: '#9ca3af',        // Muted text
  
  // UI element colors
  BORDER_LIGHT: '#e5e7eb',      // Light borders
  BORDER_MEDIUM: '#d1d5db',     // Medium borders
  BORDER_DARK: '#4b5563',       // Dark borders
  
  // Status colors
  SUCCESS: '#10b981',           // Green for success states
  ERROR: '#ff4444',             // Red for error states
  WARNING: '#f59e0b',           // Yellow for warning states
  
  // Interactive colors
  HOVER_BG: '#f3f4f6',          // Hover background
  FOCUS_RING: '#3b82f6',        // Focus ring color
  
  // Gradient colors
  GRADIENT_PRIMARY: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
  GRADIENT_SUCCESS: 'linear-gradient(135deg, #10b981, #34d399)',
};

// Typography
export const TYPOGRAPHY = {
  FONT_FAMILY: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
  
  // Font sizes
  SIZES: {
    XS: '12px',
    SM: '14px',
    BASE: '16px',
    LG: '18px',
    XL: '20px',
  },
  
  // Font weights
  WEIGHTS: {
    NORMAL: 400,
    MEDIUM: 500,
    SEMIBOLD: 600,
    BOLD: 700,
  },
  
  // Line heights
  LINE_HEIGHTS: {
    TIGHT: 1.25,
    NORMAL: 1.5,
    RELAXED: 1.75,
  },
};

// Spacing (matches Tailwind spacing scale)
export const SPACING = {
  XS: '4px',
  SM: '8px',
  MD: '12px',
  LG: '16px',
  XL: '20px',
  XXL: '24px',
  XXXL: '32px',
};

// Border radius
export const BORDER_RADIUS = {
  SM: '4px',
  MD: '6px',
  LG: '8px',
  XL: '12px',
  XXL: '16px',
  FULL: '50px',
  CIRCLE: '50%',
};

// Shadows
export const SHADOWS = {
  SM: '0 1px 2px rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
  MD: '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
  LG: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
  XL: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
  XXL: '0 25px 50px rgba(0, 0, 0, 0.25)',
  
  // Special shadows from Figma design
  WIDGET: '0 4px 12px rgba(0,0,0,0.4)',
  PANEL: '0 20px 60px rgba(0,0,0,0.3)',
  TRANSCRIPT: '0 10px 40px rgba(0,0,0,0.4)',
};

// Z-index layers
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  TOAST: 1080,
  WIDGET: 9999,
};

// Animation durations
export const ANIMATION = {
  FAST: '0.1s',
  DEFAULT: '0.2s',
  SLOW: '0.3s',
  SLOWER: '0.5s',
  
  // Easing functions
  EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  EASE_OUT: 'cubic-bezier(0, 0, 0.2, 1)',
  EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)',
};// Widget specific constants
export const WIDGET = {
  SIZE: '48px',
  POSITION: {
    DEFAULT_LEFT: '50px',
    DEFAULT_TOP: '50px',
  },
  MENU_OFFSET: '-64px',
  PANEL_WIDTH: {
    MIN: '350px',
    MAX: '420px',
  },
  TRANSCRIPT_WIDTH: '320px',
  TRANSCRIPT_MAX_HEIGHT: '192px',
};

// Breakpoints (for responsive design)
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  XXL: '1536px',
};