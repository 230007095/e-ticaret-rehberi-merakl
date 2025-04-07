
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Search, Plus, Edit, Trash2, Package } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductForm from "@/components/inventory/ProductForm";

const Inventory = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [products, setProducts] = useState([
    { id: 1, name: "Akıllı Telefon", category: "Elektronik", stock: 45, price: 8999, status: "Stokta" },
    { id: 2, name: "Laptop", category: "Elektronik", stock: 23, price: 12999, status: "Stokta" },
    { id: 3, name: "Kulaklık", category: "Elektronik", stock: 78, price: 1299, status: "Stokta" },
    { id: 4, name: "T-Shirt", category: "Giyim", stock: 120, price: 299, status: "Stokta" },
    { id: 5, name: "Kot Pantolon", category: "Giyim", stock: 5, price: 599, status: "Az Stok" },
    { id: 6, name: "Spor Ayakkabı", category: "Ayakkabı", stock: 0, price: 1499, status: "Stokta Yok" },
  ]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (productId: number) => {
    setProducts(products.filter(product => product.id !== productId));
    toast({
      title: "Ürün silindi",
      description: "Ürün başarıyla stoktan kaldırıldı."
    });
  };

  const addProduct = (newProduct: any) => {
    const id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const status = newProduct.stock > 10 ? "Stokta" : newProduct.stock > 0 ? "Az Stok" : "Stokta Yok";
    
    setProducts([...products, { 
      id, 
      name: newProduct.name, 
      category: newProduct.category, 
      stock: parseInt(newProduct.stock), 
      price: parseInt(newProduct.price),
      status
    }]);
    
    setIsAddProductOpen(false);
    toast({
      title: "Ürün eklendi",
      description: "Yeni ürün başarıyla stoka eklendi."
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Stok Yönetimi</h1>
            <p className="text-muted-foreground">Ürün stoklarını takip edin ve yönetin</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Ürün veya kategori ara..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-8"
              />
            </div>
            
            <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Ürün Ekle
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Yeni Ürün Ekle</DialogTitle>
                  <DialogDescription>
                    Stok takibi için yeni bir ürün ekleyin.
                  </DialogDescription>
                </DialogHeader>
                <ProductForm onSubmit={addProduct} onCancel={() => setIsAddProductOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        {/* Inventory Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card title="Toplam Ürün" value={products.length} icon={<Package className="h-4 w-4" />} />
          <Card title="Stok Değeri" value={`₺${products.reduce((acc, p) => acc + (p.price * p.stock), 0).toLocaleString()}`} />
          <Card title="Stok Dışı" value={products.filter(p => p.stock === 0).length} color="text-red-500" />
          <Card title="Az Stok" value={products.filter(p => p.stock > 0 && p.stock <= 10).length} color="text-amber-500" />
        </div>
        
        {/* Products Table */}
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ürün Adı</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead className="text-right">Stok</TableHead>
                <TableHead className="text-right">Fiyat</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right">{product.stock}</TableCell>
                    <TableCell className="text-right">₺{product.price.toLocaleString()}</TableCell>
                    <TableCell>
                      <StatusBadge status={product.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="icon" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    Ürün bulunamadı
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// Yardımcı bileşenler
const Card = ({ title, value, color, icon }: any) => (
  <div className="bg-white border rounded-lg p-4 shadow-sm">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <h3 className={`text-2xl font-bold mt-1 ${color || ""}`}>{value}</h3>
      </div>
      {icon && <div className="bg-blue-100 p-2 rounded-md text-blue-600">{icon}</div>}
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  let className = "inline-block px-2 py-1 text-xs font-medium rounded-full ";
  
  switch(status) {
    case "Stokta":
      className += "bg-green-100 text-green-800";
      break;
    case "Az Stok":
      className += "bg-amber-100 text-amber-800";
      break;
    case "Stokta Yok":
      className += "bg-red-100 text-red-800";
      break;
    default:
      className += "bg-gray-100 text-gray-800";
  }
  
  return <span className={className}>{status}</span>;
};

export default Inventory;
