import { EyeIcon, GoogleIcon, FacebookIcon } from "./icons";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  authMode: "login" | "register";
  setAuthMode: (mode: "login" | "register") => void;
}

export function AuthModal({ isOpen, onClose, authMode, setAuthMode }: AuthModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-[480px] rounded-2xl border border-[#3b271e] bg-[#140c09] p-6 text-[#F5F1EB] shadow-2xl md:p-8">
       
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 text-[#8E7866] transition-colors hover:text-[#D28A4C]"
          aria-label="Fechar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>


        <div className="mb-6 flex items-center justify-center gap-4 text-xl font-medium">
          <button
            type="button"
            onClick={() => setAuthMode("login")}
            className={`transition-colors ${authMode === "login" ? "text-[#D28A4C]" : "text-[#8E7866] hover:text-[#C2B5A5]"}`}
          >
            Entrar
          </button>
          <span className="h-5 w-px bg-[#3b271e]" />
          <button
            type="button"
            onClick={() => setAuthMode("register")}
            className={`transition-colors ${authMode === "register" ? "text-[#D28A4C]" : "text-[#8E7866] hover:text-[#C2B5A5]"}`}
          >
            Criar conta
          </button>
        </div>

  
        <p className="mb-6 text-center text-xs leading-relaxed text-[#9e8875] px-4">
          {authMode === "login"
            ? "Entre para gerenciar sua carteira, coleção e perfil de criador."
            : "Crie seu perfil de colecionador e conecte uma carteira quando quiser."}
        </p>

       
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          {authMode === "register" && (
            <div>
              <input
                type="text"
                placeholder="Nome de usuário"
                className="w-full rounded-xl border border-[#3b271e] bg-[#1c120e] px-4 py-3 text-sm text-[#F5F1EB] placeholder-[#7d6855] focus:border-[#D28A4C] focus:outline-none"
              />
            </div>
          )}

          <div>
            <input
              type="email"
              placeholder={authMode === "login" ? "contato@email.com" : "Digite seu e-mail"}
              className="w-full rounded-xl border border-[#3b271e] bg-[#1c120e] px-4 py-3 text-sm text-[#F5F1EB] placeholder-[#7d6855] focus:border-[#D28A4C] focus:outline-none"
            />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder={authMode === "login" ? "************" : "Senha"}
              className="w-full rounded-xl border border-[#3b271e] bg-[#1c120e] px-4 py-3 pr-10 text-sm text-[#F5F1EB] placeholder-[#7d6855] focus:border-[#D28A4C] focus:outline-none"
            />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7d6855] hover:text-[#D28A4C]">
              <EyeIcon />
            </button>
          </div>

          {authMode === "register" && (
            <div>
              <input
                type="password"
                placeholder="Confirmar senha"
                className="w-full rounded-xl border border-[#3b271e] bg-[#1c120e] px-4 py-3 text-sm text-[#F5F1EB] placeholder-[#7d6855] focus:border-[#D28A4C] focus:outline-none"
              />
            </div>
          )}

          {authMode === "login" && (
            <div className="text-right">
              <a href="#" className="text-xs text-[#D28A4C] transition-colors hover:underline">
                Esqueceu a senha?
              </a>
            </div>
          )}

          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-[#D28A4C] py-3 text-sm font-bold text-[#110A07] transition-all hover:bg-[#c27a3c]"
          >
            {authMode === "login" ? "Entrar" : "Criar conta"}
          </button>
        </form>

        
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#3b271e]" />
          </div>
          <span className="relative bg-[#140c09] px-4 text-xs text-[#8E7866]">
            Ou continue com
          </span>
        </div>

      
        <div className="space-y-3">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#3b271e] bg-[#1c120e] py-3 text-sm font-medium text-[#F5F1EB] transition-colors hover:border-[#D28A4C]"
          >
            <GoogleIcon />
            Continuar com Google
          </button>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#3b271e] bg-[#1c120e] py-3 text-sm font-medium text-[#F5F1EB] transition-colors hover:border-[#D28A4C]"
          >
            <FacebookIcon />
            Continuar com Facebook
          </button>
        </div>
      </div>
    </div>
  );
}