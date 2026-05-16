import { Navigate, Outlet } from 'react-router'
import { useAuth } from '@/hooks/useAuth'

export function AuthGuard() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-hull-900 flex items-center justify-center">
        <div className="text-holo-400 font-display tracking-widest animate-pulse">
          HOLOCRON
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
