import fs from 'fs/promises';
import path from 'path';

export async function getAllTVShows() {
  // Construct the absolute path to the JSON file within src
  const filePath = path.join(process.cwd(), 'src', 'data', 'tvshows.json');
  try {
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(jsonData);
    return data;
  } catch (error) {
    console.error('Failed to read or parse src/data/tvshows.json:', error);
    return []; // Return empty array on error
  }
}

export async function getTVShowById(id) {
  const tvShows = await getAllTVShows();
  return tvShows.find(show => show.id === id);
}