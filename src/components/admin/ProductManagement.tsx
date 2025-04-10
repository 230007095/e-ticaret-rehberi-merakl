
import { useState } from "react";
import { Plus, Search, Edit, Trash, FileUp, Filter, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import ProductForm from "@/components/inventory/ProductForm";
import BulkProductImport from "@/components/inventory/BulkProductImport";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Örnek ürün verileri
const initialProducts = [
  {
    id: 1,
    name: "Ayarlanabilir Kol GN.15",
    sku: "EG-AK-15-001",
    firm: "Elesa Ganter",
    category: "Kol",
    subcategory: "Ayarlanabilir",
    stock: 42,
    price: 899.99,
    image: "https://via.placeholder.com/100?text=GN.15"
  },
  {
    id: 2,
    name: "Paslanmaz Çelik Menteşe HB.25",
    sku: "EG-PCM-25-002",
    firm: "Elesa Ganter",
    category: "Menteşe",
    subcategory: "Paslanmaz",
    stock: 78,
    price: 249.99,
    image: "https://via.placeholder.com/100?text=HB.25"
  },
  {
    id: 3,
    name: "Yaylı Pim DIN.1481",
    sku: "HA-YP-1481-003",
    firm: "Halder",
    category: "Pim",
    subcategory: "Yaylı",
    stock: 150,
    price: 89.99,
    image: "https://via.placeholder.com/100?text=DIN.1481"
  },
  {
    id: 4,
    name: "Pozisyon Göstergesi DD.52",
    sku: "KP-PG-52-004",
    firm: "Kipp",
    category: "Gösterge",
    subcategory: "Pozisyon",
    stock: 35,
    price: 349.99,
    image: ""
  },
  {
    id: 5,
    name: "Sıkıştırma Kolu GN.300",
    sku: "EG-SK-300-005",
    firm: "Elesa Ganter",
    category: "Kol",
    subcategory: "Sabit",
    stock: 57,
    price: 179.99,
    image: ""
  },
  {
    id: 6,
    name: "Ayarlanabilir Ayak LV.F",
    sku: "SC-AA-F-006",
    firm: "Schmalz",
    category: "Ayak",
    subcategory: "Vidalı",
    stock: 62,
    price: 149.99,
    image: ""
  },
  {
    id: 7,
    name: "Linear Hareket Kelepçesi",
    sku: "WN-LHK-007",
    firm: "Winkel",
    category: "Kelepçe",
    subcategory: "",
    stock: 40,
    price: 129.99,
    image: ""
  },
  {
    id: 8,
    name: "Vidalı Mil TR.20x4",
    sku: "NO-VM-20-008",
    firm: "Norelem",
    category: "Mil",
    subcategory: "",
    stock: 28,
    price: 299.99,
    image: ""
  }
];

export const ProductManagement = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [firmFilter, setFirmFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);

  // Firmalar, kategoriler ve alt kategorileri çıkar
  const firms = Array.from(new Set(products.map(p => p.firm)));
  const categories = Array.from(new Set(products.map(p => p.category))).filter(Boolean);

  // Filtreleme fonksiyonu
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.firm.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFirm = firmFilter ? product.firm === firmFilter : true;
    const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
    
    return matchesSearch && matchesFirm && matchesCategory;
  });

  // Yeni ürün ekleme
  const handleAddProduct = (product: any) => {
    const newProduct = {
      id: products.length + 1,
      ...product
    };
    
    setProducts([...products, newProduct]);
    setIsAddDialogOpen(false);
    toast({
      title: "Ürün eklendi",
      description: `${product.name} başarıyla eklendi.`
    });
  };

  // Ürün düzenleme
  const handleEditProduct = (product: any) => {
    const updatedProducts = products.map(p => 
      p.id === currentProduct.id ? { ...p, ...product } : p
    );
    
    setProducts(updatedProducts);
    setIsEditDialogOpen(false);
    toast({
      title: "Ürün güncellendi",
      description: `${product.name} başarıyla güncellendi.`
    });
  };

  // Ürün silme
  const handleDeleteProduct = (id: number) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    toast({
      title: "Ürün silindi",
      description: "Ürün başarıyla silindi."
    });
  };

  // Düzenleme diyaloğunu açma
  const openEditDialog = (product: any) => {
    setCurrentProduct(product);
    setIsEditDialogOpen(true);
  };

  // Toplu ürün ekleme
  const handleBulkImport = (importedProducts: any[]) => {
    const lastId = products.length > 0 ? Math.max(...products.map(p => p.id)) : 0;
    
    const newProducts = importedProducts.map((product, index) => ({
      id: lastId + index + 1,
      ...product
    }));
    
    setProducts([...products, ...newProducts]);
    setIsBulkImportOpen(false);
    toast({
      title: "Toplu ürün eklendi",
      description: `${newProducts.length} ürün başarıyla eklendi.`
    });
  };

  // Filtreleri temizle
  const clearFilters = () => {
    setSearchTerm("");
    setFirmFilter("");
    setCategoryFilter("");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
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
        
        <div className="flex space-x-2 w-full md:w-auto">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Yeni Ürün Ekle
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Yeni Ürün Ekle</DialogTitle>
              </DialogHeader>
              <ProductForm 
                onSubmit={handleAddProduct} 
                onCancel={() => setIsAddDialogOpen(false)} 
              />
            </DialogContent>
          </Dialog>
          
          <Dialog open={isBulkImportOpen} onOpenChange={setIsBulkImportOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FileUp className="h-4 w-4 mr-2" />
                Toplu Ekle
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Toplu Ürün Ekle</DialogTitle>
              </DialogHeader>
              <BulkProductImport 
                onImport={handleBulkImport}
                onClose={() => setIsBulkImportOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Ürün Listesi */}
      {filteredProducts.length > 0 ? (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Ürün Adı</TableHead>
                <TableHead>Firma</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead className="text-center">Stok</TableHead>
                <TableHead className="text-right">Fiyat</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-10 h-10 object-cover rounded-md" 
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-md">
                        <ImageIcon className="h-5 w-5 text-gray-400" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{product.sku}</TableCell>
                  <TableCell>
                    <div>
                      {product.name}
                      {product.subcategory && (
                        <Badge variant="outline" className="ml-2">{product.subcategory}</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{product.firm}</TableCell>
                  <TableCell>{product.category || "-"}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={product.stock > 50 ? "default" : product.stock > 10 ? "secondary" : "destructive"}>
                      {product.stock}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{product.price.toLocaleString('tr-TR', {style: 'currency', currency: 'TRY'})}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog open={isEditDialogOpen && currentProduct?.id === product.id} onOpenChange={(open) => {
                        if (!open) setCurrentProduct(null);
                        setIsEditDialogOpen(open);
                      }}>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => openEditDialog(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {currentProduct && currentProduct.id === product.id && (
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Ürün Düzenle</DialogTitle>
                            </DialogHeader>
                            <ProductForm 
                              product={currentProduct} 
                              onSubmit={handleEditProduct} 
                              onCancel={() => setIsEditDialogOpen(false)} 
                            />
                          </DialogContent>
                        )}
                      </Dialog>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <Alert>
          <AlertDescription>
            Arama kriterlerine uygun ürün bulunamadı.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ProductManagement;
