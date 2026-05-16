import { Plus, Minus } from 'lucide-react'

interface ClassResourcesProps {
  character: any
  onUpdate: (updates: Record<string, unknown>) => void
}

export function ClassResources({ character, onUpdate }: ClassResourcesProps) {
  const className = character.class_name

  // Only render for classes with special resources
  if (className === 'Scoundrel') {
    return <ConnectionsTracker character={character} onUpdate={onUpdate} />
  }
  if (className === 'Bounty Hunter') {
    return <ReputationTracker character={character} onUpdate={onUpdate} />
  }
  if (className === 'Senator') {
    return <InfluenceTracker character={character} onUpdate={onUpdate} />
  }

  return null
}

function ConnectionsTracker({ character, onUpdate }: { character: any; onUpdate: (u: Record<string, unknown>) => void }) {
  const connections: string[] = character.connections ?? []

  function addConnection() {
    const name = prompt('Connection name:')
    if (!name?.trim()) return
    onUpdate({ connections: [...connections, name.trim()] })
  }

  function removeConnection(index: number) {
    onUpdate({ connections: connections.filter((_, i) => i !== index) })
  }

  return (
    <div className="bg-hull-800 border border-hull-600 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs text-durasteel-400 uppercase tracking-wider">Connections</h3>
        <button onClick={addConnection} className="text-durasteel-500 hover:text-holo-400 transition-colors cursor-pointer">
          <Plus size={14} />
        </button>
      </div>
      {connections.length > 0 ? (
        <div className="space-y-1">
          {connections.map((conn, i) => (
            <div key={i} className="flex items-center justify-between bg-hull-700 rounded p-2 group">
              <span className="text-sm text-durasteel-200">{conn}</span>
              <button
                onClick={() => removeConnection(i)}
                className="text-durasteel-500 hover:text-kyber-400 opacity-0 group-hover:opacity-100 transition-all cursor-pointer text-xs"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-durasteel-500 text-sm">No connections established</p>
      )}
    </div>
  )
}

function ReputationTracker({ character, onUpdate }: { character: any; onUpdate: (u: Record<string, unknown>) => void }) {
  const rep = character.reputation_level ?? 0

  return (
    <div className="bg-hull-800 border border-hull-600 rounded-lg p-4">
      <h3 className="text-xs text-durasteel-400 uppercase tracking-wider mb-3">Reputation Level</h3>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onUpdate({ reputation_level: Math.max(0, rep - 1) })}
          disabled={rep <= 0}
          className="bg-hull-700 hover:bg-hull-600 disabled:opacity-40 disabled:cursor-not-allowed text-durasteel-200 p-1.5 rounded transition-colors cursor-pointer"
        >
          <Minus size={14} />
        </button>
        <div className="text-center">
          <div className="font-mono text-2xl text-aurodium-400">{rep}</div>
          <div className="text-xs text-durasteel-500">
            {rep <= 2 ? 'Unknown' : rep <= 5 ? 'Known' : rep <= 8 ? 'Feared' : 'Legendary'}
          </div>
        </div>
        <button
          onClick={() => onUpdate({ reputation_level: rep + 1 })}
          className="bg-hull-700 hover:bg-hull-600 text-durasteel-200 p-1.5 rounded transition-colors cursor-pointer"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  )
}

function InfluenceTracker({ character, onUpdate }: { character: any; onUpdate: (u: Record<string, unknown>) => void }) {
  const tokens = character.influence_tokens ?? 0

  return (
    <div className="bg-hull-800 border border-hull-600 rounded-lg p-4">
      <h3 className="text-xs text-durasteel-400 uppercase tracking-wider mb-3">Influence Tokens</h3>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onUpdate({ influence_tokens: Math.max(0, tokens - 1) })}
          disabled={tokens <= 0}
          className="bg-hull-700 hover:bg-hull-600 disabled:opacity-40 disabled:cursor-not-allowed text-durasteel-200 p-1.5 rounded transition-colors cursor-pointer"
        >
          <Minus size={14} />
        </button>
        <div className="flex gap-1 flex-wrap">
          {Array.from({ length: tokens }).map((_, i) => (
            <div key={i} className="w-6 h-6 rounded-full bg-aurodium-500/30 border border-aurodium-500" />
          ))}
          {tokens === 0 && <span className="text-durasteel-500 text-sm">None</span>}
        </div>
        <button
          onClick={() => onUpdate({ influence_tokens: tokens + 1 })}
          className="bg-hull-700 hover:bg-hull-600 text-durasteel-200 p-1.5 rounded transition-colors cursor-pointer"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  )
}
