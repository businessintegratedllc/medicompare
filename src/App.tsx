import React, { useState, useEffect } from 'react';
import { Search, Store, ChevronRight, AlertCircle, MapPin, Navigation, Zap, Globe } from 'lucide-react';

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
  const [location, setLocation] = useState('San José');
  const [loading, setLoading] = useState(true);

  const provinces = ['San José', 'Alajuela', 'Cartago', 'Heredia', 'Guanacaste', 'Puntarenas', 'Limón'];

  const defaultData: Product[] = [
    { id: 1, name: "Panadol Extra 500mg", category: "Analgésicos", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300", prices: [{pharmacy: "Fischel", price: 3250}, {pharmacy: "FarmaValue", price: 2850}, {pharmacy: "La Bomba", price: 2900}, {pharmacy: "Sucre", price: 3150}] },
    { id: 2, name: "Ozempic 1mg Pluma", category: "Diabetes", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300", prices: [{pharmacy: "FarmaValue", price: 62450}, {pharmacy: "La Bomba", price: 63000}] }
  ];

  const getSearchUrl = (pharmacy: string, productName: string) => {
    const q = encodeURIComponent(productName.split(' ')[0].replace(/[^a-zA-Z]/g, ''));
    if (pharmacy === "Fischel") return `https://fischelenlinea.com/busqueda?f=${q}`;
    if (pharmacy === "FarmaValue") return `https://www.farmavalue.com/cr/products?q=${q}`;
    if (pharmacy === "La Bomba") return `https://www.farmacialabomba.com/busqueda?f=${q}`;
    if (pharmacy === "Sucre") return `https://sucreenlinea.com/catalogsearch/result/?q=${q}`;
    return "#";
  };

  const getWazeUrl = (pharmacy: string) => {
    return `https://www.waze.com/ul?q=Farmacia%20${encodeURIComponent(pharmacy)}%20${encodeURIComponent(location)}`;
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
    <div className="min-h-screen bg-[#f6f8fb] text-slate-900 selection:bg-teal-500 selection:text-white bg-grid">
      
      {/* HEADER ORIGINAL RESTAURADO */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => window.location.reload()}>
            <div className="bg-gradient-to-br from-teal-500 to-teal-700 text-white w-14 h-12 rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg group-hover:scale-105 transition-transform">MC</div>
            <div>
              <div className="text-2xl font-black tracking-tighter leading-none text-slate-900 font-display">MediCompare</div>
              <span className="text-teal-600 text-[10px] font-black uppercase tracking-[0.2em]">Comparador de Precios</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
             <div className="hidden md:flex items-center gap-2 bg-teal-50 px-4 py-2 rounded-full border border-teal-100">
                <MapPin size={14} className="text-teal-600" />
                <span className="text-[10px] font-black text-teal-700 uppercase tracking-widest">{location}</span>
             </div>
             <div className="hidden md:block font-black text-slate-400 text-xs tracking-widest uppercase">Costa Rica</div>
             <Zap size={20} className="text-teal-500 animate-pulse" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-20 text-center border-b border-slate-100 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight font-display">Salud inteligente, <span className="text-teal-600">ahorro real.</span></h1>
          <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto font-medium">Compara precios y encuentra la farmacia más cercana en segundos.</p>
          
          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute inset-y-0 left-8 flex items-center text-slate-400 group-focus-within:text-teal-600 transition-colors">
              <Search size={28} />
            </div>
            <input 
              type="text" 
              placeholder="¿Qué medicamento buscas hoy?"
              className="w-full bg-slate-100 border-2 border-transparent focus:border-teal-500 focus:bg-white rounded-full py-6 pl-20 pr-10 text-2xl font-bold outline-none transition-all shadow-2xl"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 py-16 grid lg:grid-cols-[280px_1fr] gap-12">
        {/* Sidebar */}
        <aside className="space-y-8">
          <div className="bg-white p-8 rounded-[35px] border border-slate-200 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <MapPin size={16} className="text-teal-500" /> Tu Provincia
            </h3>
            <select 
              className="w-full bg-slate-50 border border-slate-200 p-3 rounded-2xl text-sm font-bold outline-none focus:border-teal-500 transition-all cursor-pointer"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              {provinces.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="bg-white p-8 rounded-[35px] border border-slate-200 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Store size={16} className="text-teal-500" /> Farmacias
            </h3>
            <div className="space-y-4">
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
                  <span className="text-sm">{farm}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product List Compacto */}
        <section>
          <div className="grid gap-6">
            {loading ? (
              <div className="text-center py-20 font-black text-slate-200 text-4xl animate-pulse">CARGANDO...</div>
            ) : filteredDb.length > 0 ? (
              filteredDb.map(item => {
                const prices = item.prices.filter(p => activePharms.includes(p.pharmacy)).sort((a,b) => a.price - b.price);
                if (prices.length === 0) return null;
                const minPrice = prices[0].price;

                return (
                  <div key={item.id} className="bg-white rounded-[40px] border border-slate-200 p-6 md:p-8 flex flex-col md:flex-row gap-8 hover:shadow-xl transition-all group hover:border-teal-500/30">
                    <div className="md:w-40 flex-shrink-0 flex items-center justify-center bg-slate-50 rounded-[25px] p-6">
                      <img src={item.image} alt={item.name} className="max-w-full h-auto mix-blend-multiply transition-transform group-hover:scale-105 duration-500" />
                    </div>
                    <div className="flex-1">
                      <span className="text-teal-600 text-[9px] font-black uppercase tracking-[0.2em] mb-2 inline-block">{item.category}</span>
                      <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight leading-tight font-display">{item.name}</h2>
                      <div className="space-y-3">
                        {prices.map((p, idx) => (
                          <div key={idx} className="flex items-center justify-between py-3 border-t border-slate-50 first:border-0">
                            <div className="flex flex-col">
                              <div className="flex items-center gap-3">
                                <span className="text-base font-bold text-slate-700">{p.pharmacy}</span>
                                {p.price === minPrice && prices.length > 1 && (
                                  <span className="bg-emerald-100 text-emerald-700 text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-tighter">Mejor Precio</span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1 mt-1">
                                <Navigation size={10} /> Sucursal {location} cercana
                              </span>
                            </div>
                            <div className="flex items-center gap-6">
                              <span className="text-xl font-black text-teal-600 tracking-tighter">₡{p.price.toLocaleString()}</span>
                              <div className="flex gap-2">
                                <a 
                                  href={getWazeUrl(p.pharmacy)} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="bg-slate-100 text-slate-500 p-2.5 rounded-xl hover:bg-teal-50 hover:text-teal-600 transition-all border border-slate-200"
                                  title="Ir con Waze"
                                >
                                  <Navigation size={18} />
                                </a>
                                <a 
                                  href={getSearchUrl(p.pharmacy, item.name)} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-black hover:bg-teal-600 transition-all text-xs uppercase tracking-widest shadow-lg"
                                >
                                  Comprar
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white rounded-[50px] border-2 border-dashed border-slate-200 p-24 text-center">
                <AlertCircle size={80} className="mx-auto text-slate-100 mb-8" />
                <h2 className="text-3xl font-black text-slate-400">"{searchTerm}" no está en el catálogo</h2>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-white py-32 text-center">
        <div className="container mx-auto px-6">
          <div className="text-5xl font-black mb-12 tracking-tighter opacity-20">MediCompare</div>
          <div className="pt-12 border-t border-slate-800">
            <div className="text-xl font-black text-slate-400">Diseñado por <span className="text-teal-500">Randall Castro Arias</span></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
