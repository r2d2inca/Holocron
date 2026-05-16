import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { getCharacter, updateCharacter, deleteCharacter } from '@/lib/characterService'
import { CharacterSheet } from '@/components/character/CharacterSheet'

export function CharacterSheetPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [character, setCharacter] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    getCharacter(id).then((data) => {
      setCharacter(data)
      setLoading(false)
    }).catch(() => {
      navigate('/dashboard')
    })
  }, [id])

  async function handleUpdate(updates: Record<string, unknown>) {
    if (!id) return
    const updated = await updateCharacter(id, updates)
    setCharacter(updated)
  }

  async function handleDelete() {
    if (!id) return
    if (!confirm(`Delete ${character?.name}? This cannot be undone.`)) return
    await deleteCharacter(id)
    navigate('/dashboard')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-hull-900 flex items-center justify-center">
        <div className="text-holo-400 font-display tracking-widest animate-pulse">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-hull-900">
      <header className="border-b border-hull-700 bg-hull-800/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/dashboard" className="text-durasteel-400 hover:text-durasteel-100 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-display text-lg text-holo-400 tracking-wider">
            {character?.name}
          </h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {character && (
          <CharacterSheet
            character={character}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  )
}
