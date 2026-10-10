import { useState } from "react";

const links = ["Início", "Mercado", "Criadores", "Aprenda"];

const linkClass =
  "text-[#f5f1eb] hover:text-[#e89b55] underline-offset-4 hover:underline decoration-[#e89b55] transition-colors";

const SearchIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="currentColor"
    viewBox="0 0 16 16"
    aria-hidden="true"
  >
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
  </svg>
);

const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="currentColor"
    viewBox="0 0 16 16"
    aria-hidden="true"
  >
    <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1z" />
    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
  </svg>
);

const LoginIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"
    />
    <path
      fillRule="evenodd"
      d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
    />
  </svg>
);

const SlidersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z"
    />
  </svg>
);

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative w-full">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 md:px-6">
        
        <a href="/" className={`hidden text-xl font-bold md:inline-block ${linkClass}`}>
          Kurio
        </a>

    
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((label) => (
            <li key={label}>
              <a href="#" className={linkClass}>
                {label}
              </a>
            </li>
          ))}
        </ul>

    
        <div className="hidden items-center gap-4 md:flex">
          <button
            type="button"
            aria-label="Buscar"
            className="cursor-pointer text-[#f5f1eb] transition-colors hover:text-[#e89b55]"
          >
            <SearchIcon />
          </button>

          <button
            type="button"
            aria-label="Carrinho"
            className="cursor-pointer text-[#f5f1eb] transition-colors hover:text-[#e89b55]"
          >
            <CartIcon />
          </button>

          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#d28a4c] px-4 py-2 font-medium text-[#f5f1eb] transition-colors hover:bg-[#e89b55]"
          >
            <LoginIcon />
            Entrar
          </button>
        </div>

      
        <div className="flex w-full items-center justify-between gap-3 md:hidden">
          <label className="flex w-full max-w-xs items-center gap-2 rounded-lg bg-[#241612] px-3 py-2 text-[#B39463] focus-within:ring-1 focus-within:ring-[#B39463]">
            <SearchIcon size={16} />
            <input
              type="text"
              placeholder="Explorar coleções"
              aria-label="Explorar coleções"
              className="w-full bg-transparent text-sm text-[#B39463] placeholder:text-[#B39463] focus:outline-none"
            />
          </label>

          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((prev) => !prev)}
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-[#D28A4C] text-[#140D0A] transition-opacity hover:opacity-90"
          >
            <SlidersIcon />
          </button>
        </div>
      </nav>

    
      {open && (
        <div
          id="mobile-menu"
          className="absolute left-0 right-0 top-full z-50 border-t border-[#B39463]/20 bg-[#140D0A] px-6 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-4">
            {links.map((label) => (
              <li key={label}>
                <a
                  href="#"
                  className={`block ${linkClass}`}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center gap-3">
            <button
              type="button"
              aria-label="Carrinho"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-[#241612] text-[#f5f1eb] transition-colors hover:text-[#e89b55]"
            >
              <CartIcon />
            </button>

            <button
              type="button"
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#d28a4c] px-4 py-2 font-medium text-[#f5f1eb] transition-colors hover:bg-[#e89b55]"
            >
              <LoginIcon />
              Entrar
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;