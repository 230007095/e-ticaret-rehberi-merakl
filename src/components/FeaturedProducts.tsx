
import { useState } from "react";
import ProductCard from "./ProductCard";

// Örnek ürün verileri - daha detaylı hale getirildi
const dummyProducts = [
  {
    id: 1,
    name: "Ayarlanabilir Kol GN.15",
    price: 899.99,
    oldPrice: 1299.99,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
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
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1057&q=80",
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
    image: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
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
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
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
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
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
    image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
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
    image: "https://images.unsplash.com/photo-1608354580875-30bd4168b351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
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
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1036&q=80",
    rating: 4,
    firm: "Norelem",
    stock: 28,
    sku: "NO-VM-20-008",
    description: "Trapez vidalı mil, hassas hareket ve konumlandırma için ideal. Yüksek yük kapasitesi ve uzun kullanım ömrü sunar."
  }
];

const FeaturedProducts = () => {
  const [products, setProducts] = useState(dummyProducts);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          oldPrice={product.oldPrice}
          image={product.image}
          rating={product.rating}
          firm={product.firm}
        />
      ))}
    </div>
  );
};

export default FeaturedProducts;
