import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "María José Alvarado",
    role: "Madre de familia, Heredia",
    text: "Con MediCompare ahorré más de ₡15,000 en un mes solo comparando las medicinas de mis hijos. ¡Es súper fácil de usar!",
  },
  {
    name: "Carlos Rodríguez",
    role: "Paciente crónico, San José",
    text: "Tomo medicamentos todos los meses y esta herramienta me ayudó a encontrar la farmacia más barata cerca de mi casa.",
  },
  {
    name: "Ana Lucía Solano",
    role: "Cuidadora, Cartago",
    text: "Me encanta que muestre la disponibilidad en tiempo real, ya no pierdo tiempo llamando a varias farmacias.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonios" className="bg-gradient-to-b from-white to-teal-50/60 py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600">Testimonios</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Familias costarricenses ya están ahorrando
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="relative rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition hover:shadow-lg">
              <Quote className="h-8 w-8 text-teal-100" />
              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">“{t.text}”</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-indigo-500 text-sm font-bold text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
