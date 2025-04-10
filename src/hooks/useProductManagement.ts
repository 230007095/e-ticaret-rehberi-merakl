
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { 
  Product, 
  getProducts, 
  getFirms, 
  getCategories, 
  deleteProduct, 
  createProduct, 
  updateProduct 
} from "@/services/productService";

export const useProductManagement = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [firmFilter, setFirmFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [firms, setFirms] = useState<{id: string, name: string}[]>([]);
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);
  
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

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.firm.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFirm = firmFilter === "all" ? true : product.firm === firmFilter;
    const matchesCategory = categoryFilter === "all" ? true : product.category === categoryFilter;
    
    return matchesSearch && matchesFirm && matchesCategory;
  });

  const handleAddProduct = async (product: Omit<Product, 'id'>) => {
    const newProductId = await createProduct(product);
    
    if (newProductId) {
      const productsData = await getProducts();
      setProducts(productsData);
      setIsAddDialogOpen(false);
    }
  };

  const handleEditProduct = async (product: Product) => {
    const success = await updateProduct(product);
    
    if (success) {
      const productsData = await getProducts();
      setProducts(productsData);
      setIsEditDialogOpen(false);
      setCurrentProduct(null);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    const success = await deleteProduct(id);
    
    if (success) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const openEditDialog = (product: Product) => {
    setCurrentProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleBulkImport = async (importedProducts: Omit<Product, 'id'>[]) => {
    let successCount = 0;
    
    for (const product of importedProducts) {
      const newProductId = await createProduct(product);
      if (newProductId) successCount++;
    }
    
    if (successCount > 0) {
      const productsData = await getProducts();
      setProducts(productsData);
      setIsBulkImportOpen(false);
      
      toast({
        title: "Başarılı",
        description: `${successCount} ürün başarıyla eklendi.`
      });
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFirmFilter("all");
    setCategoryFilter("all");
  };
  
  const uniqueFirms = Array.from(new Set(products.map(p => p.firm))).filter(Boolean);
  const uniqueCategories = Array.from(new Set(products.map(p => p.category))).filter(Boolean) as string[];

  return {
    products: filteredProducts,
    loading,
    searchTerm,
    setSearchTerm,
    firmFilter,
    setFirmFilter,
    categoryFilter,
    setCategoryFilter,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen, 
    setIsEditDialogOpen,
    isBulkImportOpen,
    setIsBulkImportOpen,
    currentProduct,
    setCurrentProduct,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct,
    openEditDialog,
    handleBulkImport,
    clearFilters,
    uniqueFirms,
    uniqueCategories
  };
};
