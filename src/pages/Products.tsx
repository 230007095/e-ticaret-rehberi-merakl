
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductsFilter from "@/components/products/ProductsFilter";
import ProductsList from "@/components/products/ProductsList";
import { useProductFilters } from "@/hooks/useProductFilters";
import { Product, getProducts } from "@/services/productService";

const Products = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";
  const [initialProducts, setInitialProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize products from database
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      const products = await getProducts();
      setInitialProducts(products);
      setIsLoading(false);
    };
    
    loadProducts();
  }, []);
  
  const {
    searchQuery: filterSearchQuery,
    setSearchQuery,
    selectedFirm,
    setSelectedFirm,
    priceRange,
    setPriceRange,
    sortOption,
    setSortOption,
    filteredProducts,
    resetFilters,
    loading: filterLoading
  } = useProductFilters(initialProducts);
  
  // URL'den gelen arama sorgusunu filtre state'ine ayarla
  useEffect(() => {
    if (searchQuery) {
      setSearchQuery(searchQuery);
    }
  }, [searchQuery, setSearchQuery]);

  const loading = isLoading || filterLoading;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Ürünler</h1>
        
        {/* Filtre Alanı */}
        <ProductsFilter
          searchQuery={filterSearchQuery}
          setSearchQuery={setSearchQuery}
          selectedFirm={selectedFirm}
          setSelectedFirm={setSelectedFirm}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          sortOption={sortOption}
          setSortOption={setSortOption}
          resetFilters={resetFilters}
        />
        
        {/* Ürün Listesi */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse text-center">
              <p className="text-lg font-medium text-gray-500">Ürünler yükleniyor...</p>
            </div>
          </div>
        ) : (
          <ProductsList
            products={filteredProducts.map(product => ({
              ...product,
              id: Number(product.id) // Convert string ID to number for ProductsList
            }))}
            resetFilters={resetFilters}
          />
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Products;
