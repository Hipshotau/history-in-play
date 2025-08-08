// app/layout.tsx
import './globals.css';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'History In Play',
  description: 'Explore historical events through books and board games.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 min-h-screen">
        <header className="bg-blue-900 text-white px-4 py-3 shadow">
          <nav className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="text-xl font-bold">History In Play</Link>
            <ul className="flex flex-wrap gap-4 text-sm">
              <li><Link href="/books">Books</Link></li>
              <li><Link href="/boardgames">Board Games</Link></li>
              <li><Link href="/events">Events</Link></li>
              <li><Link href="/questions">Q&A</Link></li>
              <li><Link href="/playtests">Playtests</Link></li>
              <li><Link href="/forum">Forum</Link></li>
              <li><Link href="/collection">Collection</Link></li>
              <li><Link href="/profile">Profile</Link></li>
              <li><Link href="/admin">Admin</Link></li>
            </ul>
          </nav>
        </header>
        <main className="max-w-6xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
