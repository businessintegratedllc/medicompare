const pharmacies = [
  { name: "Farmacia Fischel", color: "#0d9488" },
  { name: "Farmacia Sucre", color: "#6366f1" },
  { name: "La Bomba", color: "#f59e0b" },
  { name: "Farmacias Vitalis", color: "#ec4899" },
  { name: "Farmacia La Económica", color: "#0ea5e9" },
  { name: "Farmacia San Pablo", color: "#84cc16" },
];

export default function Pharmacies() {
  return (
    <section id="farmacias" className="border-y border-slate-100 bg-slate-50/60 py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400">
          Farmacias aliadas en todo Costa Rica
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {pharmacies.map((p) => (
            <div
              key={p.name}
              className="flex items-center justify-center gap-2 rounded-2xl border border-slate-100 bg-white px-4 py-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-extrabold text-white"
                style={{ backgroundColor: p.color }}
              >
                {p.name.charAt(0)}
              </span>
              <span className="text-xs font-bold text-slate-600 sm:text-sm">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
