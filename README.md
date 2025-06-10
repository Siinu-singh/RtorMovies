# RtorMovies - Your Ultimate Movie Destination

This project is a modern, responsive movie catalog and recommendation website built with Next.js, React, Tailwind CSS, ShadCN UI components, and Genkit for AI features. It features dynamic content from `movies.json`, interactive UI elements, a theme toggle, and a clean, user-friendly design inspired by streaming platforms.

## Core Features:

*   **Movie Catalog**: Home page displaying movies in categories (e.g., Trending, Popular) from `movies.json`.
*   **Detailed Movie View**: Dynamic movie detail pages (`/movies/[id]`) showing comprehensive movie information including poster, title, description, cast, and genre.
*   **Theme Toggle**: Global light/dark theme toggle for user preference.
*   **AI Recommendation Engine**: (Planned/To be implemented) Personalized movie recommendations using Genkit.
*   **Custom 404 Page**: A themed 404 page for a consistent user experience.
*   **Responsive Design**: Adapts to various screen sizes, ensuring a good experience on mobile, tablet, and desktop.
*   **Modern UI**: Clean and intuitive interface, leveraging ShadCN UI and Tailwind CSS, with a style reminiscent of modern streaming services.
*   **Interactive Components**: Smooth navigation (like the Prime Video-style Navbar), engaging hover effects, and dynamic content presentation, including a parallax hero section on the homepage.

## Tech Stack

*   **Next.js**: React framework for server-side rendering (SSR) and static site generation (SSG).
*   **React**: JavaScript library for building user interfaces.
*   **Tailwind CSS**: Utility-first CSS framework for rapid UI development and styling.
*   **ShadCN UI**: Collection of beautifully designed, accessible UI components.
*   **Lucide React**: Library for beautiful and consistent icons.
*   **Genkit**: Toolkit for integrating AI-powered features (e.g., recommendation engine).
*   **Framer Motion**: For smooth animations and interactions (e.g., parallax hero section).

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18.x or later recommended)
*   npm or yarn

### Installation & Setup

1.  **Clone the repository (if applicable):**
    ```bash
    git clone <your-repository-url>
    cd <repository-directory>
    ```

2.  **Install NPM packages:**
    ```bash
    npm install
    ```
    or if you use yarn:
    ```bash
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will typically start the server on [http://localhost:9002](http://localhost:9002) (as specified in `package.json`).

    Open the URL in your browser to see the result.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

And to start the production server:

```bash
npm run start
```

## Project Structure

*   `src/app/`: Contains the core application pages (e.g., `page.jsx`, `movies/[id]/page.jsx`, `not-found.jsx`) and the main `layout.jsx`.
*   `src/components/`: Reusable UI components.
    *   `src/components/ui/`: ShadCN UI components (e.g., Button, Card, NavigationMenu).
    *   `src/components/layout/`: Structural components like Navbar and Footer.
    *   `src/components/movie/`: Movie-specific components like MovieCard and MovieList.
    *   `src/components/home/`: Components specific to the homepage, like HeroSection.
*   `src/contexts/`: React contexts (e.g., `theme-context.jsx` for theme management).
*   `src/data/`: JSON files for static data (e.g., `movies.json`).
*   `src/hooks/`: Custom React hooks (e.g., `UseMobile`, `UseToast`).
*   `src/lib/`: Core logic, services, and utility functions (e.g., `MovieService.js`, `Utils.js`).
*   `src/ai/`: (If Genkit is used) Would contain Genkit flows and AI-related logic for features like recommendations.
*   `public/`: Static assets like images (though many images are currently placeholders or from Unsplash as per `next.config.js`).
*   `next.config.js`: Next.js configuration, including image remote patterns.
*   `tailwind.config.js`: Tailwind CSS configuration, including custom theme colors and fonts.
*   `components.json`: ShadCN UI configuration for CLI and component aliases.
*   `globals.css`: Global styles and Tailwind CSS theme variable definitions.

## Author

*   Suraj kumar singh


---

This project demonstrates building a feature-rich web application with a modern tech stack, focusing on a movie catalog and recommendation system, styled after popular streaming services.
