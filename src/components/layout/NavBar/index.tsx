import { useState } from "react";
import { Link } from "@tanstack/react-router";

interface NavItem {
  label: string;
  href: string;
  to?: "/";
}

const links: NavItem[] = [
  { label: "Início", href: "/", to: "/" },
  { label: "Mercado", href: "#" },
  { label: "Criadores", href: "#" },
  { label: "Aprenda", href: "#" },
];

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
  <div className="relative inline-flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="currentColor"
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
    </svg>
    <span className="absolute -top-1 -right-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#d28a4c] text-[9px] font-bold text-black">
      0
    </span>
  </div>
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
    <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
    <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
  </svg>
);

const SlidersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="currentColor"
    viewBox="0 0 16 16"
    aria-hidden="true"
  >
    <path fillRule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z" />
  </svg>
);


function NavAnchor({
  item,
  className,
  onClick,
}: {
  item: NavItem;
  className: string;
  onClick?: () => void;
}) {
  if (item.to) {
    return (
      <Link to={item.to} className={className} onClick={onClick}>
        {item.label}
      </Link>
    );
  }
  return (
    <a href={item.href} className={className} onClick={onClick}>
      {item.label}
    </a>
  );
}

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [activeLabel, setActiveLabel] = useState("Início");

  const handleSelect = (label: string) => {
    setActiveLabel(label);
    setOpen(false);
  };

  return (
    <header className="relative w-full border-b border-[#291B15] bg-kurio-bg">
      <nav className="page-container flex items-stretch justify-between md:py-0">
        <Link
          to="/"
          className="hidden items-center text-sm font-bold tracking-widest uppercase text-[#F5F1EB] md:flex"
          onClick={() => setActiveLabel("Início")}
        >
          KURIO
        </Link>

        
        <ul className="hidden items-stretch gap-8 md:flex">
          {links.map((item) => {
            const isActive = item.label === activeLabel;
            return (
              <li key={item.label} className="relative flex items-center py-4">
                <NavAnchor
                  item={item}
                  onClick={() => handleSelect(item.label)}
                  className={`text-sm tracking-wide transition-colors ${
                    isActive
                      ? "font-semibold text-[#D28A4C]"
                      : "text-[#C2B5A5] hover:text-[#D28A4C]"
                  }`}
                />
                <span
                  className={`absolute -bottom-px left-0 h-0.5 w-full rounded-full bg-[#D28A4C] transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-6 md:flex">
          <button type="button" aria-label="Buscar" className="text-[#C2B5A5] transition-colors hover:text-[#D28A4C]">
            <SearchIcon />
          </button>
          <button type="button" aria-label="Carrinho" className="text-[#C2B5A5] transition-colors hover:text-[#D28A4C]">
            <CartIcon />
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-[#D28A4C] px-4 py-1.5 text-sm font-semibold text-[#110A07] transition-all hover:bg-[#c27a3c]"
          >
            <LoginIcon />
            Entrar
          </button>
        </div>

        <div className="flex w-full items-center justify-between gap-3 py-4 md:hidden">
          <div className="flex flex-1 items-center gap-2 rounded-xl bg-[#1C120E] px-3 py-2.5 text-[#8E7866]">
            <SearchIcon size={16} />
            <input
              type="text"
              placeholder="Explorar coleções"
              aria-label="Explorar coleções"
              className="w-full bg-transparent text-xs text-[#F5F1EB] placeholder-[#8E7866] focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Filtros e menu"
            aria-expanded={open}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D28A4C] text-[#110A07] transition-opacity hover:opacity-90"
          >
            <SlidersIcon />
          </button>
        </div>
      </nav>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 border-t border-[#291B15] bg-kurio-bg px-6 py-6 md:hidden">
          <ul className="flex flex-col gap-4">
            {links.map((item) => (
              <li key={item.label}>
                <NavAnchor
                  item={item}
                  onClick={() => handleSelect(item.label)}
                  className={`block text-base transition-colors ${
                    item.label === activeLabel
                      ? "font-bold text-[#D28A4C]"
                      : "text-[#C2B5A5] hover:text-[#D28A4C]"
                  }`}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default NavBar;