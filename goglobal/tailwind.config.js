/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        primary: {
          DEFAULT: '#007bff',
          blue: '#007bff',
        },
        accent: {
          DEFAULT: '#ff9800',
          orange: '#ff9800',
        },
        
        // Background colors
        bg: {
          primary: '#333333',
          card: '#ffffff',
          overlay: 'rgba(0, 0, 0, 0.3)',
          glass: 'rgba(31, 41, 55, 0.9)',
          menu: 'rgba(0, 0, 0, 0.8)',
        },
        
        // Text colors
        text: {
          dark: '#333333',
          light: '#ffffff',
          secondary: '#6b7280',
          muted: '#9ca3af',
        },
        
        // Status colors
        success: '#10b981',
        error: '#ff4444',
        warning: '#f59e0b',
      },
      
      fontFamily: {
        sans: ['system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
      },
      
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        'xxl': '24px',
        'xxxl': '32px',
      },
      
      borderRadius: {
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        'xxl': '16px',
        'full': '50px',
      },
      
      boxShadow: {
        'widget': '0 4px 12px rgba(0,0,0,0.4)',
        'panel': '0 20px 60px rgba(0,0,0,0.3)',
        'transcript': '0 10px 40px rgba(0,0,0,0.4)',
      },
      
      zIndex: {
        'widget': '9999',
        'modal': '1050',
        'modal-backdrop': '1040',
        'toast': '1080',
      },
      
      animation: {
        'pulse': 'pulse 2s infinite',
        'slideInFade': 'slideInFade 0.5s ease-out',
      },
      
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        slideInFade: {
          'from': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
    },
  },
  plugins: [],
}