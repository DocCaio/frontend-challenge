const NavBar = () => {
  const linkClass =
    "text-[#f5f1eb] hover:text-[#e89b55] underline-offset-4 hover:underline decoration-[#e89b55] transition-colors";

  const links = ["Início", "Mercado", "Criadores", "Aprenda"];

  return (
    <header className="w-full">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
       
        <a href="/" className={`text-xl font-bold ${linkClass}`}>
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

     
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Buscar"
            className="text-[#f5f1eb] transition-colors hover:text-[#e89b55]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Carrinho"
            className="text-[#f5f1eb] transition-colors hover:text-[#e89b55]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1z" />
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
            </svg>
          </button>

          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-[#d28a4c] px-4 py-2 font-medium text-[#f5f1eb] transition-colors hover:bg-[#e89b55]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
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
            Entrar
          </button>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;