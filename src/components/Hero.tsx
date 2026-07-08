import { useMemo, useState } from "react";
import { Search, ShieldCheck, Sparkles, TrendingDown } from "lucide-react";
import { medicines } from "../data/medicines";

export default function Hero({ onSearch }: { onSearch: (term: string) => void }) {
  const [term, setTerm] = useState("");
  const [focused, setFocused] = useState(false);

  const suggestions = useMemo(() => {
    if (!term.trim()) return [];
    return medicines
      .filter((m) => m.nombre.toLowerCase().includes(term.toLowerCase()))
      .slice(0, 5);
  }, [term]);

  const handleGo = (value?: string) => {
    const q = value ?? term;
    onSearch(q);
    setFocused(false);
    document.getElementById("comparador")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-b from-teal-50 via-white to-white pt-32 pb-24 sm:pt-40">
      <div className="bg-grid absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_40%,transparent_100%)]" />
      <div className="absolute -left-24 top-20 -z-10 h-72 w-72 animate-float-slow rounded-full bg-teal-200/50 blur-3xl" />
      <div className="absolute -right-16 top-48 -z-10 h-80 w-80 animate-float rounded-full bg-indigo-200/50 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-teal-700">
              <Sparkles className="h-3.5 w-3.5" /> Ahorra hasta un 35% en tus medicamentos
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              La herramienta esencial para la{" "}
              <span className="bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
                salud de tu familia
              </span>{" "}
              en Costa Rica
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600">
              Compará precios de medicamentos en las principales farmacias del país en segundos,
              encontrá la opción más cercana y económica, y tomá decisiones informadas para tu bolsillo.
            </p>

            <div className="relative mt-8 max-w-lg">
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/5">
                <Search className="ml-2 h-5 w-5 shrink-0 text-slate-400" />
                <input
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onKeyDown={(e) => e.key === "Enter" && handleGo()}
                  placeholder="Buscá un medicamento, ej. Ibuprofeno..."
                  className="w-full bg-transparent py-2 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
                />
                <button
                  onClick={() => handleGo()}
                  className="shrink-0 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-md shadow-teal-600/30 transition hover:shadow-lg active:scale-95"
                >
                  Comparar
                </button>
              </div>

              {focused && suggestions.length > 0 && (
                <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-2xl shadow-slate-900/10">
                  {suggestions.map((s) => (
                    <button
                      key={s.id}
                      onMouseDown={() => handleGo(s.nombre)}
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm hover:bg-teal-50"
                    >
                      <span className="font-semibold text-slate-700">{s.nombre}</span>
                      <span className="text-xs text-slate-400">{s.categoria}</span>
                    </button>
                  ))}
                </div>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                {["Acetaminofén", "Ibuprofeno", "Omeprazol", "Losartán"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleGo(tag)}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 transition hover:bg-teal-100 hover:text-teal-700"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-8">
              {[
                { icon: TrendingDown, value: "35%", label: "Ahorro promedio" },
                { icon: ShieldCheck, value: "+120", label: "Farmacias afiliadas" },
                { icon: Sparkles, value: "48k+", label: "Usuarios activos" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-md shadow-slate-900/5">
                    <s.icon className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-display text-xl font-extrabold text-slate-900">{s.value}</p>
                    <p className="text-xs font-medium text-slate-500">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative mx-auto w-full max-w-md animate-float rounded-[2rem] border border-white/60 bg-white/70 p-6 shadow-2xl shadow-teal-900/10 backdrop-blur">
              <div className="flex items-center justify-between">
                <p className="font-display font-bold text-slate-800">Ibuprofeno 400mg</p>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                  -19% hoy
                </span>
              </div>
              <div className="mt-5 space-y-3">
                {[
                  { name: "Farmacias Vitalis", price: "₡1,890", best: true },
                  { name: "Farmacia Sucre", price: "₡1,980", best: false },
                  { name: "Farmacia Fischel", price: "₡2,100", best: false },
                ].map((p) => (
                  <div
                    key={p.name}
                    className={`flex items-center justify-between rounded-xl border p-3 ${
                      p.best ? "border-teal-300 bg-teal-50" : "border-slate-100 bg-slate-50"
                    }`}
                  >
                    <span className="text-sm font-semibold text-slate-700">{p.name}</span>
                    <span className={`font-display text-sm font-extrabold ${p.best ? "text-teal-700" : "text-slate-500"}`}>
                      {p.price}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-xl bg-gradient-to-r from-teal-600 to-indigo-600 p-4 text-center text-sm font-bold text-white shadow-lg shadow-teal-700/30">
                Ahorrás ₡210 comprando en Farmacias Vitalis
              </div>
            </div>
            <div className="absolute -bottom-6 -left-8 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-slate-900/10 animate-pulse-ring">
              <ShieldCheck className="h-5 w-5 text-teal-600" />
              <p className="text-xs font-bold text-slate-700">Precios verificados hoy</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
