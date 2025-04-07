
import { useState } from "react";
import { Plus, Search, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import ProductForm from "@/components/inventory/ProductForm";

// Örnek ürün verileri
const initialProducts = [
  {
    id: 1,
    name: "Ayarlanabilir Kol GN.15",
    sku: "EG-AK-15-001",
    firm: "Elesa Ganter",
    stock: 42,
    price: 899.99
  },
  {
    id: 2,
    name: "Paslanmaz Çelik Menteşe HB.25",
    sku: "EG-PCM-25-002",
    firm: "Elesa Ganter",
    stock: 78,
    price: 249.99
  },
  {
    id: 3,
    name: "Yaylı Pim DIN.1481",
    sku: "HA-YP-1481-003",
    firm: "Halder",
    stock: 150,
    price: 89.99
  },
  {
    id: 4,
    name: "Pozisyon Göstergesi DD.52",
    sku: "KP-PG-52-004",
    firm: "Kipp",
    stock: 35,
    price: 349.99
  },
  {
    id: 5,
    name: "Sıkıştırma Kolu GN.300",
    sku: "EG-SK-300-005",
    firm: "Elesa Ganter",
    stock: 57,
    price: 179.99
  },
  {
    id: 6,
    name: "Ayarlanabilir Ayak LV.F",
    sku: "SC-AA-F-006",
    firm: "Schmalz",
    stock: 62,
    price: 149.99
  },
  {
    id: 7,
    name: "Linear Hareket Kelepçesi",
    sku: "WN-LHK-007",
    firm: "Winkel",
    stock: 40,
    price: 129.99
  },
  {
    id: 8,
    name: "Vidalı Mil TR.20x4",
    sku: "NO-VM-20-008",
    firm: "Norelem",
    stock: 28,
    price: 299.99
  }
];

export const ProductManagement = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);

  // Filtreleme fonksiyonu
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.firm.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Yeni ürün ekleme
  const handleAddProduct = (product: any) => {
    const newProduct = {
      id: products.length + 1,
      sku: `SKU-${products.length + 1}`,
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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 w-1/3">
          <Input
            placeholder="Ürün ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
            icon={<Search className="h-4 w-4" />}
          />
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Yeni Ürün Ekle
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Yeni Ürün Ekle</DialogTitle>
            </DialogHeader>
            <ProductForm 
              onSubmit={handleAddProduct} 
              onCancel={() => setIsAddDialogOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Ürün Listesi */}
      {filteredProducts.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Ürün Adı</TableHead>
              <TableHead>Firma</TableHead>
              <TableHead className="text-center">Stok</TableHead>
              <TableHead className="text-right">Fiyat</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.sku}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.firm}</TableCell>
                <TableCell className="text-center">
                  <Badge variant={product.stock > 50 ? "success" : product.stock > 10 ? "warning" : "destructive"}>
                    {product.stock}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{product.price.toLocaleString('tr-TR', {style: 'currency', currency: 'TRY'})}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => openEditDialog(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {currentProduct && currentProduct.id === product.id && (
                        <DialogContent className="sm:max-w-[425px]">
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
