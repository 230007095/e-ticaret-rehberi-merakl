
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog } from "@/components/ui/dialog";
import { useProductManagement } from "@/hooks/useProductManagement";
import ProductFilterBar from "./products/ProductFilterBar";
import ProductActionBar from "./products/ProductActionBar";
import ProductTable from "./products/ProductTable";
import ProductDialogs from "./products/ProductDialogs";

export const ProductManagement = () => {
  const {
    products,
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
  } = useProductManagement();

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <ProductFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          firmFilter={firmFilter}
          setFirmFilter={setFirmFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          clearFilters={clearFilters}
          uniqueFirms={uniqueFirms}
          uniqueCategories={uniqueCategories}
        />
        
        <ProductActionBar
          onAddDialogOpen={() => setIsAddDialogOpen(true)}
          onBulkImportOpen={() => setIsBulkImportOpen(true)}
        />
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-pulse text-center">
            <p className="text-lg font-medium text-gray-500">Ürünler yükleniyor...</p>
          </div>
        </div>
      )}

      {!loading && products.length > 0 ? (
        <ProductTable
          products={products}
          currentProduct={currentProduct}
          isEditDialogOpen={isEditDialogOpen}
          setIsEditDialogOpen={setIsEditDialogOpen}
          setCurrentProduct={setCurrentProduct}
          handleEditProduct={handleEditProduct}
          handleDeleteProduct={handleDeleteProduct}
          openEditDialog={openEditDialog}
        />
      ) : !loading ? (
        <Alert>
          <AlertDescription>
            Arama kriterlerine uygun ürün bulunamadı.
          </AlertDescription>
        </Alert>
      ) : null}

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <ProductDialogs
          isAddDialogOpen={isAddDialogOpen}
          setIsAddDialogOpen={setIsAddDialogOpen}
          isBulkImportOpen={isBulkImportOpen}
          setIsBulkImportOpen={setIsBulkImportOpen}
          handleAddProduct={handleAddProduct}
          handleBulkImport={handleBulkImport}
        />
      </Dialog>

      <Dialog open={isBulkImportOpen} onOpenChange={setIsBulkImportOpen}>
        <ProductDialogs
          isAddDialogOpen={isAddDialogOpen}
          setIsAddDialogOpen={setIsAddDialogOpen}
          isBulkImportOpen={isBulkImportOpen}
          setIsBulkImportOpen={setIsBulkImportOpen}
          handleAddProduct={handleAddProduct}
          handleBulkImport={handleBulkImport}
        />
      </Dialog>
    </div>
  );
};

export default ProductManagement;
