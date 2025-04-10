
import { useState, useEffect } from "react";
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
import { getProducts, getFirms, getCategories, deleteProduct, createProduct, updateProduct, Product } from "@/services/productService";

export const ProductManagement = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [firmFilter, setFirmFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [firms, setFirms] = useState<{id: string, name: string}[]>([]);
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);
  
  // Verileri yükle
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const productsData = await getProducts();
      setProducts(productsData);
      
      const firmsData = await getFirms();
      setFirms(firmsData);
      
      const categoriesData = await getCategories();
      setCategories(categoriesData);
      
      setLoading(false);
    };
    
    loadData();
  }, []);

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
  const handleAddProduct = async (product: Omit<Product, 'id'>) => {
    const newProductId = await createProduct(product);
    
    if (newProductId) {
      // Yeni ürünü ekle ve listeyi güncelle
      const productsData = await getProducts();
      setProducts(productsData);
      setIsAddDialogOpen(false);
    }
  };

  // Ürün düzenleme
  const handleEditProduct = async (product: Product) => {
    const success = await updateProduct(product);
    
    if (success) {
      // Ürünü güncelle ve listeyi yenile
      const productsData = await getProducts();
      setProducts(productsData);
      setIsEditDialogOpen(false);
      setCurrentProduct(null);
    }
  };

  // Ürün silme
  const handleDeleteProduct = async (id: string) => {
    const success = await deleteProduct(id);
    
    if (success) {
      // Ürünü listeden kaldır
      setProducts(products.filter(product => product.id !== id));
    }
  };

  // Düzenleme diyaloğunu açma
  const openEditDialog = (product: Product) => {
    setCurrentProduct(product);
    setIsEditDialogOpen(true);
  };

  // Toplu ürün ekleme
  const handleBulkImport = async (importedProducts: Omit<Product, 'id'>[]) => {
    let successCount = 0;
    
    for (const product of importedProducts) {
      const newProductId = await createProduct(product);
      if (newProductId) successCount++;
    }
    
    if (successCount > 0) {
      // Listeyi güncelle
      const productsData = await getProducts();
      setProducts(productsData);
      setIsBulkImportOpen(false);
      
      toast({
        title: "Başarılı",
        description: `${successCount} ürün başarıyla eklendi.`
      });
    }
  };

  // Filtreleri temizle
  const clearFilters = () => {
    setSearchTerm("");
    setFirmFilter("");
    setCategoryFilter("");
  };

  // Firmalardan benzersiz firma adlarını çıkar
  const uniqueFirms = Array.from(new Set(products.map(p => p.firm))).filter(Boolean);
  
  // Kategorilerden benzersiz kategori adlarını çıkar
  const uniqueCategories = Array.from(new Set(products.map(p => p.category))).filter(Boolean) as string[];

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
              <SelectItem value="">Tüm Kategoriler</SelectItem>
              {uniqueCategories.map(category => (
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
                firms={firms}
                categories={categories}
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

      {/* Yükleniyor durumu */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-pulse text-center">
            <p className="text-lg font-medium text-gray-500">Ürünler yükleniyor...</p>
          </div>
        </div>
      )}

      {/* Ürün Listesi */}
      {!loading && filteredProducts.length > 0 ? (
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
                              firms={firms}
                              categories={categories}
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
      ) : !loading ? (
        <Alert>
          <AlertDescription>
            Arama kriterlerine uygun ürün bulunamadı.
          </AlertDescription>
        </Alert>
      ) : null}
    </div>
  );
};

export default ProductManagement;
