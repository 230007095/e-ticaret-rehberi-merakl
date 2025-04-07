
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
    firm: product?.firm || "",
    stock: product?.stock || "",
    price: product?.price || "",
    sku: product?.sku || "",
    description: product?.description || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFirmChange = (value: string) => {
    setFormData({
      ...formData,
      firm: value,
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
          <Label htmlFor="sku">SKU (Stok Kodu)</Label>
          <Input
            id="sku"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            placeholder="Örn: EG-AK-15-001"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="firm">Firma</Label>
          <Select 
            value={formData.firm} 
            onValueChange={handleFirmChange}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Firma seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Elesa Ganter">Elesa Ganter</SelectItem>
              <SelectItem value="Halder">Halder</SelectItem>
              <SelectItem value="Kipp">Kipp</SelectItem>
              <SelectItem value="Winkel">Winkel</SelectItem>
              <SelectItem value="Schmalz">Schmalz</SelectItem>
              <SelectItem value="Norelem">Norelem</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Açıklama</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Ürün açıklaması"
            rows={3}
          />
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
