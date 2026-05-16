import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'

export function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { signIn, signUp } = useAuth()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = isSignUp
      ? await signUp(email, password, username)
      : await signIn(email, password)

    setLoading(false)

    if (result.error) {
      setError(result.error.message)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-hull-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl text-holo-400 tracking-widest text-center mb-2">
          HOLOCRON
        </h1>
        <p className="text-durasteel-400 text-center text-sm mb-8">
          {isSignUp ? 'Create your account' : 'Sign in to continue'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-hull-800 border border-hull-600 rounded-lg px-4 py-3 text-durasteel-100 placeholder-durasteel-500 focus:border-holo-500 focus:outline-none transition-colors"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-hull-800 border border-hull-600 rounded-lg px-4 py-3 text-durasteel-100 placeholder-durasteel-500 focus:border-holo-500 focus:outline-none transition-colors"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full bg-hull-800 border border-hull-600 rounded-lg px-4 py-3 text-durasteel-100 placeholder-durasteel-500 focus:border-holo-500 focus:outline-none transition-colors"
          />

          {error && (
            <p className="text-kyber-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-holo-500 hover:bg-holo-400 disabled:opacity-50 text-hull-950 font-semibold py-3 rounded-lg transition-colors tracking-wide"
          >
            {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <button
          onClick={() => { setIsSignUp(!isSignUp); setError('') }}
          className="w-full text-center text-durasteel-400 hover:text-holo-400 text-sm mt-4 transition-colors"
        >
          {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
        </button>
      </div>
    </div>
  )
}
