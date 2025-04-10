
import React, { useState } from "react";
import { Edit, Trash, Image as ImageIcon, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import ProductForm from "@/components/inventory/ProductForm";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface Product {
  id: number;
  name: string;
  sku: string;
  firm: string;
  category: string;
  subcategory?: string;
  stock: number;
  price: number;
  image: string;
}

interface DraggableProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onReorder: (reorderedProducts: Product[]) => void;
}

const DraggableProductTable: React.FC<DraggableProductTableProps> = ({
  products,
  onEdit,
  onDelete,
  onReorder,
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const openEditDialog = (product: Product) => {
    setCurrentProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(products);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onReorder(items);
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10"></TableHead>
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
          <Droppable droppableId="products">
            {(provided) => (
              <TableBody
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {products.map((product, index) => (
                  <Draggable
                    key={product.id.toString()}
                    draggableId={product.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <TableRow
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <TableCell {...provided.dragHandleProps} className="w-10">
                          <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                        </TableCell>
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
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => openEditDialog(product)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => onDelete(product.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TableBody>
            )}
          </Droppable>
        </Table>
      </DragDropContext>

      {currentProduct && (
        <Dialog open={isEditDialogOpen} onOpenChange={(open) => {
          if (!open) setCurrentProduct(null);
          setIsEditDialogOpen(open);
        }}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Ürün Düzenle</DialogTitle>
            </DialogHeader>
            <ProductForm 
              product={currentProduct} 
              onSubmit={(updatedProduct) => {
                onEdit({...currentProduct, ...updatedProduct});
                setIsEditDialogOpen(false);
              }} 
              onCancel={() => setIsEditDialogOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default DraggableProductTable;
