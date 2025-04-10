import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import ProductFilters from "@/components/admin/product/ProductFilters";
import ProductActions from "@/components/admin/product/ProductActions";
import DraggableProductTable from "@/components/admin/product/DraggableProductTable";
import { lov-add-dependency>react-beautiful-dnd@13.1.1</lov-add-dependency>

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
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);

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
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
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
      p.id === product.id ? { ...p, ...product } : p
    );
    
    setProducts(updatedProducts);
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

  // Ürünleri yeniden sıralama
  const handleReorderProducts = (reorderedProducts: any[]) => {
    setProducts(reorderedProducts);
    toast({
      title: "Sıralama güncellendi",
      description: "Ürün sıralaması başarıyla güncellendi."
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <ProductFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          firmFilter={firmFilter}
          setFirmFilter={setFirmFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          firms={firms}
          categories={categories}
          clearFilters={clearFilters}
        />
        
        <ProductActions 
          isAddDialogOpen={isAddDialogOpen}
          setIsAddDialogOpen={setIsAddDialogOpen}
          isBulkImportOpen={isBulkImportOpen}
          setIsBulkImportOpen={setIsBulkImportOpen}
          handleAddProduct={handleAddProduct}
          handleBulkImport={handleBulkImport}
        />
      </div>

      {/* Ürün Listesi */}
      {filteredProducts.length > 0 ? (
        <DraggableProductTable 
          products={filteredProducts}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          onReorder={handleReorderProducts}
        />
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
