
import fs from 'fs/promises';
import path from 'path';

const MOVIES_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'movies.json');

async function loadMoviesData() {
  try {
    const jsonData = await fs.readFile(MOVIES_FILE_PATH, 'utf-8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Failed to load movies data:", error);
    return [];
  }
}

export async function getAllMovies() {
  return await loadMoviesData();
}

export async function getMovieById(id) {
  const movies = await loadMoviesData();
  return movies.find(movie => movie.id === id);
}

export async function getMoviesByGenre(genre, excludeId) {
  const allMovies = await loadMoviesData();
  // Ensure movie.genre is treated as an array even if it's sometimes a string
  return allMovies.filter(m => {
    const genres = Array.isArray(m.genre) ? m.genre : [m.genre];
    return genres.includes(genre) && m.id !== excludeId;
  }).slice(0, 5);
}

export async function getMoviesByCategory(category) {
  const allMovies = await loadMoviesData();
  // Ensure movie.categories is treated as an array
  return allMovies.filter(movie => {
    const categories = Array.isArray(movie.categories) ? movie.categories : [movie.categories];
    return categories.includes(category);
  });
}
