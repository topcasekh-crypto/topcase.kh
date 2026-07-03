export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  specs?: string;
}

const GOOGLE_SHEETS_API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY || '';
const SPREADSHEET_ID = import.meta.env.VITE_GOOGLE_SPREADSHEET_ID || '';
const SHEET_NAME = import.meta.env.VITE_GOOGLE_SHEET_NAME || 'Sheet1';

// Demo products for when Google Sheets is not configured
const demoProducts: Product[] = [
  {
    id: '1',
    name: 'AirPods Pro Max',
    description: 'Персональное аудио высочайшего класса. Активное шумоподавление, пространственное аудио и непревзойдённое качество звука в элегантном дизайне.',
    price: '₽79 990',
    category: 'Аудио',
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/1395071/2026-07-02/rxcbdsycairq/product-headphones-premium.png',
    specs: 'Чип H2 • Адаптивное шумоподавление • До 30 часов работы • USB-C зарядка'
  },
  {
    id: '2',
    name: 'Ultra Watch Series X',
    description: 'Самые продвинутые смарт-часы. Титановый корпус, яркий Always-On дисплей и передовые датчики здоровья для активного образа жизни.',
    price: '₽119 990',
    category: 'Часы',
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/1395071/2026-07-02/rxcbebycaira/product-smartwatch-titanium.png',
    specs: 'Титан Grade 5 • 2000 нит яркость • GPS L1+L5 • Глубиномер до 40м'
  },
  {
    id: '3',
    name: 'MacVision Pro',
    description: 'Революционное пространственное устройство. Объединяет цифровой контент с физическим миром, создавая бесконечное рабочее пространство.',
    price: '₽499 990',
    category: 'Компьютеры',
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/1395071/2026-07-02/rxcbeoqcaisq/product-vr-headset-glass.png',
    specs: 'Чип M4 • Micro-OLED 23 млн пикселей • 12 камер • Пространственное аудио'
  },
  {
    id: '4',
    name: 'PowerBook Air M4',
    description: 'Невероятно тонкий и мощный. Новый чип M4 обеспечивает производительность настольного компьютера в самом лёгком ноутбуке в мире.',
    price: '₽189 990',
    category: 'Компьютеры',
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/1395071/2026-07-02/rxcbe5icaisa/product-laptop-ultraslim.png',
    specs: 'Чип M4 • 18 часов работы • Liquid Retina XDR • 8 ГБ unified memory'
  },
  {
    id: '5',
    name: 'HomePod Ultra',
    description: 'Домашняя аудиосистема нового поколения. Пространственное аудио с отслеживанием головы и интеллектуальная адаптация к помещению.',
    price: '₽49 990',
    category: 'Аудио',
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/1395071/2026-07-02/rxcbdsycairq/product-headphones-premium.png',
    specs: 'Чип S4 • 7 твитеров • Dolby Atmos • Thread/Matter • Siri'
  },
  {
    id: '6',
    name: 'iPad Pro M4',
    description: 'Самый мощный iPad. Tandem OLED дисплей с невероятной яркостью и контрастностью. Тоньше iPod nano.',
    price: '₽159 990',
    category: 'Планшеты',
    image: 'https://mgx-backend-cdn.metadl.com/generate/images/1395071/2026-07-02/rxcbe5icaisa/product-laptop-ultraslim.png',
    specs: 'Чип M4 • Ultra Retina XDR • Apple Pencil Pro • Nano-текстурное стекло'
  }
];

export async function fetchProducts(): Promise<Product[]> {
  if (!GOOGLE_SHEETS_API_KEY || !SPREADSHEET_ID) {
    return demoProducts;
  }

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${GOOGLE_SHEETS_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.warn('Google Sheets API error, using demo data');
      return demoProducts;
    }

    const data = await response.json();
    const rows = data.values;

    if (!rows || rows.length < 2) {
      return demoProducts;
    }

    // First row is headers: id, name, description, price, category, image, specs
    const headers = rows[0].map((h: string) => h.toLowerCase().trim());
    const products: Product[] = [];

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const product: Product = {
        id: row[headers.indexOf('id')] || String(i),
        name: row[headers.indexOf('name')] || '',
        description: row[headers.indexOf('description')] || '',
        price: row[headers.indexOf('price')] || '',
        category: row[headers.indexOf('category')] || '',
        image: row[headers.indexOf('image')] || '',
        specs: row[headers.indexOf('specs')] || '',
      };
      if (product.name) {
        products.push(product);
      }
    }

    return products.length > 0 ? products : demoProducts;
  } catch (error) {
    console.warn('Failed to fetch from Google Sheets, using demo data:', error);
    return demoProducts;
  }
}

export function getCategories(products: Product[]): string[] {
  const categories = new Set(products.map(p => p.category));
  return ['Все', ...Array.from(categories)];
}