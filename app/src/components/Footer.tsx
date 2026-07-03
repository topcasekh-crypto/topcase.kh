import { ShoppingBag } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <ShoppingBag className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-medium text-white/70">LiquidStore</span>
          </div>

          <p className="text-xs text-white/30">
            © 2026 LiquidStore. Все права защищены. Каталог товаров.
          </p>
        </div>
      </div>
    </footer>
  );
}