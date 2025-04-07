
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserManagement } from "@/components/admin/UserManagement";
import { OrderManagement } from "@/components/admin/OrderManagement";
import { ProductManagement } from "@/components/admin/ProductManagement";
import { Settings } from "@/components/admin/Settings";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LogOut } from "lucide-react";

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("kullanicilar");

  // Normalde burası bir API'dan veri çekecek
  const stats = {
    totalUsers: 2450,
    totalProducts: 3200,
    totalOrders: 1256,
    totalRevenue: "₺487,500",
    pendingOrders: 28,
  };

  const handleLogout = () => {
    localStorage.removeItem("yapim-admin-auth");
    toast({ 
      title: "Çıkış yapıldı", 
      description: "Başarıyla çıkış yaptınız." 
    });
    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Yapımarket Yönetici Paneli</h1>
          <div className="flex space-x-2">
            <Button onClick={() => toast({ title: "İşlem başarılı", description: "Değişiklikler kaydedildi." })}>
              Değişiklikleri Kaydet
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" /> Çıkış Yap
            </Button>
          </div>
        </div>

        {/* Dashboard Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Toplam Kullanıcı
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Geçen aya göre +10.1%
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Toplam Sipariş
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Geçen aya göre +7.4%
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Toplam Gelir
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRevenue}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Geçen aya göre +12.3%
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="kullanicilar" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="mb-4">
            <TabsTrigger value="kullanicilar">Kullanıcılar</TabsTrigger>
            <TabsTrigger value="urunler">Ürünler</TabsTrigger>
            <TabsTrigger value="siparisler">Siparişler</TabsTrigger>
            <TabsTrigger value="ayarlar">Ayarlar</TabsTrigger>
          </TabsList>
          
          <TabsContent value="kullanicilar">
            <UserManagement />
          </TabsContent>
          
          <TabsContent value="urunler">
            <ProductManagement />
          </TabsContent>
          
          <TabsContent value="siparisler">
            <OrderManagement />
          </TabsContent>
          
          <TabsContent value="ayarlar">
            <Settings />
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Admin;
