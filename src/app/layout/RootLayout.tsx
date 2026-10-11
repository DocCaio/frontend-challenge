import { Outlet } from '@tanstack/react-router'
import Footer from './Footer'
import NavBar from './NavBar'

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-kurio-bg text-kurio-cream">
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}