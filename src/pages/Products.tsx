
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductsFilter from "@/components/products/ProductsFilter";
import ProductsList from "@/components/products/ProductsList";
import { useProductFilters } from "@/hooks/useProductFilters";
import { dummyProducts } from "@/services/productService";

const Products = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";
  
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
    resetFilters
  } = useProductFilters(dummyProducts);
  
  // URL'den gelen arama sorgusunu filtre state'ine ayarla
  useEffect(() => {
    if (searchQuery) {
      setSearchQuery(searchQuery);
    }
  }, [searchQuery, setSearchQuery]);

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
        <ProductsList
          products={filteredProducts}
          resetFilters={resetFilters}
        />
      </div>
      
      <Footer />
    </div>
  );
};

export default Products;
