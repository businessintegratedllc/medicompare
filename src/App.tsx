import React, { useState, useEffect } from 'react';
import { Search, Store, ChevronRight, AlertCircle, Globe, Zap } from 'lucide-react';

// --- Definición de Interfaces ---
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

  // --- Datos de Respaldo (Por seguridad) ---
  const defaultData: Product[] = [
    { id: 1, name: "Panadol Extra 500mg", category: "Analgésicos", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300", prices: [{pharmacy: "Fischel", price: 3250}, {pharmacy: "FarmaValue", price: 2850}, {pharmacy: "La Bomba", price: 2900}, {pharmacy: "Sucre", price: 3150}] },
    { id: 2, name: "Ozempic 1mg Pluma", category: "Diabetes", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300", prices: [{pharmacy: "FarmaValue", price: 62450}, {pharmacy: "La Bomba", price: 63000}] },
    { id: 3, name: "Acetaminofen Genfar", category: "Analgésicos", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300", prices: [{pharmacy: "Fischel", price: 1200}, {pharmacy: "La Bomba", price: 900}, {pharmacy: "Sucre", price: 1100}] }
  ];

  // --- Lógica de Búsqueda Inteligente (Cero 404) ---
  const getSearchUrl = (pharmacy: string, productName: string) => {
    // Limpiamos el término: De "Panadol Extra 500mg" extraemos solo "Panadol"
    const cleanTerm = productName.split(' ')[0].replace(/[^a-zA-Z]/g, '');
    const q = encodeURIComponent(cleanTerm);

    if (pharmacy === "Fischel") return `https://fischelenlinea.com/busqueda?f=${q}`;
    if (pharmacy === "FarmaValue") return `https://www.farmavalue.com/cr/products?q=${q}`;
    if (pharmacy === "La Bomba") return `https://www.farmacialabomba.com/busqueda?f=${q}`;
    if (pharmacy === "Sucre") return `https://sucreenlinea.com/catalogsearch/result/?q=${q}`;
    return "#";
  };

  // --- Carga de Base de Datos ---
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

  // --- Motor de Búsqueda en Tiempo Real ---
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
      {/* Header con Blur y Diseño Randall Castro Arias */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => window.location.reload()}>
            <div className="bg-gradient-to-br from-teal-500 to-teal-700 text-white w-14 h-12 rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg group-hover:scale-105 transition-transform">MC</div>
            <div>
              <div className="text-2xl font-black tracking-tighter leading-none text-slate-900">MediCompare</div>
              <span className="text-teal-600 text-[10px] font-black uppercase tracking-[0.2em]">Comparador de Precios</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
             <div className="hidden md:block font-black text-slate-400 text-xs tracking-widest uppercase">Costa Rica</div>
             <div className="h-8 w-[1px] bg-slate-200 hidden md:block"></div>
             <Zap size={20} className="text-teal-500 animate-pulse" />
          </div>
        </div>
      </header>

      {/* Hero Section SaaS Style */}
      <section className="bg-white py-24 text-center border-b border-slate-100 relative overflow-hidden">
        {/* Malla de fondo decorativa */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
            Salud inteligente, <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">ahorro real.</span>
          </h1>
          <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto font-medium">
            Encuentra el precio más bajo en las farmacias líderes de Costa Rica en un solo lugar.
          </p>
          
          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute inset-y-0 left-8 flex items-center text-slate-400 group-focus-within:text-teal-600 transition-colors">
              <Search size={28} />
            </div>
            <input 
              type="text" 
              placeholder="¿Qué medicamento buscas hoy?"
              className="w-full bg-slate-100 border-2 border-transparent focus:border-teal-500 focus:bg-white rounded-full py-7 pl-20 pr-10 text-2xl font-bold outline-none transition-all shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <main className="container mx-auto px-6 py-20 grid lg:grid-cols-[320px_1fr] gap-16">
        {/* Sidebar Filters */}
        <aside className="space-y-10">
          <div>
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Globe size={18} className="text-teal-500" /> Farmacias
            </h3>
            <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm space-y-6">
              {['Fischel', 'FarmaValue', 'La Bomba', 'Sucre'].map(farm => (
                <label key={farm} className="flex items-center gap-4 font-black text-slate-700 cursor-pointer hover:text-teal-600 transition-colors group">
                  <input 
                    type="checkbox" 
                    checked={activePharms.includes(farm)}
                    onChange={() => {
                      const next = activePharms.includes(farm) ? activePharms.filter(f => f !== farm) : [...activePharms, farm];
                      setActivePharms(next);
                    }}
                    className="w-6 h-6 rounded-xl accent-teal-600 border-2 border-slate-300"
                  /> 
                  <span className="group-hover:translate-x-1 transition-transform">{farm}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="bg-teal-50 p-8 rounded-[35px] border border-teal-100">
             <div className="font-black text-teal-800 text-lg mb-2">💡 Tip de ahorro</div>
             <p className="text-teal-600 text-sm font-bold">Comparamos precios de las 4 farmacias más grandes para asegurarte el mejor trato.</p>
          </div>
        </aside>

        {/* Product List */}
        <section>
          <div className="flex justify-between items-center mb-10">
             <h2 className="text-2xl font-black text-slate-900">
                {filteredDb.length > 0 ? `Se encontraron ${filteredDb.length} ofertas` : 'Sin resultados locales'}
             </h2>
             <div className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-white px-5 py-2 rounded-full border border-slate-200">
                Actualizado: {lastUpdate}
             </div>
          </div>

          <div className="grid gap-12">
            {loading ? (
              <div className="text-center py-40 font-black text-slate-200 text-5xl animate-pulse">CARGANDO...</div>
            ) : filteredDb.length > 0 ? (
              filteredDb.map(item => {
                const prices = item.prices.filter(p => activePharms.includes(p.pharmacy)).sort((a,b) => a.price - b.price);
                if (prices.length === 0) return null;
                const minPrice = prices[0].price;

                return (
                  <div key={item.id} className="bg-white rounded-[60px] border border-slate-200 p-12 md:p-16 flex flex-col md:flex-row gap-16 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all group hover:border-teal-500/30 animate-fade-up">
                    <div className="md:w-64 flex-shrink-0 flex items-center justify-center bg-slate-50 rounded-[45px] p-10 group-hover:bg-teal-50 transition-colors">
                      <img src={item.image} alt={item.name} className="max-w-full h-auto mix-blend-multiply transition-transform group-hover:scale-110 duration-500" />
                    </div>
                    <div className="flex-1">
                      <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-[0.2em] mb-6 inline-block">{item.category}</span>
                      <h2 className="text-5xl font-black text-slate-900 mb-12 tracking-tighter leading-tight">{item.name}</h2>
                      <div className="space-y-8">
                        {prices.map((p, idx) => (
                          <div key={idx} className="flex items-center justify-between py-8 border-t border-slate-100 first:border-0">
                            <div className="flex items-center gap-6">
                              <span className="text-2xl font-black text-slate-700">{p.pharmacy}</span>
                              {p.price === minPrice && prices.length > 1 && (
                                <span className="bg-emerald-100 text-emerald-700 text-[11px] font-black px-5 py-2 rounded-xl uppercase tracking-widest animate-bounce">Ahorro Máximo</span>
                              )}
                            </div>
                            <div className="flex items-center gap-12">
                              <span className="text-4xl font-black text-teal-600 tracking-tighter">₡{p.price.toLocaleString()}</span>
                              <a 
                                href={getSearchUrl(p.pharmacy, item.name)} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-slate-900 text-white px-10 py-5 rounded-[20px] font-black hover:bg-teal-600 transition-all flex items-center gap-3 shadow-xl hover:-translate-y-1 active:scale-95"
                              >
                                COMPRAR <ChevronRight size={24} />
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
              /* Deep Search / No Results State */
              <div className="bg-white rounded-[60px] border-2 border-dashed border-slate-200 p-24 text-center">
                <AlertCircle size={100} className="mx-auto text-slate-100 mb-10" />
                <h2 className="text-4xl font-black text-slate-400 mb-12 italic tracking-tight">"{searchTerm}" no está en nuestra base local</h2>
                <p className="text-slate-500 text-xl mb-12 font-medium">Pero puedes comparar en vivo en las farmacias oficiales:</p>
                <div className="flex flex-wrap justify-center gap-6">
                  {['Fischel', 'La Bomba', 'FarmaValue', 'Sucre'].map(pharm => (
                    <a 
                      key={pharm}
                      href={getSearchUrl(pharm, searchTerm)}
                      target="_blank"
                      className="bg-teal-600 text-white px-12 py-6 rounded-3xl font-black hover:scale-105 transition-transform shadow-[0_20px_40px_-10px_rgba(13,148,136,0.5)] text-lg"
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

      {/* Footer Elite */}
      <footer className="bg-slate-900 text-white py-32 text-center mt-40">
        <div className="container mx-auto px-6">
          <div className="text-6xl font-black mb-16 tracking-tighter opacity-20">MediCompare</div>
          <p className="text-slate-500 text-xl mb-20 max-w-xl mx-auto font-medium italic">"Transparencia total en precios de salud para todas las familias de Costa Rica."</p>
          <div className="pt-16 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-2xl font-black text-slate-400">
               Diseñado por <span className="text-teal-500">Randall Castro Arias</span>
            </div>
            <div className="flex gap-8 text-slate-500 font-bold text-sm uppercase tracking-widest">
               <a href="#" className="hover:text-white transition-colors">Privacidad</a>
               <a href="#" className="hover:text-white transition-colors">Términos</a>
               <a href="#" className="hover:text-white transition-colors">Contacto</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
