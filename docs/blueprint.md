# **App Name**: RtorMovies

## Core Features:

- Movie Catalog: Home page to display movies in categories (Trending, Popular) using data from movies.json. Server-side rendering implemented using getServerSideProps for SEO optimization and initial load performance.
- Detailed Movie View: Dynamic movie detail pages, accessed via /movies/[id], display comprehensive movie information: poster, title, description, cast, and genre, fetched using getServerSideProps for SEO and optimal initial load.
- Theme Toggle: Global theme context (light/dark) that allows users to toggle the site's theme via a Navbar button. Leverages React Context API for persistent theme states across the entire application, with default dark mode.
- Recommendation Engine: AI-powered recommendation tool: Generates personalized movie recommendations. An LLM reasons whether and when to display recommendations based on viewing history. Uses an AI tool.
- Custom 404 Page: Custom 404 page designed to match the chosen theme.

## Style Guidelines:

- Primary color: Bright Prime Blue (#00A8E1), a logo highlight.
- Background color: Deep black (#000000), an overall background.
- Text color: White (#FFFFFF), main text.
- Text color: Muted grey (#B3B3B3) for labels/descriptions.
- Accent color: Secondary action blue (#1F80E0) for button hovers and secondary actions.
- Highlight color: IMDb-style ratings yellow (#F5C518).
- Button Hover color: Darker blue (#0077B6).
- Divider/Border color: Soft grey lines and card borders (#2C2C2C).
- Headline font: 'Poppins' (sans-serif) for a modern, geometric, and easily readable style in titles and prominent text.
- Body font: 'Inter' (sans-serif) for body text; provides clarity and readability for descriptions and content.
- Simple, outlined icons for navigation and actions; consistent style across the interface.
- Responsive grid layout, mimicking Amazon Prime Video, optimized for various screen sizes using Tailwind CSS.