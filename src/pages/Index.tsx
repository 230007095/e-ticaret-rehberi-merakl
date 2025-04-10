import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { ShoppingCart, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturedProducts from "@/components/FeaturedProducts";
import Firms from "@/components/Firms";
import ProductCard from "@/components/ProductCard";
const Index = () => {
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Hoş Geldiniz!</h1>
          <p className="text-xl md:text-2xl mb-8">Endüstriyel komponentlerde güvenilir tedarikçiniz - CMK Yapımarket</p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            Alışverişe Başla
          </Button>
        </div>
      </div>
      
      {/* Firms */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Firmalar</h2>
          <Firms />
        </div>
      </div>
      
      {/* Featured Products */}
      <div className="py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Öne Çıkan Ürünler</h2>
          <FeaturedProducts />
        </div>
      </div>
      
      {/* Special Offers */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Özel Teklifler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-indigo-100 p-8 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-indigo-800">Elesa Ganter İndirimi</h3>
                    <p className="text-indigo-600 mb-4">Tüm Elesa Ganter ürünlerinde %30'a varan indirimler</p>
                  </div>
                  <Button className="w-full md:w-auto">Keşfet</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-pink-100 p-8 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-pink-800">Yeni Gelenler</h3>
                    <p className="text-pink-600 mb-4">En yeni Kipp ve Norelem ürünlerini keşfedin</p>
                  </div>
                  <Button className="w-full md:w-auto bg-pink-500 hover:bg-pink-600">Keşfet</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Newsletter */}
      <div className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Bültenimize Abone Olun</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Yeni ürünler, özel indirimler ve kampanyalardan haberdar olmak için bültenimize abone olun.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center max-w-md mx-auto">
            <input type="email" placeholder="E-posta adresiniz" className="px-4 py-3 rounded-md text-gray-800 w-full" />
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              Abone Ol
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>;
};
export default Index;