import React, { useState, useEffect } from 'react';
import { Search, Store, ChevronRight, AlertCircle, Globe } from 'lucide-react';

interface Price {
  pharmacy: string;
  price: number;
}

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  prices: Price[];
}

const App: React.FC = () => {
  const [db, setDb] = useState<Product[]>([]);
  const [filteredDb, setFilteredDb] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activePharms, setActivePharms] = useState(['Fischel', 'FarmaValue', 'La Bomba', 'Sucre']);
  const [loading, setLoading] = useState(true);

  // DATOS DE EMERGENCIA (Si el JSON falla, esto garantiza que el sitio funcione)
  const defaultData: Product[] = [
    { id: 1, name: "Panadol Extra 500mg", category: "Analgésicos", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300", prices: [{pharmacy: "Fischel", price: 3250}, {pharmacy: "FarmaValue", price: 2850}, {pharmacy: "La Bomba", price: 2900}, {pharmacy: "Sucre", price: 3150}] },
    { id: 2, name: "Ozempic 1mg Pluma", category: "Diabetes", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300", prices: [{pharmacy: "FarmaValue", price: 62450}, {pharmacy: "La Bomba", price: 63000}] },
    { id: 3, name: "Acetaminofen Genfar", category: "Analgésicos", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300", prices: [{pharmacy: "Fischel", price: 1200}, {pharmacy: "La Bomba", price: 900}, {pharmacy: "Sucre", price: 1100}] }
  ];

  // LOGICA DE LINKS REALES PROPORCIONADOS POR RANDALL
  const getSearchUrl = (pharmacy: string, productName: string) => {
    const q = encodeURIComponent(productName.split(' ')[0]); // Solo primera palabra para evitar 404
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
    const val = e.target.value;
    setSearchTerm(val);
    const filtered = db.filter(p => p.name.toLowerCase().includes(val.toLowerCase()));
    setFilteredDb(filtered);
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-900 font-sans">
      {/* Header Premium */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 py-5">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.location.reload()}>
            <div className="bg-[#0d9488] text-white w-16 h-14 rounded-2xl flex items-center justify-center font-black text-3xl shadow-xl">MC</div>
            <div>
              <div className="text-2xl font-black tracking-tighter leading-none">MediCompare</div>
              <span className="text-[#0d9488] text-[10px] font-extrabold uppercase tracking-widest">Comparador de Precios</span>
            </div>
          </div>
          <div className="font-black text-[#0d9488] text-sm tracking-widest hidden md:block">COSTA RICA</div>
        </div>
      </header>

      {/* Hero Buscador */}
      <section className="bg-white py-24 text-center border-b border-gray-100">
        <div className="container mx-auto px-6">
          <h1 className="text-6xl font-black mb-6 tracking-tight text-slate-900">Salud inteligente, <span className="text-[#0d9488]">ahorro real.</span></h1>
          <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto font-medium">Compara precios en las farmacias más grandes de Costa Rica en un solo lugar.</p>
          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute inset-y-0 left-8 flex items-center text-slate-400 group-focus-within:text-[#0d9488] transition-colors">
              <Search size={28} />
            </div>
            <input 
              type="text" 
              placeholder="¿Qué medicamento buscas hoy?"
              className="w-full bg-slate-100 border-2 border-transparent focus:border-[#0d9488] focus:bg-white rounded-full py-6 pl-20 pr-10 text-2xl font-bold outline-none transition-all shadow-2xl"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </section>

      {/* Contenido Principal */}
      <main className="container mx-auto px-6 py-16 grid lg:grid-cols-[300px_1fr] gap-16">
        <aside>
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Globe size={16}/> Farmacias Conectadas</h3>
          <div className="bg-white p-10 rounded-[40px] border border-gray-200 shadow-sm space-y-6">
            {['Fischel', 'FarmaValue', 'La Bomba', 'Sucre'].map(farm => (
              <label key={farm} className="flex items-center gap-4 font-black text-slate-700 cursor-pointer hover:text-[#0d9488] transition-colors">
                <input 
                  type="checkbox" 
                  checked={activePharms.includes(farm)}
                  onChange={() => {
                    const next = activePharms.includes(farm) ? activePharms.filter(f => f !== farm) : [...activePharms, farm];
                    setActivePharms(next);
                  }}
                  className="w-6 h-6 rounded-lg accent-[#0d9488]"
                /> {farm}
              </label>
            ))}
          </div>
        </aside>

        <section>
          {loading ? (
            <div className="text-center py-20 font-black text-slate-300 text-3xl animate-pulse">CARGANDO CATÁLOGO...</div>
          ) : filteredDb.length > 0 ? (
            <div className="grid gap-10">
              {filteredDb.map(item => {
                const prices = item.prices.filter(p => activePharms.includes(p.pharmacy)).sort((a,b) => a.price - b.price);
                if (prices.length === 0) return null;
                const minPrice = prices[0].price;

                return (
                  <div key={item.id} className="bg-white rounded-[50px] border border-gray-200 p-10 md:p-14 flex flex-col md:flex-row gap-12 hover:shadow-3xl transition-all group hover:border-[#0d9488]/30">
                    <div className="md:w-56 flex-shrink-0 flex items-center justify-center bg-slate-50 rounded-[35px] p-8">
                      <img src={item.image} alt={item.name} className="max-w-full h-auto mix-blend-multiply transition-transform group-hover:scale-110" />
                    </div>
                    <div className="flex-1">
                      <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 inline-block">{item.category}</span>
                      <h2 className="text-4xl font-black text-slate-900 mb-10 tracking-tighter">{item.name}</h2>
                      <div className="space-y-6">
                        {prices.map((p, idx) => (
                          <div key={idx} className="flex items-center justify-between py-6 border-t border-slate-50 first:border-0">
                            <div className="flex items-center gap-4">
                              <span className="text-xl font-black text-slate-600">{p.pharmacy}</span>
                              {p.price === minPrice && prices.length > 1 && (
                                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter animate-bounce">Ahorro Máximo</span>
                              )}
                            </div>
                            <div className="flex items-center gap-10">
                              <span className="text-3xl font-black text-[#0d9488]">₡{p.price.toLocaleString()}</span>
                              <a 
                                href={getSearchUrl(p.pharmacy, item.name)} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-[#0d9488] transition-all flex items-center gap-2 shadow-lg"
                              >
                                COMPRAR <ChevronRight size={20} />
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-[50px] border-2 border-dashed border-gray-200 p-24 text-center">
              <AlertCircle size={80} className="mx-auto text-slate-200 mb-8" />
              <h2 className="text-4xl font-black text-slate-400 mb-12 italic">"{searchTerm}" no está en el catálogo local</h2>
              <div className="flex flex-wrap justify-center gap-6">
                {['Fischel', 'La Bomba', 'FarmaValue', 'Sucre'].map(pharm => (
                  <a 
                    key={pharm}
                    href={getSearchUrl(pharm, searchTerm)}
                    target="_blank"
                    className="bg-[#0d9488] text-white px-12 py-6 rounded-3xl font-black hover:scale-105 transition-transform shadow-2xl text-lg"
                  >
                    Búsqueda en {pharm}
                  </a>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="bg-slate-900 text-white py-32 text-center mt-20">
        <div className="container mx-auto px-6">
          <div className="text-5xl font-black mb-16 tracking-tighter">MediCompare</div>
          <div className="pt-12 border-t border-slate-800">
            <div className="text-2xl font-black text-slate-400">Diseñado por <span className="text-[#0d9488]">Randall Castro Arias</span></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
