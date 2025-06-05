
import { NextResponse } from 'next/server';
import { getAllMovies } from '@/lib/MovieService';

export async function GET(request) {
  try {
    const movies = await getAllMovies();
    return NextResponse.json(movies);
  } catch (error) {
    console.error('API Error fetching movies from /api/movies:', error);
    return NextResponse.json(
      { message: 'Failed to load movies', error: error.message },
      { status: 500 }
    );
  }
}
