import { BellRing, MapPinned, ShieldCheck, Wallet2 } from "lucide-react";

const features = [
  {
    icon: Wallet2,
    title: "Ahorro real y transparente",
    desc: "Compará precios actualizados de miles de medicamentos y descubrí cuánto podés ahorrar en cada compra.",
    color: "from-teal-500 to-emerald-500",
  },
  {
    icon: MapPinned,
    title: "Farmacias cerca de vos",
    desc: "Encontrá la farmacia más conveniente según tu ubicación, precio y disponibilidad en tiempo real.",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: BellRing,
    title: "Alertas de precio",
    desc: "Activá notificaciones para enterarte cuando baje el precio de tus medicamentos habituales.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: ShieldCheck,
    title: "Información verificada",
    desc: "Datos revisados constantemente junto a farmacias aliadas para garantizar precios confiables.",
    color: "from-fuchsia-500 to-pink-500",
  },
];

export default function Features() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600">¿Por qué MediCompare?</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Todo lo que necesitás para cuidar tu salud y tu bolsillo
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1.5 hover:shadow-xl hover:shadow-teal-900/10"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${f.color} shadow-lg transition group-hover:scale-110`}
              >
                <f.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
