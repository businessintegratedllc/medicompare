import React, { useState, useEffect } from 'react';
import { Search, Store, ChevronRight, AlertCircle, Globe, Zap } from 'lucide-react';

// --- Interfaces de Datos ---
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
  const [lastUpdate, setLastUpdate] = useState('');

  // --- Datos de Respaldo ---
  const defaultData: Product[] = [
    { id: 1, name: "Panadol Extra 500mg", category: "Analgésicos", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300", prices: [{pharmacy: "Fischel", price: 3250}, {pharmacy: "FarmaValue", price: 2850}, {pharmacy: "La Bomba", price: 2900}, {pharmacy: "Sucre", price: 3150}] },
    { id: 2, name: "Ozempic 1mg Pluma", category: "Diabetes", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300", prices: [{pharmacy: "FarmaValue", price: 62450}, {pharmacy: "La Bomba", price: 63000}] }
  ];

  // --- Lógica de Búsqueda Inteligente (Enlaces Verificados) ---
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
        setLastUpdate(data.last_update || 'Hoy');
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
    const filtered = db.filter(p => 
      p.name.toLowerCase().includes(val) || 
      (p.category && p.category.toLowerCase().includes(val))
    );
    setFilteredDb(filtered);
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-900 selection:bg-teal-500 selection:text-white">
      {/* Header Compacto */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 py-3">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.location.reload()}>
            <div className="bg-gradient-to-br from-teal-500 to-teal-700 text-white w-12 h-10 rounded-xl flex items-center justify-center font-black text-xl shadow-lg">MC</div>
            <div>
              <div className="text-xl font-black tracking-tighter leading-none text-slate-900">MediCompare</div>
              <span className="text-teal-600 text-[9px] font-black uppercase tracking-widest">Comparador de Precios</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:block font-black text-slate-400 text-[10px] tracking-widest uppercase">Costa Rica</div>
             <Zap size={18} className="text-teal-500" />
          </div>
        </div>
      </header>

      {/* Hero Section Compacta */}
      <section className="bg-white py-16 text-center border-b border-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Salud inteligente, <span className="text-teal-600">ahorro real.</span></h1>
          <p className="text-lg text-slate-500 mb-10 max-w-xl mx-auto font-medium">Compara precios de las farmacias líderes en un solo lugar.</p>
          
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-6 flex items-center text-slate-400 group-focus-within:text-teal-600">
              <Search size={22} />
            </div>
            <input 
              type="text" 
              placeholder="Busca Panadol, Ozempic, Aspirina..."
              className="w-full bg-slate-100 border-2 border-transparent focus:border-teal-500 focus:bg-white rounded-full py-4 pl-16 pr-6 text-lg font-bold outline-none transition-all shadow-lg"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 grid lg:grid-cols-[260px_1fr] gap-12">
        {/* Sidebar */}
        <aside className="space-y-8">
          <div>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
              <Globe size={14} className="text-teal-500" /> Filtros
            </h3>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              {['Fischel', 'FarmaValue', 'La Bomba', 'Sucre'].map(farm => (
                <label key={farm} className="flex items-center gap-3 font-bold text-slate-700 cursor-pointer hover:text-teal-600 text-sm">
                  <input 
                    type="checkbox" 
                    checked={activePharms.includes(farm)}
                    onChange={() => {
                      const next = activePharms.includes(farm) ? activePharms.filter(f => f !== farm) : [...activePharms, farm];
                      setActivePharms(next);
                    }}
                    className="w-5 h-5 rounded-lg accent-teal-600"
                  /> {farm}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Listado de Productos Compacto */}
        <section>
          <div className="flex justify-between items-center mb-8">
             <h2 className="text-xl font-black text-slate-900">Catálogo de Productos</h2>
             <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white px-4 py-1.5 rounded-full border border-slate-200">
                Actualizado: {lastUpdate}
             </div>
          </div>

          <div className="grid gap-6">
            {loading ? (
              <div className="text-center py-20 font-black text-slate-200 text-3xl animate-pulse">CARGANDO...</div>
            ) : filteredDb.length > 0 ? (
              filteredDb.map(item => {
                const prices = item.prices.filter(p => activePharms.includes(p.pharmacy)).sort((a,b) => a.price - b.price);
                if (prices.length === 0) return null;
                const minPrice = prices[0].price;

                return (
                  /* Tarjeta más pequeña: redondeado 32px y padding reducido */
                  <div key={item.id} className="bg-white rounded-[12px] border border-slate-100 p-6 md:p-8 flex flex-col md:flex-row gap-8 hover:shadow-xl transition-all group hover:border-teal-500/30">
                    <div className="md:w-40 flex-shrink-0 flex items-center justify-center bg-slate-50 rounded-2xl p-4">
                      <img src={item.image} alt={item.name} className="max-w-full h-auto mix-blend-multiply transition-transform group-hover:scale-105" />
                    </div>
                    <div className="flex-1">
                      <span className="text-teal-600 text-[6px] font-black uppercase tracking-widest mb-1 inline-block">{item.category}</span>
                      <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight leading-tight">{item.name}</h2>
                      <div className="space-y-3">
                        {prices.map((p, idx) => (
                          <div key={idx} className="flex items-center justify-between py-3 border-t border-slate-100 first:border-0">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-bold text-slate-600">{p.pharmacy}</span>
                              {p.price === minPrice && prices.length > 1 && (
                                <span className="bg-emerald-100 text-emerald-700 text-[6px] font-black px-2 py-0.5 rounded-md uppercase tracking-tighter">Ahorro</span>
                              )}
                            </div>
                            <div className="flex items-center gap-6">
                              <span className="text-xl font-black text-teal-600 tracking-tighter">₡{p.price.toLocaleString()}</span>
                              <a 
                                href={getSearchUrl(p.pharmacy, item.name)} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-slate-900 text-white px-5 py-2 rounded-xl font-bold hover:bg-teal-600 transition-all text-[11px] shadow-sm active:scale-95"
                              >
                                COMPRAR
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
              <div className="bg-white rounded-[20px] border-2 border-dashed border-slate-200 p-16 text-center">
                <AlertCircle size={60} className="mx-auto text-slate-100 mb-6" />
                <h2 className="text-2xl font-black text-slate-400 mb-8 italic italic">"{searchTerm}" no está en el catálogo</h2>
                <div className="flex flex-wrap justify-center gap-4">
                  {['Fischel', 'La Bomba', 'FarmaValue', 'Sucre'].map(pharm => (
                    <a 
                      key={pharm}
                      href={getSearchUrl(pharm, searchTerm)}
                      target="_blank"
                      className="bg-teal-600 text-white px-8 py-3 rounded-2xl font-black hover:scale-105 transition-transform text-sm"
                    >
                      Búsqueda en {pharm}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer Pro */}
      <footer className="bg-slate-900 text-white py-20 text-center mt-20">
        <div className="container mx-auto px-6">
          <div className="text-4xl font-black mb-8 tracking-tighter opacity-30">MediCompare</div>
          <div className="pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-lg font-black text-slate-400">
               Diseñado por <span className="text-teal-250">Randall Castro Arias para Business Integarted LLC</span>
            </div>
            <div className="flex gap-6 text-slate-500 font-bold text-xs uppercase tracking-widest">
               <a href="#" className="hover:text-white transition-colors">Privacidad</a>
               <a href="#" className="hover:text-white transition-colors">Contacto</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
