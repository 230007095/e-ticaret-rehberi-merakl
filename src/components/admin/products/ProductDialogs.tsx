
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProductForm from "@/components/inventory/ProductForm";
import BulkProductImport from "@/components/inventory/BulkProductImport";
import { Product } from "@/services/productService";

interface ProductDialogsProps {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
  isBulkImportOpen: boolean;
  setIsBulkImportOpen: (open: boolean) => void;
  handleAddProduct: (product: Omit<Product, 'id'>) => void;
  handleBulkImport: (products: Omit<Product, 'id'>[]) => void;
}

const ProductDialogs = ({
  isAddDialogOpen,
  setIsAddDialogOpen,
  isBulkImportOpen,
  setIsBulkImportOpen,
  handleAddProduct,
  handleBulkImport,
}: ProductDialogsProps) => {
  return (
    <>
      {isAddDialogOpen && (
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Yeni Ürün Ekle</DialogTitle>
          </DialogHeader>
          <ProductForm 
            onSubmit={handleAddProduct} 
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      )}
      
      {isBulkImportOpen && (
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Toplu Ürün Ekle</DialogTitle>
          </DialogHeader>
          <BulkProductImport 
            onImport={handleBulkImport}
            onClose={() => setIsBulkImportOpen(false)}
          />
        </DialogContent>
      )}
    </>
  );
};

export default ProductDialogs;
