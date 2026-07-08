import React, { useState, useEffect } from 'react';
import { Search, Store, ChevronRight, AlertCircle, Globe } from 'lucide-react';

interface PharmacyPrice {
  pharmacy: string;
  price: number;
}

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  prices: PharmacyPrice[];
}

const App: React.FC = () => {
  const [db, setDb] = useState<Product[]>([]);
  const [filteredDb, setFilteredDb] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activePharms, setActivePharms] = useState(['Fischel', 'FarmaValue', 'La Bomba', 'Sucre']);
  const [loading, setLoading] = useState(true);

  const defaultData: Product[] = [
    { id: 1, name: "Panadol Extra 500mg", category: "Analgésicos", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200", prices: [{pharmacy: "Fischel", price: 3250}, {pharmacy: "FarmaValue", price: 2850}, {pharmacy: "La Bomba", price: 2900}, {pharmacy: "Sucre", price: 3150}] },
    { id: 2, name: "Ozempic 1mg Pluma", category: "Diabetes", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200", prices: [{pharmacy: "FarmaValue", price: 62450}, {pharmacy: "La Bomba", price: 63000}] }
  ];

  const getSearchUrl = (pharmacy: string, productName: string) => {
    const q = encodeURIComponent(productName.split(' ')[0].replace(/[^a-zA-Z]/g, ''));
    if (pharmacy === "Fischel") return `https://fischelenlinea.com/busqueda?f=${q}`;
    if (pharmacy === "FarmaValue") return `https://www.farmavalue.com/cr/products?q=${q}`;
    if (pharmacy === "La Bomba") return `https://www.farmacialabomba.com/busqueda?f=${q}`;
    if (pharmacy === "Sucre") return `https://sucreenlinea.com/catalogsearch/result/?q=${q}`;
    return "#";
  };

  useEffect(() => {
    fetch('/productos.json')
      .then(res => res.json())
      .then(data => {
        setDb(data.products || defaultData);
        setFilteredDb(data.products || defaultData);
        setLoading(false);
      })
      .catch(() => {
        setDb(defaultData);
        setFilteredDb(defaultData);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase();
    setSearchTerm(val);
    const filtered = db.filter(p => p.name.toLowerCase().includes(val) || (p.category && p.category.toLowerCase().includes(val)));
    setFilteredDb(filtered);
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-900">
      {/* Header Mini */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
            <div className="bg-teal-600 text-white w-10 h-9 rounded-lg flex items-center justify-center font-black text-lg">MC</div>
            <div>
              <div className="text-lg font-black leading-none">MediCompare</div>
              <span className="text-teal-600 text-[8px] font-bold uppercase">Costa Rica</span>
            </div>
          </div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Buscador Inteligente</div>
        </div>
      </header>

      {/* Hero Ultra Compacto */}
      <section className="bg-white py-8 border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-5 flex items-center text-slate-400 group-focus-within:text-teal-600 transition-colors">
              <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Busca tu medicamento..."
              className="w-full bg-slate-100 border-2 border-transparent focus:border-teal-500 focus:bg-white rounded-full py-3 pl-12 pr-4 text-base font-bold outline-none transition-all shadow-sm"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8 grid lg:grid-cols-[220px_1fr] gap-8">
        {/* Sidebar Compacto */}
        <aside className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-[11px] font-black text-slate-400 uppercase mb-4 tracking-tighter">Farmacias</h3>
            <div className="space-y-3">
              {['Fischel', 'FarmaValue', 'La Bomba', 'Sucre'].map(farm => (
                <label key={farm} className="flex items-center gap-3 font-bold text-slate-700 text-xs cursor-pointer hover:text-teal-600 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={activePharms.includes(farm)}
                    onChange={() => {
                      const next = activePharms.includes(farm) ? activePharms.filter(f => f !== farm) : [...activePharms, farm];
                      setActivePharms(next);
                    }}
                    className="w-4 h-4 rounded-md accent-teal-600"
                  /> {farm}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Listado Ultra Compacto */}
        <section>
          <div className="grid gap-4">
            {loading ? (
              <div className="text-center py-20 font-black text-slate-200">CARGANDO...</div>
            ) : filteredDb.length > 0 ? (
              filteredDb.map(item => {
                const prices = item.prices.filter(p => activePharms.includes(p.pharmacy)).sort((a,b) => a.price - b.price);
                if (prices.length === 0) return null;
                const minPrice = prices[0].price;

                return (
                  <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col md:flex-row gap-6 hover:shadow-md transition-all group hover:border-teal-500/50">
                    {/* Imagen Mini: de w-40 a w-24 */}
                    <div className="md:w-24 flex-shrink-0 flex items-center justify-center bg-slate-50 rounded-xl p-2">
                      <img src={item.image} alt={item.name} className="max-w-full h-auto mix-blend-multiply transition-transform group-hover:scale-105" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-teal-600 text-[8px] font-black uppercase tracking-tighter">{item.category}</span>
                          <h2 className="text-lg font-black text-slate-900 tracking-tight leading-none">{item.name}</h2>
                        </div>
                      </div>
                      
                      <div className="grid gap-1">
                        {prices.map((p, idx) => (
                          /* Filas de precios ultra-delgadas */
                          <div key={idx} className="flex items-center justify-between py-1.5 border-t border-slate-50 first:border-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-bold text-slate-600">{p.pharmacy}</span>
                              {p.price === minPrice && prices.length > 1 && (
                                <span className="bg-emerald-100 text-emerald-700 text-[7px] font-black px-1.5 py-0.5 rounded-sm uppercase">Mejor Precio</span>
                              )}
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-sm font-black text-teal-600">₡{p.price.toLocaleString()}</span>
                              <a 
                                href={getSearchUrl(p.pharmacy, item.name)} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-slate-900 text-white px-3 py-1 rounded-lg font-bold hover:bg-teal-600 transition-all text-[9px] uppercase tracking-tighter"
                              >
                                Comprar
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-10 text-center">
                <AlertCircle size={40} className="mx-auto text-slate-200 mb-4" />
                <h2 className="text-lg font-black text-slate-400">Sin resultados locales para "{searchTerm}"</h2>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 py-10 text-center">
        <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Diseñado por Randall Castro Arias</div>
        <div className="text-[10px] text-slate-300">© 2026 MediCompare Costa Rica</div>
      </footer>
    </div>
  );
};

export default App;
