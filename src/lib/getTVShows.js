export async function getAllTVShows() {
  try {
    const response = await fetch('/api/tvshows');
    if (!response.ok) {
      throw new Error('Failed to fetch TV shows');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching TV shows:', error);
    return [];
  }
}

export async function getTVShowById(id) {
  try {
    const response = await fetch(`/api/tvshows/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch TV show');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching TV show:', error);
    return null;
  }
}