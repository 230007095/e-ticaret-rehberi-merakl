
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Eye, 
  CheckCircle, 
  XCircle,
  TruckIcon
} from "lucide-react";

export const OrderManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Örnek sipariş verileri
  const orders = [
    { id: "#ORD-1234", customer: "Ahmet Yılmaz", date: "07/04/2025", total: "₺1,299", status: "Tamamlandı" },
    { id: "#ORD-1235", customer: "Ayşe Demir", date: "07/04/2025", total: "₺2,450", status: "Kargoda" },
    { id: "#ORD-1236", customer: "Mehmet Kaya", date: "06/04/2025", total: "₺749", status: "Bekliyor" },
    { id: "#ORD-1237", customer: "Fatma Şahin", date: "05/04/2025", total: "₺3,199", status: "Tamamlandı" },
    { id: "#ORD-1238", customer: "Ali Öztürk", date: "04/04/2025", total: "₺899", status: "İptal Edildi" },
  ];

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sipariş durumuna göre simge ve renk belirleme
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Tamamlandı":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-4 h-4 mr-1" />
            {status}
          </span>
        );
      case "Kargoda":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <TruckIcon className="w-4 h-4 mr-1" />
            {status}
          </span>
        );
      case "Bekliyor":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            <span className="w-2 h-2 mr-1 rounded-full bg-amber-400"></span>
            {status}
          </span>
        );
      case "İptal Edildi":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-4 h-4 mr-1" />
            {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Sipariş Yönetimi</h2>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Sipariş ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sipariş No</TableHead>
              <TableHead>Müşteri</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead>Tutar</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="ghost">
                    <Eye className="h-4 w-4 mr-1" />
                    Detay
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
