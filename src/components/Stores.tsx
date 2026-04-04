import { useEffect, useState } from 'react';
import { ExternalLink, Store as StoreIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Store {
  id: string;
  nombre: string;
  url: string;
  logo_url: string;
  orden: number;
  direccion: string;
  horarios: string;
  venta_mayor: string;
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
    return (
      <section id="tiendas" className="py-10 md:py-16 px-3 md:px-6">
        <div className="container mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold text-center mb-2 text-slate-50">
            ¿Dónde quieres comprar?
          </h2>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-6 md:mb-10 text-slate-50">
            Nuestras <span className="text-yellow-500">Tiendas</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
            <a
              href="#"
              className="group bg-slate-900/60 border border-slate-800 p-5 md:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 backdrop-blur flex flex-col"
            >
              <div className="flex items-center justify-center w-full h-32 md:h-40 bg-slate-800/50 rounded-lg mb-4 overflow-hidden group-hover:bg-slate-800 transition-colors">
                <StoreIcon size={48} className="text-yellow-400" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-center mb-3 md:mb-4 text-slate-50 group-hover:text-yellow-400 transition-colors duration-300">
                Tienda Centro
              </h3>
              <div className="flex items-center justify-center gap-1 md:gap-2 text-slate-400 group-hover:text-yellow-400 transition-colors duration-300 mt-auto">
                <span className="text-xs md:text-sm font-medium">Visitar sitio</span>
                <ExternalLink size={14} className="md:w-4 md:h-4" />
              </div>
            </a>

            <a
              href="#"
              className="group bg-slate-900/60 border border-slate-800 p-5 md:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 backdrop-blur flex flex-col"
            >
              <div className="flex items-center justify-center w-full h-32 md:h-40 bg-slate-800/50 rounded-lg mb-4 overflow-hidden group-hover:bg-slate-800 transition-colors">
                <StoreIcon size={48} className="text-yellow-400" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-center mb-3 md:mb-4 text-slate-50 group-hover:text-yellow-400 transition-colors duration-300">
                Tienda Norte
              </h3>
              <div className="flex items-center justify-center gap-1 md:gap-2 text-slate-400 group-hover:text-yellow-400 transition-colors duration-300 mt-auto">
                <span className="text-xs md:text-sm font-medium">Visitar sitio</span>
                <ExternalLink size={14} className="md:w-4 md:h-4" />
              </div>
            </a>

            <a
              href="#"
              className="group bg-slate-900/60 border border-slate-800 p-5 md:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 backdrop-blur flex flex-col"
            >
              <div className="flex items-center justify-center w-full h-32 md:h-40 bg-slate-800/50 rounded-lg mb-4 overflow-hidden group-hover:bg-slate-800 transition-colors">
                <StoreIcon size={48} className="text-yellow-400" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-center mb-3 md:mb-4 text-slate-50 group-hover:text-yellow-400 transition-colors duration-300">
                Tienda Sur
              </h3>
              <div className="flex items-center justify-center gap-1 md:gap-2 text-slate-400 group-hover:text-yellow-400 transition-colors duration-300 mt-auto">
                <span className="text-xs md:text-sm font-medium">Visitar sitio</span>
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
        <h2 className="text-xl md:text-2xl font-semibold text-center mb-2 text-slate-50">
          ¿Dónde quieres comprar?
        </h2>
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
              className="group bg-slate-900/60 border border-slate-800 p-5 md:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 backdrop-blur flex flex-col"
            >
              {store.logo_url && (
                <div className="flex items-center justify-center w-full h-32 md:h-40 bg-slate-800/50 rounded-lg mb-4 overflow-hidden group-hover:bg-slate-800 transition-colors">
                  <img
                    src={store.logo_url}
                    alt={store.nombre}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
              )}

              <h3 className="text-lg md:text-2xl font-bold text-center mb-3 md:mb-4 text-slate-50 group-hover:text-yellow-400 transition-colors duration-300">
                {store.nombre}
              </h3>

              {store.direccion && (
                <p className="text-sm text-slate-300 text-center mb-1">
                  <span className="text-yellow-500">Dirección:</span> {store.direccion}
                </p>
              )}

              {store.horarios && (
                <p className="text-sm text-yellow-500 text-center mb-1 whitespace-pre-line">
                  <span className="text-yellow-400">Horario:</span> {store.horarios}
                </p>
              )}

              {store.venta_mayor && (
                <p className="text-sm text-green-400 text-center mb-3">{store.venta_mayor}</p>
              )}

              <div className="flex items-center justify-center gap-1 md:gap-2 text-slate-400 group-hover:text-yellow-400 transition-colors duration-300 mt-auto">
                <span className="text-xs md:text-sm font-medium">Visitar sitio</span>
                <ExternalLink size={14} className="md:w-4 md:h-4" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
