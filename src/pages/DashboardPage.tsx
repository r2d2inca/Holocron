import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Plus, ChevronRight, LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { getCharacters } from '@/lib/characterService'

interface CharacterRow {
  id: string
  name: string
  race: string
  class_name: string
  current_rank: string
  hp: number
  max_hp: number
  updated_at: string
}

export function DashboardPage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [characters, setCharacters] = useState<CharacterRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCharacters().then((data) => {
      setCharacters(data as CharacterRow[])
      setLoading(false)
    })
  }, [])

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-hull-900">
      {/* Header */}
      <header className="border-b border-hull-700 bg-hull-800/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-display text-xl text-holo-400 tracking-widest">
            HOLOCRON
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-durasteel-400 text-sm">{user?.email}</span>
            <button
              onClick={handleSignOut}
              className="text-durasteel-400 hover:text-kyber-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-display text-durasteel-100 tracking-wider">
            Your Characters
          </h2>
          <Link
            to="/new-character"
            className="flex items-center gap-2 bg-holo-500 hover:bg-holo-400 text-hull-950 font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            New Character
          </Link>
        </div>

        {loading ? (
          <div className="text-durasteel-400 text-center py-12">Loading...</div>
        ) : characters.length === 0 ? (
          <div className="bg-hull-800 border border-hull-600 rounded-lg p-12 text-center">
            <p className="text-durasteel-400 mb-4">
              No characters yet. Begin your journey.
            </p>
            <Link
              to="/new-character"
              className="inline-flex items-center gap-2 text-holo-400 hover:text-holo-300 transition-colors"
            >
              Create your first character
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {characters.map((c) => (
              <Link
                key={c.id}
                to={`/character/${c.id}`}
                className="bg-hull-800 border border-hull-600 rounded-lg p-5 hover:border-holo-500/50 transition-colors block"
              >
                <h3 className="font-display text-lg text-holo-400 tracking-wider mb-3">
                  {c.name}
                </h3>
                <div className="space-y-1 text-sm text-durasteel-300">
                  <p>{c.race} {c.class_name}</p>
                  <p className="text-durasteel-400">Rank: {c.current_rank}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-health">HP</span>
                    <div className="flex-1 bg-hull-700 rounded-full h-2">
                      <div
                        className="bg-kyber-400 h-2 rounded-full transition-all"
                        style={{ width: `${Math.max(0, (c.hp / c.max_hp) * 100)}%` }}
                      />
                    </div>
                    <span className="text-xs text-durasteel-400">{c.hp}/{c.max_hp}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
