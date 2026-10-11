import { useState } from 'react'
import { FaRightFromBracket, FaRightToBracket } from 'react-icons/fa6'
import { AuthModal } from '@/features/auth/AuthModal'
import { useLogout, useSession } from '@/features/auth/hooks'

export default function AccountButton({ className = '' }: { className?: string }) {
  const { data: user } = useSession()
  const logout = useLogout()
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<'login' | 'register'>('login')

  return (
    <>
      {user ? (
        <div className={`flex items-center gap-3 ${className}`}>
          <span className="hidden max-w-[10rem] truncate text-sm text-[#F5F1EB] lg:inline">
            Olá, {user.name.split(' ')[0]}
          </span>
          <button
            type="button"
            onClick={() => logout.mutate()}
            disabled={logout.isPending}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#D28A4C] px-4 py-1.5 text-sm font-semibold text-[#D28A4C] transition-colors hover:bg-[#D28A4C] hover:text-[#110A07] disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F1EB]"
          >
            <FaRightFromBracket aria-hidden="true" />
            Sair
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => {
            setMode('login')
            setOpen(true)
          }}
          className={`flex cursor-pointer items-center gap-2 rounded-lg bg-[#D28A4C] px-4 py-1.5 text-sm font-semibold text-[#110A07] transition-all hover:bg-[#c27a3c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F1EB] ${className}`}
        >
          <FaRightToBracket aria-hidden="true" />
          Entrar
        </button>
      )}


      <AuthModal
        isOpen={open && !user}
        onClose={() => setOpen(false)}
        authMode={mode}
        setAuthMode={setMode}
      />
    </>
  )
}