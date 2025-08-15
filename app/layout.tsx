import './globals.css'
import Link from 'next/link'
import DarkModeToggle from '@/components/layout/DarkModeToggle'

export const metadata = {
  title: 'History In Play',
  description: 'Explore history through books and board games.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="transition-colors duration-300">
        <header className="sticky top-0 z-50 bg-white dark:bg-black border-b dark:border-yellow-700 shadow-md">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link
              href="/"
              className="text-3xl font-bold glow-gold hover:opacity-90 transition"
            >
              History In Play
            </Link>

            <DarkModeToggle />
          </div>

          <nav className="max-w-6xl mx-auto px-4 pb-2">
            <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base font-medium text-gray-800 dark:text-yellow-300">
              <Dropdown label="Books" links={[
                { href: '/books', text: 'All Books' },
                { href: '/books?recommended=true', text: 'Recommended' },
                { href: '/books/events', text: 'Search by Event' },
              ]} />
              <Dropdown label="Board Games" links={[
                { href: '/boardgames', text: 'All Games' },
                { href: '/playtests', text: 'Playtest Queue' },
                { href: '/playtests/upload', text: 'Submit Game' },
              ]} />
              <Dropdown label="Forum" links={[
                { href: '/forum', text: 'All Threads' },
                { href: '/questions/ask', text: 'Ask a Question' },
              ]} />
              <Dropdown label="Admin" links={[
                { href: '/admin/sync', text: 'Sync Catalog' },
                { href: '/admin/todo', text: 'To-Do List' },
                { href: '/admin/pending', text: 'Pending Games' },
              ]} />
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

function Dropdown({ label, links }: { label: string, links: { href: string, text: string }[] }) {
  return (
    <li className="relative group">
      <span className="cursor-pointer">{label} ▾</span>
      <ul className="absolute left-0 hidden group-hover:block bg-white dark:bg-[#111] border dark:border-[#333] mt-2 p-2 space-y-1 z-50 rounded shadow">
        {links.map(({ href, text }) => (
          <li key={href}>
            <Link href={href} className="block px-2 py-1 hover:bg-gray-100 dark:hover:bg-[#222]">{text}</Link>
          </li>
        ))}
      </ul>
    </li>
  )
}
