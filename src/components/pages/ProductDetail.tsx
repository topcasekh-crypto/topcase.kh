import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/lib/google-sheets';
import Navbar from 'src/components/Navbar';
import Footer from 'src/components/Footer';
import { ArrowLeft, Package, Truck, Shield } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const product = products.find((p) => p.id === id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-white/10 rounded-lg w-32" />
            <div className="aspect-[16/9] bg-white/5 rounded-3xl" />
            <div className="space-y-4">
              <div className="h-10 bg-white/10 rounded-lg w-2/3" />
              <div className="h-5 bg-white/5 rounded-lg w-full" />
              <div className="h-5 bg-white/5 rounded-lg w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 px-4 flex flex-col items-center justify-center min-h-[60vh]">
          <p className="text-white/40 text-lg mb-4">Товар не найден</p>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-sm text-white/70 hover:text-white transition-all duration-300 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Вернуться в каталог
          </Link>
        </div>
      </div>
    );
  }

  const specs = product.specs ? product.specs.split('•').map(s => s.trim()).filter(Boolean) : [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back button */}
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors duration-300 mb-8 cursor-pointer group animate-fade-in"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Назад в каталог
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Product image */}
            <div className="animate-fade-up">
              <div className="relative glass-card rounded-3xl overflow-hidden aspect-square">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-2xl" />
                  </div>
                )}

                {/* Category badge */}
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 rounded-full glass text-xs font-medium text-white/80 uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Product info */}
            <div className="flex flex-col justify-center">
              <div className="animate-fade-up stagger-1">
                <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
                  {product.name}
                </h1>

                <p className="text-2xl font-semibold text-white/90 mb-6">
                  {product.price}
                </p>

                <p className="text-base text-white/50 leading-relaxed mb-8">
                  {product.description}
                </p>
              </div>

              {/* Specs */}
              {specs.length > 0 && (
                <div className="animate-fade-up stagger-2 mb-8">
                  <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-4">
                    Характеристики
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {specs.map((spec, i) => (
                      <div
                        key={i}
                        className="glass rounded-xl px-4 py-3 text-sm text-white/70"
                      >
                        {spec}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="animate-fade-up stagger-3 space-y-3">
                {[
                  { icon: Package, text: 'Оригинальный товар с гарантией' },
                  { icon: Truck, text: 'Бесплатная доставка от ₽10 000' },
                  { icon: Shield, text: 'Гарантия возврата 14 дней' },
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-white/40">
                    <feature.icon className="w-4 h-4 text-blue-400/70" />
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Contact CTA */}
              <div className="animate-fade-up stagger-4 mt-10">
                <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-medium text-sm transition-all duration-300 hover:bg-white/90 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] cursor-pointer">
                  Связаться для заказа
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}