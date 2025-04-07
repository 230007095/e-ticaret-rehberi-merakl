
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";

interface ProductFormProps {
  onSubmit: (product: any) => void;
  onCancel: () => void;
  product?: any;
}

const ProductForm = ({ onSubmit, onCancel, product }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    category: product?.category || "",
    stock: product?.stock || "",
    price: product?.price || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCategoryChange = (value: string) => {
    setFormData({
      ...formData,
      category: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="name">Ürün Adı</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ürün adı girin"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Kategori</Label>
          <Select 
            value={formData.category} 
            onValueChange={handleCategoryChange}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Kategori seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Elektronik">Elektronik</SelectItem>
              <SelectItem value="Giyim">Giyim</SelectItem>
              <SelectItem value="Ev & Yaşam">Ev & Yaşam</SelectItem>
              <SelectItem value="Spor">Spor</SelectItem>
              <SelectItem value="Kozmetik">Kozmetik</SelectItem>
              <SelectItem value="Kitap & Müzik">Kitap & Müzik</SelectItem>
              <SelectItem value="Ayakkabı">Ayakkabı</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="stock">Stok Miktarı</Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              placeholder="0"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Fiyat (₺)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              required
            />
          </div>
        </div>
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          İptal
        </Button>
        <Button type="submit">Kaydet</Button>
      </DialogFooter>
    </form>
  );
};

export default ProductForm;
