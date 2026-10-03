import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const filePath = path.join(process.cwd(), 'src/data/stotras', `${slug}.json`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Stotra not found' }, { status: 404 });
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const stotra = JSON.parse(fileContents);

    return NextResponse.json(stotra);
  } catch (error) {
    console.error('Error reading stotra:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
