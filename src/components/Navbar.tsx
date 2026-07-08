import { useEffect, useState } from "react";
import { Menu, X, MapPin, LogIn } from "lucide-react";
import Logo from "./Logo";

const links = [
  { label: "Comparador", href: "#comparador" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Farmacias aliadas", href: "#farmacias" },
  { label: "Testimonios", href: "#testimonios" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/85 shadow-sm shadow-slate-900/5 backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        <a href="#inicio" className="shrink-0">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-slate-600 transition hover:text-teal-600"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <span className="flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700">
            <MapPin className="h-3.5 w-3.5" /> San José, CR
          </span>
          <button className="flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-700">
            <LogIn className="h-4 w-4" /> Ingresar
          </button>
          <a
            href="#comparador"
            className="rounded-full bg-gradient-to-r from-teal-600 to-emerald-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-teal-600/30 transition hover:shadow-xl hover:shadow-teal-600/40 active:scale-95"
          >
            Comparar ahora
          </a>
        </div>

        <button
          className="rounded-lg p-2 text-slate-700 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-700"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#comparador"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gradient-to-r from-teal-600 to-emerald-500 px-5 py-2.5 text-center text-sm font-bold text-white shadow-md"
            >
              Comparar ahora
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
