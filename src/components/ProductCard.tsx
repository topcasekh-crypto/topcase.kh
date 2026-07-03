import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Product } from '@/lib/google-sheets';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <Link
      to={`/product/${product.id}`}
      className={`group block animate-fade-up cursor-pointer`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative glass-card rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02]">
        {/* Product image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-white/5 to-transparent">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl" />
            </div>
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Arrow icon on hover */}
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>

          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full glass text-[11px] font-medium text-white/80 uppercase tracking-wider">
              {product.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-sm text-white/50 line-clamp-2 mb-4 leading-relaxed">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-white/90">
              {product.price}
            </span>
            <span className="text-xs text-white/40 font-medium uppercase tracking-wider group-hover:text-blue-400/70 transition-colors duration-300">
              Подробнее →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}