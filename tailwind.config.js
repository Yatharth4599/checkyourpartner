module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'heart-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-30px) scale(1.1)' },
        },
        'heart-float2': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px) scale(1.05)' },
        },
        'heart-float3': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-40px) scale(1.15)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: 0.5, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.15)' },
        },
      },
      animation: {
        'heart-float': 'heart-float 4s ease-in-out infinite',
        'heart-float2': 'heart-float2 5s ease-in-out infinite',
        'heart-float3': 'heart-float3 6s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}; 