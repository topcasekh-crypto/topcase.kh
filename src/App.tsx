import { Toaster } from 'src/components/ui/sonner';
import { TooltipProvider } from 'src/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// ЗАМЕНИЛИ BrowserRouter на HashRouter вот здесь:
import { HashRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';

const queryClient = new QueryClient();

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/catalog" element={<Catalog />} />
    <Route path="/product/:id" element={<ProductDetail />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
export { AppRoutes };