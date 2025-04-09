
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft, Trash, Minus, Plus, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/components/ui/use-toast";

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Giriş Yapmalısınız",
        description: "Satın alma işlemi için önce giriş yapmalısınız.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    setIsCheckoutOpen(true);
  };

  const confirmOrder = () => {
    toast({
      title: "Sipariş Alındı",
      description: "Siparişiniz başarıyla alındı. Teşekkür ederiz!",
    });
    clearCart();
    setIsCheckoutOpen(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto max-w-6xl px-4 py-8 flex-grow">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Alışveriş Sepeti</h1>
          <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Alışverişe Devam Et
          </Link>
        </div>
        
        {items.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-2xl font-medium text-gray-600 mb-2">Sepetiniz Boş</h2>
            <p className="text-gray-500 mb-6">Henüz sepetinize ürün eklemediniz.</p>
            <Button asChild>
              <Link to="/">Alışverişe Başla</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Sepetinizdeki Ürünler ({totalItems})</CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={clearCart}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Sepeti Temizle
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row border-b pb-4">
                        <div className="sm:w-24 h-24 flex-shrink-0 mb-4 sm:mb-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div className="flex-grow sm:ml-4">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-gray-500">{item.firm}</p>
                            </div>
                            <div className="flex items-center mt-2 sm:mt-0">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => 
                                  updateQuantity(item.id, Math.max(1, item.quantity - 1))
                                }
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value);
                                  if (!isNaN(val)) {
                                    updateQuantity(item.id, val);
                                  }
                                }}
                                className="h-8 w-12 mx-2 text-center"
                                min="1"
                              />
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <div>
                              <span className="font-bold">
                                {(item.price * item.quantity).toLocaleString('tr-TR')} ₺
                              </span>
                              {item.oldPrice && (
                                <span className="text-sm text-gray-500 line-through ml-2">
                                  {(item.oldPrice * item.quantity).toLocaleString('tr-TR')} ₺
                                </span>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Sipariş Özeti</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Ara Toplam</span>
                      <span>{totalPrice.toLocaleString('tr-TR')} ₺</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Kargo</span>
                      <span>{totalPrice > 500 ? "Ücretsiz" : "50,00 ₺"}</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between font-bold">
                      <span>Toplam</span>
                      <span>
                        {(totalPrice > 500 ? totalPrice : totalPrice + 50).toLocaleString('tr-TR')} ₺
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleCheckout} className="w-full">
                    Satın Al
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="mt-4 text-sm text-gray-500">
                <p className="mb-2">
                  500 TL ve üzeri alışverişlerinizde kargo ücretsizdir.
                </p>
                <p>
                  İade ve değişim hakkında detaylı bilgi için{" "}
                  <Link to="/about" className="text-blue-600 hover:underline">
                    tıklayınız
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Siparişinizi Onaylayın</DialogTitle>
            <DialogDescription>
              Aşağıdaki bilgileri kontrol ederek siparişinizi tamamlayabilirsiniz.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="font-medium">Sipariş Detayları</h3>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Toplam Ürün:</span>
                  <span>{totalItems} adet</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Toplam Tutar:</span>
                  <span>
                    {(totalPrice > 500 ? totalPrice : totalPrice + 50).toLocaleString('tr-TR')} ₺
                  </span>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <p className="text-sm text-gray-500">
                "Siparişi Onayla" düğmesine basarak siparişinizi tamamlamış olacaksınız.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCheckoutOpen(false)}>
              İptal
            </Button>
            <Button onClick={confirmOrder}>
              Siparişi Onayla
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Cart;
