import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  heroImage?: string;
}

export default function HeroSection({ heroImage }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 liquid-gradient opacity-50" />

      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      {/* Hero image background */}
      {heroImage && (
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <img
            src={heroImage}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <div className="animate-fade-up">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-medium text-white/70 tracking-wider uppercase mb-8">
            Новая коллекция 2026
          </span>
        </div>

        <h1 className="animate-fade-up stagger-1 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-6">
          <span className="text-gradient">Технологии</span>
          <br />
          <span className="text-white/90">будущего</span>
        </h1>

        <p className="animate-fade-up stagger-2 text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
          Откройте мир инновационных устройств, созданных для вдохновения.
          Каждый продукт — это совершенство дизайна и технологий.
        </p>

        <div className="animate-fade-up stagger-3 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/catalog"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-medium text-sm transition-all duration-300 hover:bg-white/90 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] cursor-pointer"
          >
            Смотреть каталог
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass text-white/80 font-medium text-sm transition-all duration-300 hover:bg-white/10 hover:text-white cursor-pointer"
          >
            Все категории
          </Link>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}