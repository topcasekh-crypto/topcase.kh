import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Чистый рендер приложения без лишних конфигураций
createRoot(document.getElementById('root')!).render(<App />);