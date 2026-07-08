import { Search, ListChecks, MapPin, Smile } from "lucide-react";

const steps = [
  { icon: Search, title: "Buscá tu medicamento", desc: "Escribí el nombre genérico o comercial del medicamento que necesitás." },
  { icon: ListChecks, title: "Compará precios", desc: "Visualizá todas las farmacias disponibles ordenadas de menor a mayor precio." },
  { icon: MapPin, title: "Elegí la más conveniente", desc: "Filtrá por cercanía, disponibilidad de stock y precio total." },
  { icon: Smile, title: "Ahorrá y comprá tranquilo", desc: "Visitá la farmacia elegida con la certeza de haber tomado la mejor decisión." },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600">Proceso simple</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Cómo funciona MediCompare
          </h2>
        </div>

        <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-9 hidden h-0.5 bg-gradient-to-r from-teal-200 via-teal-400 to-indigo-300 lg:block" />
          {steps.map((s, i) => (
            <div key={s.title} className="relative flex flex-col items-center text-center">
              <div className="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-teal-600 to-indigo-600 text-white shadow-xl shadow-teal-900/20">
                <s.icon className="h-7 w-7" />
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-xs font-extrabold text-slate-900 shadow">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-5 font-display text-base font-bold text-slate-900">{s.title}</h3>
              <p className="mt-2 max-w-[220px] text-sm text-slate-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
