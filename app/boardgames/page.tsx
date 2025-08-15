'use client'
import { useState, useEffect } from 'react'

export default function BoardgamePage() {
  const [recommendation, setRecommendation] = useState<any | null>(null)
  const [boardgames, setBoardgames] = useState<any[]>([])

  const fetchBoardgames = async () => {
    const res = await fetch('/api/boardgames')
    const data = await res.json()
    setBoardgames(data)
  }

  const fetchRecommendation = async () => {
    const res = await fetch('/api/recommend/boardgame')
    const game = await res.json()
    setRecommendation(game)
  }

  useEffect(() => {
    fetchBoardgames()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Board Games</h1>

      <button
        onClick={fetchRecommendation}
        className="bg-green-600 text-white px-4 py-2 rounded mb-6 hover:bg-green-700"
      >
        Surprise Me
      </button>

      {recommendation && (
        <div className="border p-4 rounded shadow-md bg-gray-100 mb-4">
          <h2 className="text-xl font-semibold">{recommendation.title}</h2>
          <p className="text-sm text-gray-700">by {recommendation.designer}</p>
          <p className="mt-2">{recommendation.description}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {boardgames.map((game) => (
          <div key={game.id} className="border p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold">{game.title}</h3>
            <p className="text-sm text-gray-700">by {game.designer}</p>
            <p className="text-sm text-gray-600 italic">Published: {game.year_published}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
