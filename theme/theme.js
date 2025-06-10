export const hiAnimeTheme = {
  colors: {
    backgroundDark: '#050505',
    backgroundLight: '#090909',
    textPrimary: '#ffffff',
    textSecondary: '#b9b9b9',
    accentOrange: '#fd5e1e',
    accentBlue: '#0165b9',
    accentTeal: '#1ABDBB',
  },
  // You can add other theme-related constants here, like font families, spacing, etc.
};

// Helper function to use these in Tailwind (if not directly using CSS-in-JS)
// This is more for reference if you were to generate a tailwind config from it.
// For direct use in components, just import hiAnimeTheme.
export const getTailwindColors = () => {
  return {
    'background-dark': hiAnimeTheme.colors.backgroundDark,
    'background-light': hiAnimeTheme.colors.backgroundLight,
    'text-primary': hiAnimeTheme.colors.textPrimary,
    'text-secondary': hiAnimeTheme.colors.textSecondary,
    'accent-orange': hiAnimeTheme.colors.accentOrange,
    'accent-blue': hiAnimeTheme.colors.accentBlue,
    'accent-teal': hiAnimeTheme.colors.accentTeal,
  };
};