
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  category: string;
}

const ProductCard = ({ id, name, price, oldPrice, image, rating, category }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const addToCart = () => {
    toast({
      title: "Sepete Eklendi",
      description: `${name} ürünü sepete eklendi.`,
    });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Favorilerden Çıkarıldı" : "Favorilere Eklendi",
      description: `${name} ürünü ${isFavorite ? "favorilerden çıkarıldı" : "favorilere eklendi"}.`,
    });
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative">
        <Link to={`/products/${id}`}>
          <img 
            src={image} 
            alt={name} 
            className="w-full h-48 object-cover object-center transition-transform duration-300 hover:scale-105"
          />
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 bg-white/70 hover:bg-white/90 text-gray-700"
          onClick={toggleFavorite}
        >
          <Heart className={isFavorite ? "fill-red-500 text-red-500" : ""} size={18} />
        </Button>
        {oldPrice && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
            İndirim
          </div>
        )}
      </div>
      
      <CardContent className="pt-4 flex-grow">
        <div className="text-sm text-gray-500 mb-1">{category}</div>
        <Link to={`/products/${id}`} className="hover:underline">
          <h3 className="font-semibold mb-2 line-clamp-2 h-12">{name}</h3>
        </Link>
        
        <div className="flex items-baseline mt-2">
          <span className="text-lg font-bold">{price.toLocaleString('tr-TR')} ₺</span>
          {oldPrice && (
            <span className="text-sm text-gray-500 line-through ml-2">
              {oldPrice.toLocaleString('tr-TR')} ₺
            </span>
          )}
        </div>
        
        <div className="flex mt-2">
          {[...Array(5)].map((_, i) => (
            <svg 
              key={i} 
              className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          className="w-full" 
          onClick={addToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Sepete Ekle
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
