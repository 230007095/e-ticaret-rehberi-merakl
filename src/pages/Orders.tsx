
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Package } from "lucide-react";

// Mock orders data
const mockOrders = [
  {
    id: "ORD-2023-001",
    date: "10.12.2023",
    total: 1549.97,
    status: "tamamlandı",
    items: [
      { id: 1, name: "Ayarlanabilir Kol GN.15", price: 899.99, quantity: 1 },
      { id: 2, name: "Paslanmaz Çelik Menteşe HB.25", price: 249.99, quantity: 2 },
      { id: 5, name: "Sıkıştırma Kolu GN.300", price: 179.99, quantity: 1 },
    ],
    address: "Atatürk Mah. Cumhuriyet Cad. No:123 Kadıköy/İstanbul",
  },
  {
    id: "ORD-2023-002",
    date: "25.10.2023",
    total: 629.97,
    status: "tamamlandı",
    items: [
      { id: 4, name: "Pozisyon Göstergesi DD.52", price: 349.99, quantity: 1 },
      { id: 3, name: "Yaylı Pim DIN.1481", price: 89.99, quantity: 3 },
    ],
    address: "Bahçelievler Mah. İnönü Cad. No:45 Beşiktaş/İstanbul",
  },
  {
    id: "ORD-2024-003",
    date: "15.01.2024",
    total: 799.96,
    status: "kargoda",
    items: [
      { id: 8, name: "Vidalı Mil TR.20x4", price: 299.99, quantity: 2 },
      { id: 10, name: "Paslanmaz Çelik Bağlantı Elemanı", price: 129.99, quantity: 1 },
      { id: 6, name: "Ayarlanabilir Ayak LV.F", price: 149.99, quantity: 1 },
    ],
    address: "Yeni Mah. Bağdat Cad. No:78 Maltepe/İstanbul",
  },
  {
    id: "ORD-2024-004",
    date: "28.03.2024",
    total: 929.97,
    status: "hazırlanıyor",
    items: [
      { id: 11, name: "Dijital Ölçüm Cihazı", price: 799.99, quantity: 1 },
      { id: 3, name: "Yaylı Pim DIN.1481", price: 89.99, quantity: 1 },
      { id: 7, name: "Linear Hareket Kelepçesi", price: 129.99, quantity: 1 },
    ],
    address: "Göztepe Mah. Bağdat Cad. No:156 Kadıköy/İstanbul",
  },
];

// Component for status badge with appropriate color
const StatusBadge = ({ status }: { status: string }) => {
  let color = "bg-gray-200 text-gray-800";
  
  switch (status) {
    case "tamamlandı":
      color = "bg-green-100 text-green-800";
      break;
    case "kargoda":
      color = "bg-blue-100 text-blue-800";
      break;
    case "hazırlanıyor":
      color = "bg-yellow-100 text-yellow-800";
      break;
    case "iptal":
      color = "bg-red-100 text-red-800";
      break;
  }
  
  return (
    <Badge variant="outline" className={`${color} font-medium`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const Orders = () => {
  const { isAuthenticated } = useAuth();

  // Redirect to login page if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto max-w-6xl px-4 py-8 flex-1">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Siparişlerim</h1>
          <Button variant="outline" asChild>
            <a href="/profile">
              Profilim
            </a>
          </Button>
        </div>

        {mockOrders.length > 0 ? (
          <div className="space-y-6">
            {mockOrders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg flex items-center">
                        <FileText className="mr-2 h-5 w-5" /> 
                        Sipariş #{order.id}
                      </CardTitle>
                      <CardDescription>
                        Tarih: {order.date} | Toplam: {order.total.toFixed(2)} ₺
                      </CardDescription>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-4 border-b">
                    <h3 className="font-medium text-sm mb-2">Teslimat Adresi</h3>
                    <p className="text-sm text-gray-600">{order.address}</p>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-sm mb-2">Sipariş Ürünleri</h3>
                    <ScrollArea className="h-[200px] rounded">
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div key={index}>
                            {index > 0 && <Separator className="my-2" />}
                            <div className="flex justify-between">
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-600">
                                  {item.price.toFixed(2)} ₺ x {item.quantity}
                                </p>
                              </div>
                              <p className="font-medium">
                                {(item.price * item.quantity).toFixed(2)} ₺
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                  <div className="p-4 bg-gray-50 flex justify-between items-center">
                    <div className="font-medium">Toplam Tutar</div>
                    <div className="text-lg font-bold">{order.total.toFixed(2)} ₺</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <Package className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <CardTitle className="mb-2">Henüz Siparişiniz Bulunmuyor</CardTitle>
            <CardDescription className="mb-6">
              Siparişleriniz burada görüntülenecektir.
            </CardDescription>
            <Button asChild>
              <a href="/products">Alışverişe Başla</a>
            </Button>
          </Card>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
