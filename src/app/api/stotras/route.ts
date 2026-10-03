import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Stotra } from '@/types/stotra';

export async function GET() {
  try {
    const stotrasDirectory = path.join(process.cwd(), 'src/data/stotras');
    
    try {
      await fs.access(stotrasDirectory);
    } catch {
      return NextResponse.json([]);
    }

    const filenames = await fs.readdir(stotrasDirectory);
    const stotraPromises = filenames
      .filter((filename) => filename.endsWith('.json'))
      .map(async (filename) => {
        const filePath = path.join(stotrasDirectory, filename);
        const fileContents = await fs.readFile(filePath, 'utf8');
        const stotra: Stotra = JSON.parse(fileContents);

        return {
          id: stotra.id,
          title_sanskrit: stotra.title_sanskrit,
          title_transliteration: stotra.title_transliteration,
          title_english: stotra.title_english,
          author: stotra.author,
          total_stanzas: stotra.total_stanzas,
        };
      });

    const stotras = await Promise.all(stotraPromises);

    return NextResponse.json(stotras);
  } catch (error) {
    console.error('Error reading stotras:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
