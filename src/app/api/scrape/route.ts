import { NextResponse } from 'next/server'
import { scrapAllPages } from '@/lib/scraper'

export async function GET() {
  try {
    const startUrl = 'https://bctengineeringnotes.blogspot.com/'
    await scrapAllPages(startUrl)
    return NextResponse.json({ message: 'Scraping completed successfully' })
  } catch (error) {
    console.error('An error occurred during scraping:', error)
    return NextResponse.json({ error: 'Scraping failed' }, { status: 500 })
  }
}

