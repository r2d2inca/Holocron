import { Link } from 'react-router'
import { Swords, Users, BookOpen, Zap } from 'lucide-react'

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Hero */}
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-holo-400 mb-2 tracking-widest">
          HOLOCRON
        </h1>
        <p className="text-durasteel-300 text-lg mb-1 font-light tracking-wide">
          Remnants Companion App
        </p>
        <div className="w-24 h-px bg-holo-500/40 mx-auto my-6" />
        <p className="text-durasteel-200 mb-10 leading-relaxed">
          Your digital companion for the Remnants tabletop RPG.
          Create characters, track abilities, and explore the galaxy.
        </p>

        <div className="flex gap-4 justify-center mb-16">
          <Link
            to="/new-character"
            className="bg-holo-500 hover:bg-holo-400 text-hull-950 font-semibold px-6 py-3 rounded-lg transition-colors tracking-wide"
          >
            Create Character
          </Link>
          <Link
            to="/dashboard"
            className="border border-durasteel-500 hover:border-holo-500 text-durasteel-100 px-6 py-3 rounded-lg transition-colors tracking-wide"
          >
            Dashboard
          </Link>
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl w-full">
        {[
          { icon: Users, label: '49+ Races', desc: 'Organics & Droids' },
          { icon: Swords, label: '11 Classes', desc: 'Branching rank trees' },
          { icon: Zap, label: 'Force Powers', desc: '40+ abilities' },
          { icon: BookOpen, label: '8 Saber Forms', desc: '5 ranks each' },
        ].map(({ icon: Icon, label, desc }) => (
          <div
            key={label}
            className="bg-hull-800 border border-hull-600 rounded-lg p-5 text-center"
          >
            <Icon className="w-8 h-8 text-holo-400 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-durasteel-100 tracking-wider">
              {label}
            </h3>
            <p className="text-xs text-durasteel-400 mt-1">{desc}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <p className="text-durasteel-500 text-xs mt-16 tracking-wider">
        A long time ago in a galaxy far, far away...
      </p>
    </div>
  )
}
