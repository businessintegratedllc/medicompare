import React, { useState, useEffect } from 'react';
import { Search, Store, ChevronRight, AlertCircle } from 'lucide-react';

interface Price {
  pharmacy: string;
  price: number;
}

interface Product {
  id: number;
  name: string;
  category?: string;
  image: string;
  prices: Price[];
}

const App: React.FC = () => {
  const [db, setDb] = useState<Product[]>([]);
  const [filteredDb, setFilteredDb] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activePharms, setActivePharms] = useState(['Fischel', 'FarmaValue', 'La Bomba', 'Sucre']);
  const [loading, setLoading] = useState(true);

  // 1. Lógica de Enlaces Verificada (Cero 404)
  const getSearchUrl = (pharmacy: string, productName: string) => {
    const q = encodeURIComponent(productName.split(' ')[0]); // Solo primera palabra para asegurar resultados
    if (pharmacy === "Fischel") return `https://fischelenlinea.com/busqueda?f=${q}`;
    if (pharmacy === "FarmaValue") return `https://www.farmavalue.com/cr/products?q=${q}`;
    if (pharmacy === "La Bomba") return `https://www.farmacialabomba.com/busqueda?f=${q}`;
    if (pharmacy === "Sucre") return `https://sucreenlinea.com/catalogsearch/result/?q=${q}`;
    return "#";
  };

  // 2. Carga de datos segura
  useEffect(() => {
    fetch('/productos.json')
      .then(res => res.json())
      .then(data => {
        const products = data.products || [];
        setDb(products);
        setFilteredDb(products);
        setLoading(false);
      })
      .catch(() => {
        console.error("Error cargando JSON local");
        setLoading(false);
      });
  }, []);

  // 3. Motor de búsqueda instantáneo
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
    <div className="min-h-screen bg-[#f6f8fb] font-sans">
      {/* Header con Logo Randall Castro Arias Design */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.location.reload()}>
            <div className="bg-[#0d9488] text-white w-14 h-12 rounded-xl flex items-center justify-center font-black text-2xl shadow-lg">MC</div>
            <div>
              <div className="text-2xl font-black text-slate-900 leading-none">MediCompare</div>
              <span className="text-[#0d9488] text-[10px] font-bold uppercase tracking-widest">Comparador de Precios</span>
            </div>
          </div>
          <div className="hidden md:block font-black text-[#0d9488] text-sm tracking-tighter">COSTA RICA</div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-20 text-center border-b border-gray-100">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Tu salud, al mejor precio.</h1>
          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute inset-y-0 left-6 flex items-center text-gray-400 group-focus-within:text-[#0d9488] transition-colors">
              <Search size={24} />
            </div>
            <input 
              type="text" 
              placeholder="¿Qué medicamento buscas hoy? (Ej: Panadol, Ozempic...)"
              className="w-full bg-slate-100 border-2 border-transparent focus:border-[#0d9488] focus:bg-white rounded-full py-5 pl-16 pr-10 text-xl font-semibold outline-none transition-all shadow-xl"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 py-12 grid lg:grid-cols-[280px_1fr] gap-12">
        {/* Filtros Lateral */}
        <aside>
          <h3 className="text-lg font-black mb-6 flex items-center gap-2 uppercase tracking-wider text-slate-400">Farmacias</h3>
          <div className="bg-white p-8 rounded-[30px] border border-gray-200 shadow-sm space-y-5">
            {['Fischel', 'FarmaValue', 'La Bomba', 'Sucre'].map(farm => (
              <label key={farm} className="flex items-center gap-4 font-bold text-slate-700 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={activePharms.includes(farm)}
                  onChange={() => {
                    const next = activePharms.includes(farm) 
                      ? activePharms.filter(f => f !== farm) 
                      : [...activePharms, farm];
                    setActivePharms(next);
                  }}
                  className="w-6 h-6 rounded-md accent-[#0d9488]"
                />
                <span className="group-hover:text-[#0d9488] transition-colors">{farm}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Listado de Productos */}
        <section>
          {loading ? (
            <div className="text-center py-20 text-slate-400 font-bold text-xl animate-pulse">Conectando con la base de datos...</div>
          ) : filteredDb.length > 0 ? (
            <div className="grid gap-8">
              {filteredDb.map(item => {
                const prices = item.prices
                  .filter(p => activePharms.includes(p.pharmacy))
                  .sort((a,b) => a.price - b.price);
                
                if (prices.length === 0) return null;
                const minPrice = prices[0].price;

                return (
                  <div key={item.id} className="bg-white rounded-[40px] border border-gray-200 p-8 md:p-12 flex flex-col md:flex-row gap-12 hover:shadow-2xl transition-all border-l-8 border-l-transparent hover:border-l-[#0d9488]">
                    <div className="md:w-48 flex-shrink-0 flex items-center justify-center bg-slate-50 rounded-3xl p-6">
                      <img src={item.image} alt={item.name} className="max-w-full h-auto mix-blend-multiply" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">{item.name}</h2>
                      <div className="space-y-4">
                        {prices.map((p, idx) => (
                          <div key={idx} className="flex items-center justify-between py-4 border-t border-slate-50 first:border-0">
                            <div className="flex items-center gap-3">
                              <span className="text-lg font-black text-slate-600">{p.pharmacy}</span>
                              {p.price === minPrice && (
                                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-3 py-1 rounded-full uppercase">Mejor Precio</span>
                              )}
                            </div>
                            <div className="flex items-center gap-8">
                              <span className="text-2xl font-black text-[#0d9488]">₡{p.price.toLocaleString()}</span>
                              <a 
                                href={getSearchUrl(p.pharmacy, item.name)} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-[#0d9488] transition-all flex items-center gap-2 text-sm shadow-md"
                              >
                                COMPRAR <ChevronRight size={16} />
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
            <div className="bg-white rounded-[40px] border-2 border-dashed border-gray-200 p-20 text-center">
              <AlertCircle size={60} className="mx-auto text-slate-300 mb-6" />
              <h2 className="text-3xl font-black text-slate-400 mb-10 italic">"{searchTerm}" no está en el catálogo</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {['Fischel', 'La Bomba', 'FarmaValue', 'Sucre'].map(pharm => (
                  <a 
                    key={pharm}
                    href={getSearchUrl(pharm, searchTerm)}
                    target="_blank"
                    className="bg-[#0d9488] text-white px-10 py-5 rounded-2xl font-black hover:scale-105 transition-transform shadow-lg"
                  >
                    Búsqueda en {pharm}
                  </a>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="bg-slate-900 text-white py-24 text-center mt-20">
        <div className="container mx-auto px-6">
          <div className="text-4xl font-black mb-12 tracking-tighter">MediCompare</div>
          <div className="pt-10 border-t border-slate-800">
            <div className="text-xl font-black text-slate-400">Diseñado por <span className="text-[#0d9488]">Randall Castro Arias</span></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
