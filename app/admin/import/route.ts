import { db } from '@/lib/db'
import { books, boardgames } from '@/lib/schema'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()

  try {
    const { books: bookList = [], boardgames: boardgameList = [] } = body

    for (const book of bookList) {
      await db.insert(books).values({
        title: book.title,
        author: book.author ?? null,
        publication_year: book.publication_year ?? null,
        description: book.description ?? null,
        cover_url: book.cover_url ?? null,
        amazon_link: book.amazon_link ?? null,
        event_id: book.event_id ?? null,
      })
    }

    for (const game of boardgameList) {
      await db.insert(boardgames).values({
        title: game.title,
        designer: game.designer ?? null,
        publisher: game.publisher ?? null,
        year_published: game.year_published ?? null,
        description: game.description ?? null,
        cover_url: game.cover_url ?? null,
        amazon_link: game.amazon_link ?? null,
        bgg_id: game.bgg_id ?? null,
        event_id: game.event_id ?? null,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("❌ Import failed:", error)
    return NextResponse.json({ error: 'Import failed' }, { status: 500 })
  }
}
