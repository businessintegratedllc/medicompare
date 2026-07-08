import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";

const socialIcons = [
  {
    name: "Facebook",
    path: "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.17 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.77 8.44-4.94 8.44-9.94z",
  },
  {
    name: "Instagram",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.56a5.9 5.9 0 0 0-2.14 1.4A5.9 5.9 0 0 0 .6 4.17c-.3.76-.5 1.63-.56 2.91C.01 8.36 0 8.77 0 12s.01 3.64.07 4.92c.06 1.28.26 2.15.56 2.91.31.79.72 1.47 1.4 2.14a5.9 5.9 0 0 0 2.14 1.4c.76.3 1.63.5 2.91.56 1.28.06 1.69.07 4.92.07s3.64-.01 4.92-.07c1.28-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.14-1.4 5.9 5.9 0 0 0 1.4-2.14c.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.92s-.01-3.64-.07-4.92c-.06-1.28-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.4-2.14A5.9 5.9 0 0 0 19.83.63c-.76-.3-1.63-.5-2.91-.56C15.64.01 15.23 0 12 0z M12 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM18.41 4.15a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z",
  },
  {
    name: "X",
    path: "M18.24 2H21l-6.5 7.43L22.2 22h-6.66l-5.2-6.8L4.35 22H1.58l6.95-7.94L1.9 2h6.83l4.7 6.22L18.24 2zm-1.17 18h1.85L7.02 4H5.03l12.04 16z",
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 pt-16 text-slate-400">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="dark" />
            <p className="mt-4 text-sm leading-relaxed">
              La herramienta esencial para la salud de tu familia en Costa Rica. Compará precios de
              medicamentos y ahorrá en cada compra.
            </p>
            <div className="mt-5 flex gap-3">
              {socialIcons.map((icon) => (
                <a
                  key={icon.name}
                  href="#"
                  aria-label={icon.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 transition hover:bg-teal-600 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d={icon.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold text-white">Navegación</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#comparador" className="hover:text-teal-400">Comparador</a></li>
              <li><a href="#como-funciona" className="hover:text-teal-400">Cómo funciona</a></li>
              <li><a href="#farmacias" className="hover:text-teal-400">Farmacias aliadas</a></li>
              <li><a href="#testimonios" className="hover:text-teal-400">Testimonios</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold text-white">Legal</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="hover:text-teal-400">Términos y condiciones</a></li>
              <li><a href="#" className="hover:text-teal-400">Política de privacidad</a></li>
              <li><a href="#" className="hover:text-teal-400">Sobre nosotros</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold text-white">Contacto</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-teal-500" /> San José, Costa Rica</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-teal-500" /> hola@medicompare.cr</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-teal-500" /> +506 8888-0000</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} MediCompare Costa Rica. Todos los derechos reservados.</p>
          <p>
            Diseñado por <span className="font-semibold text-teal-400">Randall Castro Arias</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
