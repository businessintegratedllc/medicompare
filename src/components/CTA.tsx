import { ArrowRight, Smartphone } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-600 to-indigo-700 py-20">
      <div className="bg-grid absolute inset-0 opacity-10" />
      <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 text-center sm:px-8 lg:flex-row lg:justify-between lg:text-left">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
            <Smartphone className="h-3.5 w-3.5" /> Disponible para todos
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Empezá a ahorrar en tus medicamentos hoy mismo
          </h2>
          <p className="mt-3 text-teal-50">
            Es gratis, rápido y sin registros complicados. Tu salud y tu bolsillo te lo van a agradecer.
          </p>
        </div>
        <a
          href="#comparador"
          className="group flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-4 font-display text-sm font-extrabold text-teal-700 shadow-2xl shadow-teal-900/30 transition hover:scale-105"
        >
          Comparar precios gratis
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
