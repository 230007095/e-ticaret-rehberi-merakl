
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

// Örnek ürün verileri
const dummyProducts = [
  {
    id: 1,
    name: "Ayarlanabilir Kol",
    price: 899.99,
    oldPrice: 1299.99,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    rating: 4.5,
    firm: "Elesa Ganter"
  },
  {
    id: 2,
    name: "Paslanmaz Çelik Menteşe",
    price: 249.99,
    oldPrice: 349.99,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1057&q=80",
    rating: 4,
    firm: "Elesa Ganter"
  },
  {
    id: 3,
    name: "Yaylı Pim",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
    rating: 5,
    firm: "Halder"
  },
  {
    id: 4,
    name: "Pozisyon Göstergesi",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4,
    firm: "Kipp"
  },
  {
    id: 5,
    name: "Sıkıştırma Kolu",
    price: 179.99,
    oldPrice: 249.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
    rating: 4.5,
    firm: "Elesa Ganter"
  },
  {
    id: 6,
    name: "Ayarlanabilir Ayak",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    rating: 3.5,
    firm: "Schmalz"
  },
  {
    id: 7,
    name: "Kelepçe",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1608354580875-30bd4168b351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    rating: 4.5,
    firm: "Winkel"
  },
  {
    id: 8,
    name: "Vidalı Mil",
    price: 299.99,
    oldPrice: 449.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1036&q=80",
    rating: 4,
    firm: "Norelem"
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
