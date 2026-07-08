import React, { useState, useEffect } from 'react';
import { Search, Store, ChevronRight, AlertCircle, MapPin, Navigation } from 'lucide-react';

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
    { id: 1, name: "Panadol Extra 500mg", category: "Analgésicos", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200", prices: [{pharmacy: "Fischel", price: 3250}, {pharmacy: "FarmaValue", price: 2850}, {pharmacy: "La Bomba", price: 2900}, {pharmacy: "Sucre", price: 3150}] },
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
    <div className="min-h-screen bg-[#f6f8fb] text-slate-900 font-sans">
      {/* Header Mini */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 py-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
            <div className="bg-teal-600 text-white w-10 h-9 rounded-lg flex items-center justify-center font-black text-lg">MC</div>
            <div>
              <div className="text-lg font-black leading-none">MediCompare</div>
              <span className="text-teal-600 text-[8px] font-extrabold uppercase">Costa Rica</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full">
            <MapPin size={14} className="text-teal-600" />
            <span className="text-[11px] font-black text-slate-600 uppercase tracking-tighter">{location}</span>
          </div>
        </div>
      </header>

      {/* Buscador */}
      <section className="bg-white py-10 border-b border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-black mb-6 text-slate-800">¿Dónde comprar <span className="text-teal-600">más barato</span> hoy?</h1>
          <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-5 flex items-center text-slate-400 group-focus-within:text-teal-600 transition-colors">
              <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Busca tu medicamento..."
              className="w-full bg-slate-100 border-2 border-transparent focus:border-teal-500 focus:bg-white rounded-full py-4 pl-12 pr-4 text-base font-bold outline-none transition-all shadow-sm"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8 grid lg:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar con Ubicación */}
        <aside className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest flex items-center gap-2"><MapPin size={12}/> Tu Ubicación</h3>
            <select 
              className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs font-bold outline-none focus:border-teal-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              {provinces.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest flex items-center gap-2"><Store size={12}/> Farmacias</h3>
            <div className="space-y-3">
              {['Fischel', 'FarmaValue', 'La Bomba', 'Sucre'].map(farm => (
                <label key={farm} className="flex items-center gap-3 font-bold text-slate-700 text-xs cursor-pointer hover:text-teal-600">
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

        {/* Listado con Ubicación */}
        <section>
          <div className="grid gap-6">
            {loading ? (
              <div className="text-center py-20 font-black text-slate-200">CARGANDO...</div>
            ) : filteredDb.length > 0 ? (
              filteredDb.map(item => {
                const prices = item.prices.filter(p => activePharms.includes(p.pharmacy)).sort((a,b) => a.price - b.price);
                if (prices.length === 0) return null;
                const minPrice = prices[0].price;

                return (
                  <div key={item.id} className="bg-white rounded-3xl border border-slate-200 p-5 flex flex-col md:flex-row gap-8 hover:shadow-lg transition-all group hover:border-teal-500/50">
                    <div className="md:w-32 flex-shrink-0 flex items-center justify-center bg-slate-50 rounded-2xl p-4">
                      <img src={item.image} alt={item.name} className="max-w-full h-auto mix-blend-multiply" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-teal-600 text-[9px] font-black uppercase">{item.category}</span>
                          <h2 className="text-xl font-black text-slate-900 tracking-tight">{item.name}</h2>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {prices.map((p, idx) => (
                          <div key={idx} className="flex items-center justify-between py-3 border-t border-slate-50 first:border-0">
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-black text-slate-700">{p.pharmacy}</span>
                                {p.price === minPrice && prices.length > 1 && (
                                  <span className="bg-emerald-100 text-emerald-700 text-[8px] font-black px-2 py-0.5 rounded-md uppercase">Más Barato</span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                                <Navigation size={10} /> Sucursal {location} cercana
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-lg font-black text-teal-600">₡{p.price.toLocaleString()}</span>
                              <div className="flex gap-2">
                                <a 
                                  href={getWazeUrl(p.pharmacy)} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="bg-slate-100 text-slate-600 p-2 rounded-xl hover:bg-teal-50 hover:text-teal-600 transition-all border border-slate-200"
                                  title="Ver en Waze"
                                >
                                  <Navigation size={16} />
                                </a>
                                <a 
                                  href={getSearchUrl(p.pharmacy, item.name)} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="bg-slate-900 text-white px-5 py-2 rounded-xl font-black hover:bg-teal-600 transition-all text-[10px] uppercase shadow-sm"
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
              <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-16 text-center">
                <AlertCircle size={40} className="mx-auto text-slate-200 mb-4" />
                <h2 className="text-xl font-black text-slate-400">Sin resultados para tu zona</h2>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 text-center">
        <div className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Diseñado por Randall Castro Arias</div>
        <div className="text-[10px] text-slate-300">MediCompare CR - Tu salud en el mapa</div>
      </footer>
    </div>
  );
};

export default App;
