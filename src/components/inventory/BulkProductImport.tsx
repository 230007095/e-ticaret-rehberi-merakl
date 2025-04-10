
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileSpreadsheet, AlertCircle, Check } from "lucide-react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface BulkProductImportProps {
  onImport: (products: any[]) => void;
  onClose: () => void;
}

const BulkProductImport = ({ onImport, onClose }: BulkProductImportProps) => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  // CSV dosyasını işleme
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Dosya tipi kontrolü
      if (!selectedFile.name.endsWith('.csv')) {
        setError("Lütfen CSV formatında bir dosya yükleyin.");
        setFile(null);
        return;
      }
      
      setFile(selectedFile);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          if (event.target && typeof event.target.result === 'string') {
            // CSV'yi parse et
            const csvData = parseCSV(event.target.result);
            
            if (csvData.length < 2) {
              throw new Error("CSV dosyası boş veya geçersiz.");
            }
            
            // İlk satır başlıklar
            const headers = csvData[0];
            const requiredColumns = ["name", "sku", "firm", "price", "stock"];
            
            // Gerekli kolonların varlığını kontrol et
            for (const column of requiredColumns) {
              if (!headers.includes(column)) {
                throw new Error(`CSV dosyasında '${column}' kolonu bulunamadı.`);
              }
            }
            
            // Veriyi başlıklarla birlikte işle
            const products = [];
            for (let i = 1; i < csvData.length; i++) {
              if (csvData[i].length === headers.length) {
                const product: Record<string, any> = {};
                for (let j = 0; j < headers.length; j++) {
                  product[headers[j]] = csvData[i][j];
                }
                
                // Sayısal alanları dönüştür
                product.price = parseFloat(product.price);
                product.stock = parseInt(product.stock);
                
                products.push(product);
              }
            }
            
            setParsedData(products);
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : "Dosya işlenirken bir hata oluştu.");
          setParsedData([]);
        }
      };
      
      reader.onerror = () => {
        setError("Dosya okunurken bir hata oluştu.");
      };
      
      reader.readAsText(selectedFile);
    }
  };

  // CSV dosyasını parse etme 
  const parseCSV = (text: string): string[][] => {
    const lines = text.split('\n');
    return lines.map(line => {
      // Virgül ile ayır, ancak tırnak içindeki virgülleri koru
      const result = [];
      let insideQuotes = false;
      let currentValue = '';
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
          insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
          result.push(currentValue.trim());
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      
      result.push(currentValue.trim());
      return result;
    }).filter(row => row.length > 1 || row[0] !== ''); // Boş satırları filtrele
  };

  // Verileri içe aktar
  const handleImport = () => {
    if (parsedData.length > 0) {
      onImport(parsedData);
      toast({
        title: "İçe aktarma başarılı",
        description: `${parsedData.length} ürün başarıyla içe aktarıldı.`,
      });
      onClose();
    } else {
      setError("İçe aktarılacak veri bulunamadı.");
    }
  };

  // Örnek CSV şablonunu indir
  const downloadTemplate = () => {
    const headers = "name,sku,firm,category,subcategory,price,stock,description,image\n";
    const exampleRow = "Ayarlanabilir Kol GN.15,EG-AK-15-001,Elesa Ganter,Kol,Ayarlanabilir,899.99,42,Ayarlanabilir kol açıklaması,\n";
    
    const csvContent = headers + exampleRow;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'urun_sablonu.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
          <FileSpreadsheet className="h-12 w-12 text-gray-400 mb-2" />
          <h3 className="text-lg font-medium">CSV Dosyası Yükle</h3>
          <p className="text-sm text-gray-500 text-center mb-4">
            Toplu ürün eklemek için CSV dosyası yükleyin veya sürükleyip bırakın
          </p>
          
          <div className="flex gap-2 mb-4">
            <Button variant="outline" onClick={downloadTemplate} type="button">
              Şablon İndir
            </Button>
            <label htmlFor="csv-upload">
              <Button asChild>
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  CSV Dosyası Seç
                </span>
              </Button>
            </label>
            <input
              id="csv-upload"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          
          {file && (
            <div className="text-center">
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-gray-500">{Math.round(file.size / 1024)} KB</p>
            </div>
          )}
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {parsedData.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm">
                <Check className="h-4 w-4 inline text-green-500 mr-1" />
                <span>{parsedData.length} ürün bulundu</span>
              </p>
              <Button variant="outline" size="sm" onClick={() => setPreviewOpen(true)}>
                Önizleme
              </Button>
            </div>
          </div>
        )}
      </div>

      <DialogFooter className="mt-6">
        <Button variant="outline" onClick={onClose} type="button">
          İptal
        </Button>
        <Button 
          onClick={handleImport} 
          disabled={parsedData.length === 0}
          type="button"
        >
          İçe Aktar
        </Button>
      </DialogFooter>

      {/* Önizleme Diyaloğu */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Veri Önizleme</DialogTitle>
            <DialogDescription>
              İçe aktarılacak ürünlerin önizlemesi
            </DialogDescription>
          </DialogHeader>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ürün Adı</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Firma</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead className="text-right">Fiyat</TableHead>
                  <TableHead className="text-right">Stok</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parsedData.slice(0, 10).map((product, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>{product.firm}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right">{product.price.toLocaleString('tr-TR', {style: 'currency', currency: 'TRY'})}</TableCell>
                    <TableCell className="text-right">{product.stock}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {parsedData.length > 10 && (
            <p className="text-sm text-center text-muted-foreground mt-2">
              {parsedData.length - 10} ürün daha...
            </p>
          )}

          <DialogFooter>
            <Button onClick={() => setPreviewOpen(false)} type="button">
              Kapat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BulkProductImport;
