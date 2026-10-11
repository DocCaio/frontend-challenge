import { Outlet } from '@tanstack/react-router'
import NavBar from './layout/NavBar'

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-kurio-bg text-kurio-cream">
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}