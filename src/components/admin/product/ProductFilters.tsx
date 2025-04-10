
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  firmFilter: string;
  setFirmFilter: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  firms: string[];
  categories: string[];
  clearFilters: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  firmFilter,
  setFirmFilter,
  categoryFilter,
  setCategoryFilter,
  firms,
  categories,
  clearFilters,
}) => {
  return (
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
      <div className="relative w-full md:w-64">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Ürün ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>
      
      <Select value={firmFilter} onValueChange={setFirmFilter}>
        <SelectTrigger className="w-full md:w-48">
          <SelectValue placeholder="Firma Filtrele" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Tüm Firmalar</SelectItem>
          {firms.map(firm => (
            <SelectItem key={firm} value={firm}>{firm}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select 
        value={categoryFilter} 
        onValueChange={setCategoryFilter} 
        disabled={!categories.length}
      >
        <SelectTrigger className="w-full md:w-48">
          <SelectValue placeholder="Kategori Filtrele" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Tüm Kategoriler</SelectItem>
          {categories.map(category => (
            <SelectItem key={category} value={category}>{category}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {(searchTerm || firmFilter || categoryFilter) && (
        <Button variant="ghost" onClick={clearFilters} className="flex-shrink-0">
          Filtreleri Temizle
        </Button>
      )}
    </div>
  );
};

export default ProductFilters;
