import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { books, boardgames, events } from '@/lib/schema'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const revalidateSecret = process.env.REVALIDATE_SECRET

    const imported = {
      books: 0,
      boardgames: 0,
      events: 0,
    }

    // Insert events
    if (body.events?.length) {
      await db.insert(events).values(body.events)
      imported.events = body.events.length
    }

    // Insert books
    if (body.books?.length) {
      await db.insert(books).values(body.books)
      imported.books = body.books.length
    }

    // Insert boardgames
    if (body.boardgames?.length) {
      await db.insert(boardgames).values(body.boardgames)
      imported.boardgames = body.boardgames.length
    }

    // Trigger ISR revalidation
    if (revalidateSecret) {
      await Promise.all([
        fetch(`http://localhost:3000/api/revalidate?secret=${revalidateSecret}&path=/books`),
        fetch(`http://localhost:3000/api/revalidate?secret=${revalidateSecret}&path=/boardgames`),
        fetch(`http://localhost:3000/api/revalidate?secret=${revalidateSecret}&path=/events`),
      ])
    }

    return Response.json({ success: true, imported })
  } catch (e) {
    console.error('Import error:', e)
    return Response.json(
      { error: 'Failed to import data', details: String(e) },
      { status: 500 }
    )
  }
}
