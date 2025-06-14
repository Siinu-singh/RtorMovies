import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Make sure this path matches your project structure
    const filePath = path.join(process.cwd(), 'src', 'data', 'tvshows.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(jsonData);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to read or parse tvshows.json:', error);
    return NextResponse.json({ error: 'Failed to fetch TV shows' }, { status: 500 });
  }
}
