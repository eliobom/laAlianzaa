interface HeroProps {
  backgroundImageUrl?: string;
}

const DEFAULT_BACKGROUND = '/laali.jpeg';

export default function Hero({ backgroundImageUrl }: HeroProps) {
  const bgImage = backgroundImageUrl || DEFAULT_BACKGROUND;

  return (
    <section className="px-3 md:px-6 pt-4 md:pt-6">
      <div className="relative group overflow-hidden rounded-xl shadow-2xl border border-yellow-400/20 h-40 md:h-56 lg:h-72">
        <img
          src={bgImage}
          alt="La Alianza"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center px-6 py-4">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 tracking-wider drop-shadow-lg mb-2">
              LA ALIANZA
            </h1>
            <p className="text-sm md:text-xl lg:text-2xl font-medium text-white/90 tracking-[0.3em] drop-shadow-md">
              CARNICERÍAS
            </p>
            <div className="w-16 md:w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mt-3" />
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-r from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      </div>
    </section>
  );
}