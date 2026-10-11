import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { SearchIcon, CartIcon, LoginIcon, SlidersIcon } from "./icons";
import { AuthModal } from "../../../features/auth/AuthModal";
import CartButton from "./CartButton";

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

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

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
          <button type="button" aria-label="Buscar" className="cursor-pointer text-[#C2B5A5] transition-colors hover:text-[#D28A4C]">
            <SearchIcon />
          </button>
          <CartButton />
          <button
            type="button"
            onClick={() => {
              setAuthMode("login");
              setIsAuthOpen(true);
            }}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#D28A4C] px-4 py-1.5 text-sm font-semibold text-[#110A07] transition-all hover:bg-[#c27a3c]"
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
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-[#D28A4C] text-[#110A07] transition-opacity hover:opacity-90"
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

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        authMode={authMode}
        setAuthMode={setAuthMode}
      />
    </header>
  );
};

export default NavBar;