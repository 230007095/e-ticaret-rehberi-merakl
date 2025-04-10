
import { Plus, FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface ProductActionBarProps {
  onAddDialogOpen: () => void;
  onBulkImportOpen: () => void;
}

const ProductActionBar = ({ onAddDialogOpen, onBulkImportOpen }: ProductActionBarProps) => {
  return (
    <div className="flex space-x-2 w-full md:w-auto">
      <Dialog>
        <DialogTrigger asChild>
          <Button onClick={onAddDialogOpen}>
            <Plus className="h-4 w-4 mr-2" />
            Yeni Ürün Ekle
          </Button>
        </DialogTrigger>
      </Dialog>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={onBulkImportOpen}>
            <FileUp className="h-4 w-4 mr-2" />
            Toplu Ekle
          </Button>
        </DialogTrigger>
      </Dialog>
    </div>
  );
};

export default ProductActionBar;
