'use client'

import { useState } from 'react'

export default function SyncCatalogPage() {
  const [json, setJson] = useState('')
  const [message, setMessage] = useState('')

  async function handleImport() {
    try {
      const res = await fetch('/admin/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: json,
      })
      const data = await res.json()
      if (res.ok) {
        setMessage(`Imported: ${JSON.stringify(data.imported)}`)
        await fetch('/api/revalidate?path=/books')
        await fetch('/api/revalidate?path=/boardgames')
        await fetch('/api/revalidate?path=/events')
      } else {
        setMessage(`Error: ${data.error}`)
      }
    } catch (e) {
      setMessage(`Error: ${e}`)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Import Catalog</h1>
      <textarea
        value={json}
        onChange={(e) => setJson(e.target.value)}
        placeholder='Paste JSON here'
        className="w-full h-64 p-2 border rounded font-mono text-sm"
      />
      <button
        onClick={handleImport}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Import
      </button>
      {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
    </div>
  )
}
