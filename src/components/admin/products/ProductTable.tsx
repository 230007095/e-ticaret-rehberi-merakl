
import { Edit, Trash, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Product } from "@/services/productService";
import ProductForm from "@/components/inventory/ProductForm";

interface ProductTableProps {
  products: Product[];
  currentProduct: Product | null;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (value: boolean) => void;
  setCurrentProduct: (product: Product | null) => void;
  handleEditProduct: (product: Product) => void;
  handleDeleteProduct: (id: string) => void;
  openEditDialog: (product: Product) => void;
}

const ProductTable = ({
  products,
  currentProduct,
  isEditDialogOpen,
  setIsEditDialogOpen,
  setCurrentProduct,
  handleEditProduct,
  handleDeleteProduct,
  openEditDialog,
}: ProductTableProps) => {
  return (
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
          {products.map((product) => (
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
  );
};

export default ProductTable;
