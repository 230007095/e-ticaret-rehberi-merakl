
export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  firm: string;
  stock: number;
  sku: string;
  description: string;
}

// Örnek ürün verileri - FeaturedProducts.tsx dosyasından kopyalandı
export const dummyProducts: Product[] = [
  {
    id: 1,
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
    id: 2,
    name: "Paslanmaz Çelik Menteşe HB.25",
    price: 249.99,
    oldPrice: 349.99,
    image: "https://images.unsplash.com/photo-1574359173043-01fe81602379?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    rating: 4,
    firm: "Elesa Ganter",
    stock: 78,
    sku: "EG-PCM-25-002",
    description: "AISI 316 paslanmaz çelikten üretilen, ağır yük kapasiteli menteşe. Yüksek korozyon direnci ve dayanıklılık sağlar."
  },
  {
    id: 3,
    name: "Yaylı Pim DIN.1481",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1590959651373-a3db0f38a961?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    rating: 5,
    firm: "Halder",
    stock: 150,
    sku: "HA-YP-1481-003",
    description: "DIN 1481 standardına uygun, çeşitli çaplarda ve uzunluklarda yaylı pim. Geçici ve kalıcı bağlantılar için ideal."
  },
  {
    id: 4,
    name: "Pozisyon Göstergesi DD.52",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    rating: 4,
    firm: "Kipp",
    stock: 35,
    sku: "KP-PG-52-004",
    description: "Dijital pozisyon göstergesi, hareket yönü ve konumlandırma için hassas okuma sağlar. Kolay montaj ve kullanım."
  },
  {
    id: 5,
    name: "Sıkıştırma Kolu GN.300",
    price: 179.99,
    oldPrice: 249.99,
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    rating: 4.5,
    firm: "Elesa Ganter",
    stock: 57,
    sku: "EG-SK-300-005",
    description: "Ergonomik tasarımlı sıkıştırma kolu, rahat kavrama ve yüksek sıkıştırma kuvveti sağlar. Çeşitli endüstriyel uygulamalarda kullanılır."
  },
  {
    id: 6,
    name: "Ayarlanabilir Ayak LV.F",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1570937943-0e29465a13bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    rating: 3.5,
    firm: "Schmalz",
    stock: 62,
    sku: "SC-AA-F-006",
    description: "Makineler için yüksekliği ayarlanabilir ayak. Anti-titreşim özellikleri ile makine stabilitesini artırır."
  },
  {
    id: 7,
    name: "Linear Hareket Kelepçesi",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1615948165701-07116d84171c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    rating: 4.5,
    firm: "Winkel",
    stock: 40,
    sku: "WN-LHK-007",
    description: "Linear hareket sistemleri için hassas kelepçe. Kolay montaj ve ayarlama imkanı sunar."
  },
  {
    id: 8,
    name: "Vidalı Mil TR.20x4",
    price: 299.99,
    oldPrice: 449.99,
    image: "https://images.unsplash.com/photo-1647607468858-0dcb7583501e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    rating: 4,
    firm: "Norelem",
    stock: 28,
    sku: "NO-VM-20-008",
    description: "Trapez vidalı mil, hassas hareket ve konumlandırma için ideal. Yüksek yük kapasitesi ve uzun kullanım ömrü sunar."
  },
  {
    id: 9,
    name: "Yüksek Hassasiyetli Rulman",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1532615026289-513e2b42c909?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    rating: 4.5,
    firm: "Halder",
    stock: 15,
    sku: "HA-YHR-009",
    description: "Yüksek hız ve yük kapasitesine sahip hassas rulman. Düşük sürtünme ve uzun ömür sunar."
  },
  {
    id: 10,
    name: "Paslanmaz Çelik Bağlantı Elemanı",
    price: 129.99,
    oldPrice: 179.99,
    image: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    rating: 4,
    firm: "Elesa Ganter",
    stock: 55,
    sku: "EG-PCBE-010",
    description: "AISI 316 paslanmaz çelikten üretilen bağlantı elemanı. Yüksek korozyon direnci ve dayanıklılık sağlar."
  },
  {
    id: 11,
    name: "Dijital Ölçüm Cihazı",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1544137829-948d84ee3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    rating: 5,
    firm: "Kipp",
    stock: 8,
    sku: "KP-DOC-011",
    description: "Yüksek hassasiyetli dijital ölçüm cihazı. 0.001mm hassasiyet, veri aktarım özelliği."
  },
  {
    id: 12,
    name: "Pnömatik Silindir",
    price: 349.99,
    oldPrice: 429.99,
    image: "https://images.unsplash.com/photo-1665669923926-5f493b9e9922?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    rating: 4,
    firm: "Schmalz",
    stock: 22,
    sku: "SC-PS-012",
    description: "Çift etkili pnömatik silindir, standart montaj seçenekleri ile çeşitli uygulamalar için uygundur."
  }
];

export const getFilteredProducts = (
  products: Product[],
  searchQuery: string,
  selectedFirm: string,
  priceRange: number[],
  sortOption: string
): Product[] => {
  let result = [...products];
  
  // Arama filtresi
  if (searchQuery) {
    result = result.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  // Firma filtresi
  if (selectedFirm !== "Tümü") {
    result = result.filter(product => product.firm === selectedFirm);
  }
  
  // Fiyat aralığı filtresi
  result = result.filter(product => 
    product.price >= priceRange[0] && product.price <= priceRange[1]
  );
  
  // Sıralama
  switch (sortOption) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      result.sort((a, b) => b.name.localeCompare(a.name));
      break;
    // featured veya varsayılan durumda sıralama yok
  }
  
  return result;
};
