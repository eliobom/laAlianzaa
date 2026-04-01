import { useEffect, useState } from 'react';
import { Facebook, Instagram, Youtube, Phone, MapPin, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface SiteSettings {
  [key: string]: string;
}

export default function Footer() {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('key, value');

      if (error) {
        throw error;
      }
      
      const settingsMap: SiteSettings = {};
      data?.forEach((item) => {
        settingsMap[item.key] = item.value;
      });
      setSettings(settingsMap);
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const showSocial = !settings || Object.keys(settings).length === 0 || settings.footer_show_social !== 'false';
  const showCeo = !settings || Object.keys(settings).length === 0 || settings.footer_show_ceo !== 'false';

  const socialLinks = [
    { key: 'social_facebook', icon: Facebook, label: 'Facebook' },
    { key: 'social_instagram', icon: Instagram, label: 'Instagram' },
    { key: 'social_youtube', icon: Youtube, label: 'YouTube' },
  ];

  if (loading) {
    return (
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-pulse text-gray-400">Cargando...</div>
        </div>
      </footer>
    );
  }

  // Mostrar contenido por defecto si no hay settings
  const hasSettings = Object.keys(settings).length > 0;

  return (
    <footer className="bg-gray-900 text-white py-8 md:py-12 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="mb-3 md:mb-4">
              <h3 className="text-xl md:text-2xl font-bold tracking-wider">LA ALIANZA</h3>
              <p className="text-xs md:text-sm tracking-widest text-gray-400">C A R N I C E R I A S</p>
            </div>
            <p className="text-gray-400 text-sm">
              {settings.footer_about_text || 'Las mejores carnes frescas en Santiago. Calidad y servicio garantizado.'}
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-yellow-400">Contacto</h4>
            <div className="space-y-2 text-sm md:text-base text-gray-300">
              {settings.contact_phone && (
                <div className="flex items-center gap-2">
                  <Phone size={14} className="md:w-4 text-yellow-400 flex-shrink-0" />
                  <a href={`tel:${settings.contact_phone}`} className="hover:text-white truncate">
                    {settings.contact_phone}
                  </a>
                </div>
              )}
              {settings.contact_whatsapp && (
                <div className="flex items-center gap-2">
                  <Phone size={14} className="md:w-4 text-yellow-400 flex-shrink-0" />
                  <a href={`https://wa.me/${settings.contact_whatsapp.replace(/\D/g, '')}`} className="hover:text-white">
                    WhatsApp: {settings.contact_whatsapp}
                  </a>
                </div>
              )}
              {settings.contact_email && (
                <div className="flex items-center gap-2">
                  <Mail size={14} className="md:w-4 text-yellow-400 flex-shrink-0" />
                  <a href={`mailto:${settings.contact_email}`} className="hover:text-white truncate">
                    {settings.contact_email}
                  </a>
                </div>
              )}
              {settings.contact_address && (
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="md:w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span>{settings.contact_address}</span>
                </div>
              )}
            </div>
          </div>

          {/* CEO Section */}
          {showCeo && (
            <div>
              <h4 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-yellow-400">Nuestro Líder</h4>
              <div className="flex items-start gap-3 md:gap-4">
                {settings.ceo_imagen && (
                  <img 
                    src={settings.ceo_imagen} 
                    alt={settings.ceo_nombre || 'CEO'}
                    className="w-14 h-14 md:w-20 md:h-20 rounded-full object-cover border-2 border-yellow-400 flex-shrink-0"
                    onError={(e) => { 
                      (e.target as HTMLImageElement).style.display = 'none'; 
                    }}
                  />
                )}
                <div>
                  <h5 className="font-bold text-white text-sm md:text-base">{settings.ceo_nombre || 'Juan Pérez'}</h5>
                  <p className="text-xs md:text-sm text-gray-400">Fundador y Director General</p>
                  {settings.ceo_descripcion && (
                    <p className="text-xs md:text-sm text-gray-300 mt-1 md:mt-2 line-clamp-2">{settings.ceo_descripcion}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Social Media */}
        {showSocial && (
          <div className="border-t border-gray-800 pt-6 md:pt-8 mb-6 md:mb-8">
            <h4 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-center text-yellow-400">Síguenos en Redes Sociales</h4>
            <div className="flex justify-center gap-4 md:gap-6">
              {socialLinks.map((social) => {
                const url = settings[social.key];
                if (!url) return null;
                
                const Icon = social.icon;
                return (
                  <a
                    key={social.key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gray-800 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon size={20} className="md:w-6 md:h-6" />
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-4 md:pt-6">
          <p className="text-center text-gray-400 text-xs md:text-sm">
            &copy; {new Date().getFullYear()} La Alianza Carnicerías. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
