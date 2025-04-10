
import React from "react";
import { Plus, FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ProductForm from "@/components/inventory/ProductForm";
import BulkProductImport from "@/components/inventory/BulkProductImport";

interface ProductActionsProps {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (value: boolean) => void;
  isBulkImportOpen: boolean;
  setIsBulkImportOpen: (value: boolean) => void;
  handleAddProduct: (product: any) => void;
  handleBulkImport: (products: any[]) => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  isAddDialogOpen,
  setIsAddDialogOpen,
  isBulkImportOpen,
  setIsBulkImportOpen,
  handleAddProduct,
  handleBulkImport,
}) => {
  return (
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
  );
};

export default ProductActions;
