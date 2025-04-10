import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Firma listesi
const firms = ["Tümü", "Elesa Ganter", "Halder", "Kipp", "Winkel", "Schmalz", "Norelem"];

interface ProductsFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFirm: string;
  setSelectedFirm: (firm: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
  resetFilters: () => void;
}

const ProductsFilter = ({
  searchQuery,
  setSearchQuery,
  selectedFirm,
  setSelectedFirm,
  priceRange,
  setPriceRange,
  sortOption,
  setSortOption,
  resetFilters
}: ProductsFilterProps) => {
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // URL'i güncelle
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg mb-8">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Ürün ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Button 
              type="submit" 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0 h-full"
            >
              <Search className="text-gray-400" size={18} />
            </Button>
          </form>
        </div>
        
        <div className="w-full md:w-48">
          <Select
            value={selectedFirm}
            onValueChange={setSelectedFirm}
          >
            <SelectTrigger>
              <SelectValue placeholder="Firma" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {firms.map((firm) => (
                  <SelectItem key={firm} value={firm}>
                    {firm}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-48">
          <Select
            value={sortOption}
            onValueChange={setSortOption}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sıralama" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="featured">Öne Çıkanlar</SelectItem>
                <SelectItem value="price-asc">Fiyat: Düşükten Yükseğe</SelectItem>
                <SelectItem value="price-desc">Fiyat: Yüksekten Düşüğe</SelectItem>
                <SelectItem value="name-asc">İsim: A-Z</SelectItem>
                <SelectItem value="name-desc">İsim: Z-A</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Fiyat Aralığı: {priceRange[0]} ₺ - {priceRange[1]} ₺</h3>
        <Slider
          defaultValue={[0, 1500]}
          max={1500}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="my-4"
        />
      </div>
      
      <div className="flex justify-end">
        <Button variant="outline" onClick={resetFilters}>
          Filtreleri Sıfırla
        </Button>
      </div>
    </div>
  );
};

export default ProductsFilter;
