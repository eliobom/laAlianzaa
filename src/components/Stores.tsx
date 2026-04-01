import { useEffect, useState } from 'react';
import { ExternalLink, Store as StoreIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Store {
  id: string;
  nombre: string;
  url: string;
  logo_url: string;
  orden: number;
}

export default function Stores() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    try {
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .eq('activo', true)
        .order('orden', { ascending: true });

      if (error) {
        throw error;
      }
      if (data) {
        setStores(data);
      }
    } catch (error) {
      console.error('Error loading stores:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="container mx-auto text-center">
          <div className="animate-pulse text-slate-400">Cargando tiendas...</div>
        </div>
      </section>
    );
  }

  if (stores.length === 0) {
    // Mostrar tiendas por defecto si no hay datos
    return (
      <section id="tiendas" className="py-10 md:py-16 px-3 md:px-6">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-6 md:mb-10 text-slate-50">
            Nuestras <span className="text-yellow-500">Tiendas</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
            <a
              href="#"
              className="bg-slate-900/60 border border-slate-800 p-5 md:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 group backdrop-blur"
            >
              <div className="flex items-center justify-center w-14 h-14 md:w-20 md:h-20 bg-yellow-400 rounded-full mb-4 md:mb-6 mx-auto group-hover:bg-yellow-500 transition-colors">
                <StoreIcon size={28} className="md:w-10 md:h-10 text-gray-900" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-center mb-3 md:mb-4 text-slate-50 group-hover:text-yellow-400 transition-colors">
                Tienda Centro
              </h3>
              <div className="flex items-center justify-center gap-1 md:gap-2 text-slate-300 group-hover:text-yellow-400 transition-colors">
                <span className="text-xs md:text-sm">Visitar sitio</span>
                <ExternalLink size={14} className="md:w-4 md:h-4" />
              </div>
            </a>

            <a
              href="#"
              className="bg-slate-900/60 border border-slate-800 p-5 md:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 group backdrop-blur"
            >
              <div className="flex items-center justify-center w-14 h-14 md:w-20 md:h-20 bg-yellow-400 rounded-full mb-4 md:mb-6 mx-auto group-hover:bg-yellow-500 transition-colors">
                <StoreIcon size={28} className="md:w-10 md:h-10 text-gray-900" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-center mb-3 md:mb-4 text-slate-50 group-hover:text-yellow-400 transition-colors">
                Tienda Norte
              </h3>
              <div className="flex items-center justify-center gap-1 md:gap-2 text-slate-300 group-hover:text-yellow-400 transition-colors">
                <span className="text-xs md:text-sm">Visitar sitio</span>
                <ExternalLink size={14} className="md:w-4 md:h-4" />
              </div>
            </a>

            <a
              href="#"
              className="bg-slate-900/60 border border-slate-800 p-5 md:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 group backdrop-blur"
            >
              <div className="flex items-center justify-center w-14 h-14 md:w-20 md:h-20 bg-yellow-400 rounded-full mb-4 md:mb-6 mx-auto group-hover:bg-yellow-500 transition-colors">
                <StoreIcon size={28} className="md:w-10 md:h-10 text-gray-900" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-center mb-3 md:mb-4 text-slate-50 group-hover:text-yellow-400 transition-colors">
                Tienda Sur
              </h3>
              <div className="flex items-center justify-center gap-1 md:gap-2 text-slate-300 group-hover:text-yellow-400 transition-colors">
                <span className="text-xs md:text-sm">Visitar sitio</span>
                <ExternalLink size={14} className="md:w-4 md:h-4" />
              </div>
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="tiendas" className="py-10 md:py-16 px-3 md:px-6">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-6 md:mb-10 text-slate-50">
          Nuestras <span className="text-yellow-500">Tiendas</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {stores.map((store) => (
            <a
              key={store.id}
              href={store.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900/60 border border-slate-800 p-5 md:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 group backdrop-blur"
            >
              <div className="flex items-center justify-center w-14 h-14 md:w-20 md:h-20 bg-yellow-400 rounded-full mb-4 md:mb-6 mx-auto group-hover:bg-yellow-500 transition-colors">
                {store.logo_url ? (
                  <img
                    src={store.logo_url}
                    alt={store.nombre}
                    className="w-10 h-10 md:w-12 md:h-12 object-contain"
                  />
                ) : (
                  <StoreIcon size={28} className="md:w-10 md:h-10 text-gray-900" />
                )}
              </div>

              <h3 className="text-lg md:text-2xl font-bold text-center mb-3 md:mb-4 text-slate-50 group-hover:text-yellow-400 transition-colors">
                {store.nombre}
              </h3>

              <div className="flex items-center justify-center gap-1 md:gap-2 text-slate-300 group-hover:text-yellow-400 transition-colors">
                <span className="text-xs md:text-sm">Visitar sitio</span>
                <ExternalLink size={14} className="md:w-4 md:h-4" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
