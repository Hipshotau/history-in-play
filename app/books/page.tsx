'use client'
import { useState } from 'react'

export default function BookPage() {
  const [recommendation, setRecommendation] = useState<any | null>(null)

  const fetchRecommendation = async () => {
    const res = await fetch('/api/recommend/book')
    const book = await res.json()
    setRecommendation(book)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Books</h1>

      <button onClick={fetchRecommendation} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        Surprise Me
      </button>

      {recommendation && (
        <div className="border p-4 rounded shadow-md bg-gray-100 mb-4">
          <h2 className="text-xl font-semibold">{recommendation.title}</h2>
          <p className="text-sm text-gray-700">by {recommendation.author}</p>
          <p className="mt-2">{recommendation.description}</p>
        </div>
      )}

      {/* Your existing book list rendering goes here */}
    </div>
  )
}
