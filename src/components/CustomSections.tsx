import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface CustomSection {
  id: string;
  titulo: string;
  contenido: string;
  tipo: 'text' | 'video' | 'image' | 'html';
  url_video: string;
  url_imagen: string;
  visible: boolean;
  orden: number;
}

export default function CustomSections() {
  const [sections, setSections] = useState<CustomSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSections();
  }, []);

  const loadSections = async () => {
    try {
      const { data, error } = await supabase
        .from('custom_sections')
        .select('*')
        .eq('visible', true)
        .order('orden', { ascending: true });

      if (error) {
        // Table might not exist yet - that's ok, just don't show anything
        console.log('Custom sections table not found or empty');
        setSections([]);
        setLoading(false);
        return;
      }

      if (data) {
        setSections(data);
      }
    } catch (error) {
      console.log('Custom sections not available');
      setSections([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return null;
  }

  if (sections.length === 0) {
    return null;
  }

  const renderContent = (section: CustomSection) => {
    switch (section.tipo) {
      case 'video':
        if (section.url_video) {
          let videoUrl = section.url_video;
          let embedUrl = '';

          // YouTube
          if (videoUrl.includes('youtube.com/watch') || videoUrl.includes('youtu.be/')) {
            let videoId = '';
            if (videoUrl.includes('youtube.com/watch')) {
              videoId = videoUrl.split('v=')[1]?.split('&')[0];
            } else if (videoUrl.includes('youtu.be/')) {
              videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0];
            }
            embedUrl = `https://www.youtube.com/embed/${videoId}`;
          }
          // Instagram
          else if (videoUrl.includes('instagram.com')) {
            // Instagram posts need to be embedded via their embed code
            // We'll try to extract the post ID
            const match = videoUrl.match(/\/p\/([A-Za-z0-9_-]+)/);
            if (match) {
              embedUrl = `https://www.instagram.com/p/${match[1]}/embed`;
            }
          }
          // Facebook
          else if (videoUrl.includes('facebook.com') || videoUrl.includes('fb.watch')) {
            // Convert Facebook video URL to embed URL
            if (videoUrl.includes('facebook.com/watch')) {
              const videoId = videoUrl.split('v=')[1]?.split('&')[0];
              embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(videoUrl)}`;
            } else if (videoUrl.includes('fb.watch')) {
              embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(videoUrl)}`;
            } else {
              embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(videoUrl)}`;
            }
          }
          // Direct embed URL
          else if (videoUrl.includes('embed')) {
            embedUrl = videoUrl;
          }

          if (embedUrl) {
            return (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-slate-900">
                <iframe
                  src={embedUrl + (embedUrl.includes('?') ? '&' : '?') + 'autoplay=1&mute=1'}
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            );
          }
        }
        return null;

      case 'image':
        if (section.url_imagen) {
          return (
            <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
              <img
                src={section.url_imagen}
                alt={section.titulo}
                className="w-full h-full object-cover"
              />
            </div>
          );
        }
        return null;

      case 'html':
        return (
          <div 
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: section.contenido }}
          />
        );

      case 'text':
      default:
        return (
          <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">
            {section.contenido}
          </p>
        );
    }
  };

  return (
    <section className="py-10 md:py-16 px-3 md:px-6">
      <div className="container mx-auto">
        {sections.map((section) => (
          <div key={section.id} className="mb-12">
            {section.titulo && (
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-slate-50">
                {section.titulo}
              </h2>
            )}
            <div className="max-w-4xl mx-auto">
              {renderContent(section)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}