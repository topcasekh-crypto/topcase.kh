import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, getCategories } from '@/lib/google-sheets';
import Navbar from 'src/components/Navbar';
import ProductCard from 'src/components/ProductCard';
import Footer from 'src/components/Footer';
import { Search } from 'lucide-react';

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const categories = getCategories(products);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'Все' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page header */}
          <div className="mb-10">
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight animate-fade-up">
              Каталог
            </h1>
            <p className="mt-3 text-white/40 text-lg animate-fade-up stagger-1">
              Исследуйте нашу коллекцию инновационных устройств
            </p>
          </div>

          {/* Search bar */}
          <div className="mb-8 animate-fade-up stagger-2">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl glass bg-white/[0.03] text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 transition-all duration-300"
              />
            </div>
          </div>

          {/* Category filters */}
          <div className="mb-10 animate-fade-up stagger-3">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                    activeCategory === category
                      ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.15)]'
                      : 'glass text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Products grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
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
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/30 text-lg">Товары не найдены</p>
              <p className="text-white/20 text-sm mt-2">Попробуйте изменить фильтры или поисковый запрос</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}

          {/* Results count */}
          {!isLoading && filteredProducts.length > 0 && (
            <div className="mt-8 text-center">
              <p className="text-xs text-white/20">
                Показано {filteredProducts.length} из {products.length} товаров
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}