// app/layout.tsx
import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'History In Play',
  description: 'Explore history through books and board games.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <header className="border-b bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
            <h1 className="text-4xl font-bold text-center w-full">History In Play</h1>
          </div>
          <nav className="max-w-6xl mx-auto px-4 pb-4">
            <ul className="flex flex-wrap justify-center gap-6 text-lg font-medium text-gray-700">
              <li className="relative group">
                <span className="cursor-pointer">Books ▾</span>
                <ul className="absolute hidden group-hover:block bg-white border mt-2 p-2 space-y-1">
                  <li><Link href="/books">All Books</Link></li>
                  <li><Link href="/books?recommended=true">Recommended</Link></li>
                  <li><Link href="/books/events">Search by Event</Link></li>
                </ul>
              </li>
              <li className="relative group">
                <span className="cursor-pointer">Board Games ▾</span>
                <ul className="absolute hidden group-hover:block bg-white border mt-2 p-2 space-y-1">
                  <li><Link href="/boardgames">All Games</Link></li>
                  <li><Link href="/playtests">Playtest Queue</Link></li>
                  <li><Link href="/playtests/upload">Submit Game</Link></li>
                </ul>
              </li>
              <li className="relative group">
                <span className="cursor-pointer">Forum ▾</span>
                <ul className="absolute hidden group-hover:block bg-white border mt-2 p-2 space-y-1">
                  <li><Link href="/forum">All Threads</Link></li>
                  <li><Link href="/questions/ask">Ask a Question</Link></li>
                </ul>
              </li>
              <li className="relative group">
                <span className="cursor-pointer">Admin ▾</span>
                <ul className="absolute hidden group-hover:block bg-white border mt-2 p-2 space-y-1">
                  <li><Link href="/admin/sync">Sync Catalog</Link></li>
                  <li><Link href="/admin/todo">To-Do List</Link></li>
                  <li><Link href="/admin/pending">Pending Games</Link></li>
                </ul>
              </li>
              <li><Link href="/collection">My Collection</Link></li>
              <li><Link href="/profile">Profile</Link></li>
            </ul>
          </nav>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-12">{children}</main>
      </body>
    </html>
  )
}
