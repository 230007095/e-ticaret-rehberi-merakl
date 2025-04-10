
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

export interface Product {
  id: string | number;
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

interface ProductsListProps {
  products: Product[];
  resetFilters: () => void;
}

const ProductsList = ({ products, resetFilters }: ProductsListProps) => {
  return (
    <>
      <div className="mb-4">
        <p className="text-sm text-gray-500">{products.length} ürün bulundu</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard 
              key={product.id}
              id={typeof product.id === 'string' ? parseInt(product.id, 10) : product.id}
              name={product.name}
              price={product.price}
              oldPrice={product.oldPrice}
              image={product.image}
              rating={product.rating}
              firm={product.firm}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">Aradığınız kriterlere uygun ürün bulunamadı.</p>
            <Button variant="link" onClick={resetFilters}>
              Filtreleri sıfırlayın
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductsList;
