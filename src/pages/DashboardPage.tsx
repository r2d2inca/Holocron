import { Link } from 'react-router'
import { Plus, ChevronRight } from 'lucide-react'

export function DashboardPage() {
  return (
    <div className="min-h-screen bg-hull-900">
      {/* Header */}
      <header className="border-b border-hull-700 bg-hull-800/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-display text-xl text-holo-400 tracking-widest">
            HOLOCRON
          </Link>
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

        {/* Empty state */}
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
      </main>
    </div>
  )
}
