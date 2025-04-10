
import { useState, useEffect } from "react";
import { Product, getFilteredProducts } from "@/services/productService";

export const useProductFilters = (initialProducts: Product[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFirm, setSelectedFirm] = useState("Tümü");
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [products] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [sortOption, setSortOption] = useState("featured");

  // Ürünleri filtreleyen fonksiyon
  useEffect(() => {
    const result = getFilteredProducts(
      products,
      searchQuery,
      selectedFirm,
      priceRange,
      sortOption
    );
    setFilteredProducts(result);
  }, [searchQuery, selectedFirm, priceRange, sortOption, products]);

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
    handleSearch
  };
};
