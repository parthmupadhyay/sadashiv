import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Stotra } from '@/types/stotra';

export async function GET() {
  try {
    const stotrasDirectory = path.join(process.cwd(), 'src/data/stotras');
    
    if (!fs.existsSync(stotrasDirectory)) {
      return NextResponse.json([]);
    }

    const filenames = fs.readdirSync(stotrasDirectory);
    const stotras = filenames
      .filter((filename) => filename.endsWith('.json'))
      .map((filename) => {
        const filePath = path.join(stotrasDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const stotra: Stotra = JSON.parse(fileContents);

        return {
          id: stotra.id,
          title_sanskrit: stotra.title_sanskrit,
          title_transliteration: stotra.title_transliteration,
          title_english: stotra.title_english,
          total_stanzas: stotra.total_stanzas,
        };
      });

    return NextResponse.json(stotras);
  } catch (error) {
    console.error('Error reading stotras:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
