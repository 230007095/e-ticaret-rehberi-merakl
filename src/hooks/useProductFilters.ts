
import { useState, useEffect } from "react";
import { Product, getFilteredProducts } from "@/services/productService";

export const useProductFilters = (initialProducts: Product[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFirm, setSelectedFirm] = useState("Tümü");
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [sortOption, setSortOption] = useState("featured");
  const [loading, setLoading] = useState(false);

  // Fetch products from the database when filters change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const result = await getFilteredProducts(searchQuery, selectedFirm, priceRange, sortOption);
      setFilteredProducts(result);
      setLoading(false);
    };
    
    fetchProducts();
  }, [searchQuery, selectedFirm, priceRange, sortOption]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedFirm("Tümü");
    setPriceRange([0, 1500]);
    setSortOption("featured");
  };
  
  // Arama işlemini gerçekleştiren fonksiyon
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedFirm,
    setSelectedFirm,
    priceRange,
    setPriceRange,
    sortOption,
    setSortOption,
    filteredProducts,
    resetFilters,
    handleSearch,
    loading
  };
};
