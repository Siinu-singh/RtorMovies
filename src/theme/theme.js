// Reverted to Prime Video-like theme
export const primeTheme = {
  colors: {
    backgroundDarker: '#0F171E', // Deep dark blue/black
    backgroundDark: '#191E25',   // Main dark background
    backgroundLight: '#232F3E',  // Slightly lighter dark for elements
    
    textPrimary: '#FFFFFF',       // White
    textSecondary: '#CCCCCC',     // Light gray
    textMuted: '#AAAAAA',        // Muted gray

    accentBlue: '#0F79AF',        // Prime-like blue
    accentBlueHover: '#00A8E1',   // Lighter blue for hover/active
    
    white: '#FFFFFF',
    black: '#000000',

    // Specific UI elements if needed
    buttonPrimaryBackground: '#0F79AF',
    buttonPrimaryText: '#FFFFFF',
    buttonSecondaryBackground: 'rgba(255, 255, 255, 0.1)', // Translucent white
    buttonSecondaryText: '#FFFFFF',
    
    cardGlow: 'rgba(15, 121, 175, 0.5)', // For hover effects
  },
  fonts: {
    primary: '"Amazon Ember", Arial, sans-serif', // Example, actual font might differ
  },
};

// Ensure hiAnimeTheme (if used elsewhere) also points to this reverted theme for consistency for now.
export const hiAnimeTheme = primeTheme; 

// Helper function to use these in Tailwind (if not directly using CSS-in-JS)
export const getTailwindColors = () => {
  return {
    'background-darker': primeTheme.colors.backgroundDarker,
    'background-dark': primeTheme.colors.backgroundDark,
    'background-light': primeTheme.colors.backgroundLight,
    'text-primary': primeTheme.colors.textPrimary,
    'text-secondary': primeTheme.colors.textSecondary,
    'text-muted': primeTheme.colors.textMuted,
    'accent-blue': primeTheme.colors.accentBlue,
    'accent-blue-hover': primeTheme.colors.accentBlueHover,
  };
};
