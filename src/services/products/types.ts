
// Common product types used across the application

export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  firm: string;
  stock: number;
  sku: string;
  description: string;
  category?: string;
  subcategory?: string;
  firmId?: string;
  categoryId?: string;
}

// Provide some sample products for development/testing
export const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Ayarlanabilir Kol GN.15",
    price: 899.99,
    oldPrice: 1299.99,
    image: "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80",
    rating: 4.5,
    firm: "Elesa Ganter",
    stock: 42,
    sku: "EG-AK-15-001",
    description: "Endüstriyel uygulamalar için yüksek kaliteli ayarlanabilir kol. Paslanmaz çelik yapısı ile uzun ömürlü kullanım sağlar."
  },
  {
    id: "2",
    name: "Paslanmaz Çelik Menteşe HB.25",
    price: 249.99,
    oldPrice: 349.99,
    image: "https://images.unsplash.com/photo-1574359173043-01fe81602379?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    rating: 4,
    firm: "Elesa Ganter",
    stock: 78,
    sku: "EG-PCM-25-002",
    description: "AISI 316 paslanmaz çelikten üretilen, ağır yük kapasiteli menteşe. Yüksek korozyon direnci ve dayanıklılık sağlar."
  }
];
