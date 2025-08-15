import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const secret = searchParams.get('secret')
  const path = searchParams.get('path')

  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }

  if (!path) {
    return NextResponse.json({ message: 'Missing path' }, { status: 400 })
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  try {
    const res = await fetch(`${baseUrl}/api/revalidate/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ secret }),
    })

    if (!res.ok) {
      const errorText = await res.text()
      return NextResponse.json(
        { message: `Failed to revalidate: ${errorText}` },
        { status: res.status }
      )
    }

    return NextResponse.json({ revalidated: true, path, now: Date.now() })
  } catch (err) {
    console.error('Revalidation error:', err)
    return NextResponse.json({ message: 'Error revalidating', error: String(err) }, { status: 500 })
  }
}
