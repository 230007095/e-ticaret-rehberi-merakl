
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductFilterBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  firmFilter: string;
  setFirmFilter: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  clearFilters: () => void;
  uniqueFirms: string[];
  uniqueCategories: string[];
}

const ProductFilterBar = ({
  searchTerm,
  setSearchTerm,
  firmFilter,
  setFirmFilter,
  categoryFilter,
  setCategoryFilter,
  clearFilters,
  uniqueFirms,
  uniqueCategories,
}: ProductFilterBarProps) => {
  const hasActiveFilters = searchTerm || firmFilter || categoryFilter;

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
          <SelectItem value="all">Tüm Firmalar</SelectItem>
          {uniqueFirms.map(firm => (
            <SelectItem key={firm} value={firm}>{firm}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select 
        value={categoryFilter} 
        onValueChange={setCategoryFilter} 
        disabled={!uniqueCategories.length}
      >
        <SelectTrigger className="w-full md:w-48">
          <SelectValue placeholder="Kategori Filtrele" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tüm Kategoriler</SelectItem>
          {uniqueCategories.map(category => (
            <SelectItem key={category} value={category}>{category}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {hasActiveFilters && (
        <Button variant="ghost" onClick={clearFilters} className="flex-shrink-0">
          Filtreleri Temizle
        </Button>
      )}
    </div>
  );
};

export default ProductFilterBar;
