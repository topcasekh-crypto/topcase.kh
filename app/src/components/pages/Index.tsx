import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/lib/google-sheets';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Index() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <HeroSection heroImage="https://mgx-backend-cdn.metadl.com/generate/images/1395071/2026-07-02/rxcbczicaita/hero-liquid-glass-tech.png" />

      {/* Featured Products Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight animate-fade-up">
                Избранное
              </h2>
              <p className="mt-3 text-white/40 text-base animate-fade-up stagger-1">
                Лучшие продукты из нашего каталога
              </p>
            </div>
            <Link
              to="/catalog"
              className="hidden sm:inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-300 cursor-pointer group"
            >
              Все товары
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Products grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="glass-card rounded-3xl overflow-hidden animate-pulse">
                  <div className="aspect-[4/3] bg-white/5" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 bg-white/10 rounded-lg w-2/3" />
                    <div className="h-4 bg-white/5 rounded-lg w-full" />
                    <div className="h-4 bg-white/5 rounded-lg w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}

          {/* Mobile CTA */}
          <div className="mt-10 text-center sm:hidden">
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-sm text-white/70 hover:text-white transition-all duration-300 cursor-pointer"
            >
              Смотреть все товары
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 liquid-gradient opacity-30" />
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Премиум качество', desc: 'Только оригинальные продукты с гарантией производителя' },
              { title: 'Быстрая доставка', desc: 'Доставим в любую точку страны в кратчайшие сроки' },
              { title: 'Поддержка 24/7', desc: 'Наши специалисты всегда готовы помочь с выбором' },
            ].map((feature, i) => (
              <div
                key={i}
                className={`glass-card rounded-2xl p-8 animate-fade-up`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}