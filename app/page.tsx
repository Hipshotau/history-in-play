import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-12 bg-black text-yellow-300 px-4 py-8 rounded">
      <section className="text-center">
        <h1 className="text-5xl md:text-6xl font-bold glow-text mb-2">History In Play</h1>
        <p className="text-lg text-yellow-200">Discover the past through curated books, wargames, and historical events.</p>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6">Explore</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card href="/books" title="Books" desc="Curated reading by historical period." />
          <Card href="/boardgames" title="Board Games" desc="Playthroughs of past conflicts." />
          <Card href="/events" title="Events" desc="Battles, wars, and historical moments." />
          <Card href="/playtests" title="Playtests" desc="Try new wargames and give feedback." />
          <Card href="/forum" title="Forum" desc="Discuss strategies, timelines, and systems." />
          <Card href="/collection" title="Your Collection" desc="Import or track your BGG games." />
        </div>
      </section>

      <section className="mt-16 text-center">
        <h2 className="text-3xl font-bold text-yellow-300 mb-4">Get Recommendations</h2>
        <p className="text-lg text-yellow-200 mb-8">Not sure where to start? Let us guide you.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
          <a href="/recommend/book" className="bg-[#111] border border-yellow-500 rounded-lg p-6 w-full max-w-sm hover:bg-yellow-900/30 transition">
            <h3 className="text-2xl text-yellow-200 mb-2">📚 By Book</h3>
            <p className="text-yellow-100">Find board games that pair well with your favorite historical reads.</p>
          </a>
          <a href="/recommend/boardgame" className="bg-[#111] border border-yellow-500 rounded-lg p-6 w-full max-w-sm hover:bg-yellow-900/30 transition">
            <h3 className="text-2xl text-yellow-200 mb-2">🎲 By Board Game</h3>
            <p className="text-yellow-100">Discover books or events that inspired the game you love.</p>
          </a>
          <a href="/recommend/event" className="bg-[#111] border border-yellow-500 rounded-lg p-6 w-full max-w-sm hover:bg-yellow-900/30 transition">
            <h3 className="text-2xl text-yellow-200 mb-2">🏛️ By Event</h3>
            <p className="text-yellow-100">Explore content tied to battles, wars, and turning points.</p>
          </a>
        </div>
      </section>
    </div>
  );
}

function Card({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <Link
      href={href}
      className="block bg-[#111] border border-yellow-600 rounded-lg shadow hover:bg-yellow-800/20 transition p-6"
    >
      <h3 className="text-xl font-semibold text-yellow-200 mb-1">{title}</h3>
      <p className="text-yellow-100 text-sm">{desc}</p>
    </Link>
  );
}
