import { useEffect, useMemo, useState } from "react";
import { Search, MapPin, BadgeCheck, ArrowUpDown, PackageX, Star } from "lucide-react";
import { medicines, categorias } from "../data/medicines";

const stockStyles: Record<string, string> = {
  Disponible: "bg-emerald-50 text-emerald-700",
  "Últimas unidades": "bg-amber-50 text-amber-700",
  Agotado: "bg-rose-50 text-rose-700",
};

export default function Comparador({ initialTerm }: { initialTerm: string }) {
  const [query, setQuery] = useState(initialTerm);
  const [categoria, setCategoria] = useState("Todos");
  const [selected, setSelected] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    if (initialTerm) {
      setQuery(initialTerm);
      setSelected(null);
    }
  }, [initialTerm]);

  const filtered = useMemo(() => {
    return medicines.filter((m) => {
      const matchQuery = m.nombre.toLowerCase().includes(query.toLowerCase());
      const matchCat = categoria === "Todos" || m.categoria === categoria;
      return matchQuery && matchCat;
    });
  }, [query, categoria]);

  const activeMedicine = useMemo(() => {
    const med = filtered.find((m) => m.id === selected) ?? filtered[0] ?? null;
    return med;
  }, [filtered, selected]);

  const sortedPrices = useMemo(() => {
    if (!activeMedicine) return [];
    const list = [...activeMedicine.precios];
    list.sort((a, b) => (sortAsc ? a.precio - b.precio : b.precio - a.precio));
    return list;
  }, [activeMedicine, sortAsc]);

  const bestPrice = sortedPrices.length ? Math.min(...sortedPrices.map((p) => p.precio)) : 0;
  const worstPrice = sortedPrices.length ? Math.max(...sortedPrices.map((p) => p.precio)) : 0;

  return (
    <section id="comparador" className="relative bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600">Comparador en vivo</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Encontrá el mejor precio en segundos
          </h2>
          <p className="mt-3 text-slate-600">
            Escribí el nombre del medicamento y compará al instante entre las farmacias más importantes de Costa Rica.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
          <div className="flex w-full items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 sm:max-w-sm">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar medicamento..."
              className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600 outline-none"
          >
            {categorias.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[320px_1fr]">
          {/* List */}
          <div className="space-y-3">
            {filtered.length === 0 && (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-200 p-8 text-center">
                <PackageX className="h-8 w-8 text-slate-300" />
                <p className="text-sm font-semibold text-slate-500">No encontramos ese medicamento.</p>
              </div>
            )}
            {filtered.map((m) => {
              const isActive = activeMedicine?.id === m.id;
              const min = Math.min(...m.precios.map((p) => p.precio));
              return (
                <button
                  key={m.id}
                  onClick={() => setSelected(m.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    isActive
                      ? "border-teal-400 bg-teal-50 shadow-md shadow-teal-900/5"
                      : "border-slate-100 bg-white hover:border-teal-200 hover:bg-teal-50/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-display text-sm font-bold text-slate-800">{m.nombre}</p>
                    {isActive && <BadgeCheck className="h-4 w-4 text-teal-600" />}
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{m.presentacion}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                      {m.categoria}
                    </span>
                    <span className="font-display text-sm font-extrabold text-teal-700">
                      desde ₡{min.toLocaleString("es-CR")}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Results */}
          <div>
            {activeMedicine ? (
              <div className="rounded-3xl border border-slate-100 bg-gradient-to-b from-white to-slate-50 p-6 shadow-lg shadow-slate-900/5 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-extrabold text-slate-900">{activeMedicine.nombre}</h3>
                    <p className="text-sm text-slate-500">{activeMedicine.presentacion}</p>
                  </div>
                  <button
                    onClick={() => setSortAsc((v) => !v)}
                    className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 hover:border-teal-300 hover:text-teal-700"
                  >
                    <ArrowUpDown className="h-3.5 w-3.5" />
                    {sortAsc ? "Menor a mayor" : "Mayor a menor"}
                  </button>
                </div>

                <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  <Star className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                  Podés ahorrar hasta ₡{(worstPrice - bestPrice).toLocaleString("es-CR")} eligiendo bien
                </div>

                <div className="mt-6 space-y-3">
                  {sortedPrices.map((p) => {
                    const isBest = p.precio === bestPrice && sortAsc;
                    return (
                      <div
                        key={p.farmacia}
                        className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-4 transition hover:shadow-md"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-11 w-11 items-center justify-center rounded-xl text-sm font-extrabold text-white"
                            style={{ backgroundColor: p.logoColor }}
                          >
                            {p.farmacia.charAt(0)}
                          </div>
                          <div>
                            <p className="flex items-center gap-2 text-sm font-bold text-slate-800">
                              {p.farmacia}
                              {isBest && (
                                <span className="rounded-full bg-teal-600 px-2 py-0.5 text-[10px] font-extrabold text-white">
                                  MEJOR PRECIO
                                </span>
                              )}
                            </p>
                            <p className="flex items-center gap-1 text-xs text-slate-500">
                              <MapPin className="h-3 w-3" /> {p.distancia}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${stockStyles[p.stock]}`}>
                            {p.stock}
                          </span>
                          <p
                            className={`font-display text-lg font-extrabold ${
                              isBest ? "text-teal-700" : "text-slate-700"
                            }`}
                          >
                            ₡{p.precio.toLocaleString("es-CR")}
                          </p>
                          <button
                            disabled={p.stock === "Agotado"}
                            className="rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                          >
                            Ver farmacia
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center rounded-3xl border border-dashed border-slate-200 p-10 text-center text-sm font-semibold text-slate-400">
                Seleccioná un medicamento para ver la comparación.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
