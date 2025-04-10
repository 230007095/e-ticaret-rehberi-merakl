
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
import { Upload, Image as ImageIcon } from "lucide-react";

interface ProductFormProps {
  onSubmit: (product: any) => void;
  onCancel: () => void;
  product?: any;
}

const ProductForm = ({ onSubmit, onCancel, product }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    firm: product?.firm || "",
    category: product?.category || "", 
    subcategory: product?.subcategory || "",
    stock: product?.stock || "",
    price: product?.price || "",
    sku: product?.sku || "",
    description: product?.description || "",
    image: product?.image || "",
  });

  const [imagePreview, setImagePreview] = useState<string>(product?.image || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setImagePreview(imageUrl);
        setFormData({
          ...formData,
          image: imageUrl
        });
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleFirmChange = (value: string) => {
    setFormData({
      ...formData,
      firm: value,
      // Firma değiştiğinde alt kategoriyi sıfırla
      subcategory: "",
    });
  };

  const handleCategoryChange = (value: string) => {
    setFormData({
      ...formData,
      category: value,
    });
  };

  const handleSubcategoryChange = (value: string) => {
    setFormData({
      ...formData,
      subcategory: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Firma bazlı kategoriler
  const firmCategories: Record<string, string[]> = {
    "Elesa Ganter": ["Kol", "Menteşe", "Tutamak", "Ayak", "Gösterge"],
    "Halder": ["Pim", "Çekiç", "Mengene", "Kelepçe"],
    "Kipp": ["Gösterge", "Kollar", "Klemensler", "Dayama"],
    "Winkel": ["Rulman", "Taşıyıcı", "Kelepçe"],
    "Schmalz": ["Vakum", "Tutucular", "Ayaklar"],
    "Norelem": ["Mil", "Yatak", "Somun", "Civata"],
  };

  // Kategori bazlı alt kategoriler
  const categorySubcategories: Record<string, Record<string, string[]>> = {
    "Elesa Ganter": {
      "Kol": ["Ayarlanabilir", "Sabit", "Katlanabilir"],
      "Menteşe": ["Paslanmaz", "Alüminyum", "Plastik"],
      "Tutamak": ["Ergonomik", "Standart", "Mini"],
      "Ayak": ["Vidalı", "Sabit", "Rulolu"],
      "Gösterge": ["Analog", "Dijital", "Pozisyon"]
    },
    "Halder": {
      "Pim": ["Yaylı", "Konumlandırma", "Silindirik"],
      "Çekiç": ["Yumuşak", "Sert", "Çelik"]
    }
    // Diğer firmalar için alt kategoriler eklenebilir
  };

  // Mevcut firmaya göre kategorileri getir
  const currentCategories = formData.firm ? firmCategories[formData.firm] || [] : [];
  
  // Mevcut firma ve kategoriye göre alt kategorileri getir
  const currentSubcategories = formData.firm && formData.category && 
    categorySubcategories[formData.firm] && 
    categorySubcategories[formData.firm][formData.category] 
    ? categorySubcategories[formData.firm][formData.category] 
    : [];

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        {/* Resim Yükleme */}
        <div className="space-y-2">
          <Label htmlFor="image">Ürün Görseli</Label>
          <div className="flex flex-col items-center gap-2">
            <div className="border border-dashed border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center">
              {imagePreview ? (
                <div className="relative w-32 h-32 mb-2">
                  <img 
                    src={imagePreview} 
                    alt="Ürün önizleme" 
                    className="w-full h-full object-contain"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    onClick={() => {
                      setImagePreview("");
                      setFormData({ ...formData, image: "" });
                    }}
                  >
                    ×
                  </Button>
                </div>
              ) : (
                <div className="w-32 h-32 bg-gray-100 flex items-center justify-center rounded-md mb-2">
                  <ImageIcon className="h-12 w-12 text-gray-400" />
                </div>
              )}
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                  <Upload className="h-4 w-4" />
                  {imagePreview ? "Görseli Değiştir" : "Görsel Yükle"}
                </div>
                <input
                  id="image-upload"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
        </div>

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

        {/* Kategori seçimi */}
        <div className="space-y-2">
          <Label htmlFor="category">Kategori</Label>
          <Select 
            value={formData.category} 
            onValueChange={handleCategoryChange}
            disabled={!formData.firm}
          >
            <SelectTrigger>
              <SelectValue placeholder="Kategori seçin" />
            </SelectTrigger>
            <SelectContent>
              {currentCategories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Alt Kategori seçimi */}
        {currentSubcategories.length > 0 && (
          <div className="space-y-2">
            <Label htmlFor="subcategory">Alt Kategori</Label>
            <Select 
              value={formData.subcategory} 
              onValueChange={handleSubcategoryChange}
              disabled={!formData.category}
            >
              <SelectTrigger>
                <SelectValue placeholder="Alt kategori seçin" />
              </SelectTrigger>
              <SelectContent>
                {currentSubcategories.map((subcategory) => (
                  <SelectItem key={subcategory} value={subcategory}>{subcategory}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
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
