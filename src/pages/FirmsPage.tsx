
import { useState } from "react";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Building, Globe, Mail, Phone, MapPin, Package, Users, History } from "lucide-react";

// Firma bilgileri
const firmData = [
  {
    id: 1,
    name: "Elesa Ganter",
    description: "Endüstriyel komponentler ve makine elemanları konusunda dünya lideri.",
    longDescription: "Elesa Ganter, 1941 yılında İtalya'da kurulan ve endüstriyel komponentler ve makine elemanları konusunda dünya lideri konumunda olan bir firmadır. Geniş ürün yelpazesi, yüksek kalite standartları ve yenilikçi tasarımları ile öne çıkmaktadır.",
    logo: "🔧",
    color: "bg-blue-100",
    textColor: "text-blue-800",
    website: "www.elesa-ganter.com",
    email: "info@elesa-ganter.com",
    phone: "+90 212 123 4567",
    address: "İstanbul, Türkiye",
    founded: "1941",
    employees: "1000+",
    products: [
      {
        id: 1,
        name: "Ayarlanabilir Kol GN.15",
        price: 899.99,
        oldPrice: 1299.99,
        image: "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80",
        rating: 4.5,
        firm: "Elesa Ganter"
      },
      {
        id: 2,
        name: "Paslanmaz Çelik Menteşe HB.25",
        price: 249.99,
        oldPrice: 349.99,
        image: "https://images.unsplash.com/photo-1574359173043-01fe81602379?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
        rating: 4,
        firm: "Elesa Ganter"
      },
      {
        id: 5,
        name: "Sıkıştırma Kolu GN.300",
        price: 179.99,
        oldPrice: 249.99,
        image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
        rating: 4.5,
        firm: "Elesa Ganter"
      },
      {
        id: 10,
        name: "Paslanmaz Çelik Bağlantı Elemanı",
        price: 129.99,
        oldPrice: 179.99,
        image: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
        rating: 4,
        firm: "Elesa Ganter"
      }
    ]
  },
  {
    id: 2,
    name: "Halder",
    description: "Yüksek kaliteli sıkıştırma ve bağlantı elemanları uzmanı.",
    longDescription: "Halder, 1938 yılında Almanya'da kurulan ve özellikle yüksek kaliteli sıkıştırma ve bağlantı elemanları konusunda uzmanlaşmış bir firmadır. Hassas mühendislik ve Alman kalitesi ile üretilen ürünleri dünya çapında tercih edilmektedir.",
    logo: "⚙️",
    color: "bg-red-100",
    textColor: "text-red-800",
    website: "www.halder.com",
    email: "contact@halder.com",
    phone: "+90 212 456 7890",
    address: "İzmir, Türkiye",
    founded: "1938",
    employees: "500+",
    products: [
      {
        id: 3,
        name: "Yaylı Pim DIN.1481",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1590959651373-a3db0f38a961?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
        rating: 5,
        firm: "Halder"
      },
      {
        id: 9,
        name: "Yüksek Hassasiyetli Rulman",
        price: 499.99,
        image: "https://images.unsplash.com/photo-1532615026289-513e2b42c909?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
        rating: 4.5,
        firm: "Halder"
      }
    ]
  },
  {
    id: 3,
    name: "Kipp",
    description: "Makine ve cihaz yapımı için standart bileşenler sağlayıcısı.",
    longDescription: "Kipp, 1919 yılında Almanya'da kurulan ve makine ile cihaz yapımı için standart bileşenler konusunda dünya çapında tanınan bir firmadır. İnovatif teknoloji ve yüksek kaliteli ürünleri ile endüstriyel çözümler sunar.",
    logo: "🛠️",
    color: "bg-green-100",
    textColor: "text-green-800",
    website: "www.kipp.com",
    email: "support@kipp.com",
    phone: "+90 216 789 0123",
    address: "Ankara, Türkiye",
    founded: "1919",
    employees: "750+",
    products: [
      {
        id: 4,
        name: "Pozisyon Göstergesi DD.52",
        price: 349.99,
        image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
        rating: 4,
        firm: "Kipp"
      },
      {
        id: 11,
        name: "Dijital Ölçüm Cihazı",
        price: 799.99,
        image: "https://images.unsplash.com/photo-1544137829-948d84ee3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
        rating: 5,
        firm: "Kipp"
      }
    ]
  },
  {
    id: 4,
    name: "Winkel",
    description: "Lineer kılavuz teknolojisi ve taşıma tekniği konusunda uzman.",
    longDescription: "Winkel, 1965 yılında kurulmuş olup, lineer kılavuz teknolojisi ve taşıma tekniği konusunda uzmanlaşmış bir firmadır. Özellikle ağır yük taşıma sistemleri ve rulmanlar konusunda inovatif çözümler sunar.",
    logo: "📏",
    color: "bg-orange-100",
    textColor: "text-orange-800",
    website: "www.winkel.de",
    email: "info@winkel.de",
    phone: "+90 232 345 6789",
    address: "Bursa, Türkiye",
    founded: "1965",
    employees: "300+",
    products: [
      {
        id: 7,
        name: "Linear Hareket Kelepçesi",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1615948165701-07116d84171c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
        rating: 4.5,
        firm: "Winkel"
      }
    ]
  },
  {
    id: 5,
    name: "Schmalz",
    description: "Vakum bileşenleri ve otomasyon çözümleri sağlayıcısı.",
    longDescription: "Schmalz, 1910 yılında Almanya'da kurulan ve vakum bileşenleri ve otomasyon çözümleri konusunda uzmanlaşmış bir firmadır. Endüstri 4.0'a uyumlu akıllı çözümleri ile modern üretim hatlarında tercih edilmektedir.",
    logo: "🔩",
    color: "bg-purple-100",
    textColor: "text-purple-800",
    website: "www.schmalz.com",
    email: "contact@schmalz.com",
    phone: "+90 312 456 7890",
    address: "Konya, Türkiye",
    founded: "1910",
    employees: "900+",
    products: [
      {
        id: 6,
        name: "Ayarlanabilir Ayak LV.F",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1570937943-0e29465a13bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
        rating: 3.5,
        firm: "Schmalz"
      },
      {
        id: 12,
        name: "Pnömatik Silindir",
        price: 349.99,
        oldPrice: 429.99,
        image: "https://images.unsplash.com/photo-1665669923926-5f493b9e9922?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
        rating: 4,
        firm: "Schmalz"
      }
    ]
  },
  {
    id: 6,
    name: "Norelem",
    description: "Standart elemanlar ve normlanmış makine parçaları üreticisi.",
    longDescription: "Norelem, 1950 yılında Almanya'da kurulan ve standart elemanlar ve normlanmış makine parçaları konusunda uzmanlaşmış bir firmadır. 60.000'den fazla ürün çeşidi ile geniş bir ürün yelpazesine sahiptir.",
    logo: "⚗️",
    color: "bg-yellow-100",
    textColor: "text-yellow-800",
    website: "www.norelem.com",
    email: "info@norelem.com",
    phone: "+90 224 567 8901",
    address: "Kayseri, Türkiye",
    founded: "1950",
    employees: "450+",
    products: [
      {
        id: 8,
        name: "Vidalı Mil TR.20x4",
        price: 299.99,
        oldPrice: 449.99,
        image: "https://images.unsplash.com/photo-1647607468858-0dcb7583501e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
        rating: 4,
        firm: "Norelem"
      }
    ]
  }
];

const FirmsPage = () => {
  const [selectedFirm, setSelectedFirm] = useState(firmData[0]);
  
  const handleFirmChange = (firmId: string) => {
    const firm = firmData.find(f => f.id.toString() === firmId);
    if (firm) {
      setSelectedFirm(firm);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Firmalarımız</h1>
        
        <Tabs defaultValue={selectedFirm.id.toString()} onValueChange={handleFirmChange}>
          <TabsList className="mb-6 flex flex-wrap h-auto">
            {firmData.map((firm) => (
              <TabsTrigger 
                key={firm.id} 
                value={firm.id.toString()}
                className={`${firm.color} ${firm.textColor} mb-2 mr-2`}
              >
                <span className="mr-2">{firm.logo}</span>
                {firm.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {firmData.map((firm) => (
            <TabsContent key={firm.id} value={firm.id.toString()}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Firma Bilgi Kartı */}
                <div className="md:col-span-1">
                  <Card>
                    <CardHeader className={`${firm.color} ${firm.textColor}`}>
                      <div className="text-6xl mb-4">{firm.logo}</div>
                      <CardTitle className="text-2xl">{firm.name}</CardTitle>
                      <CardDescription className={`${firm.textColor} font-medium`}>
                        {firm.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <Globe className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                          <div>
                            <p className="font-medium">Web Sitesi</p>
                            <p className="text-sm text-gray-600">{firm.website}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Mail className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                          <div>
                            <p className="font-medium">E-posta</p>
                            <p className="text-sm text-gray-600">{firm.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Phone className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                          <div>
                            <p className="font-medium">Telefon</p>
                            <p className="text-sm text-gray-600">{firm.phone}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 mr-2 mt-0.5 text-gray-500" />
                          <div>
                            <p className="font-medium">Adres</p>
                            <p className="text-sm text-gray-600">{firm.address}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <div className="flex items-center">
                            <History className="h-5 w-5 mr-2 text-gray-500" />
                            <div>
                              <p className="text-xs text-gray-500">Kuruluş</p>
                              <p className="font-medium">{firm.founded}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <Users className="h-5 w-5 mr-2 text-gray-500" />
                            <div>
                              <p className="text-xs text-gray-500">Çalışan</p>
                              <p className="font-medium">{firm.employees}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <Package className="h-5 w-5 mr-2 text-gray-500" />
                            <div>
                              <p className="text-xs text-gray-500">Ürün Sayısı</p>
                              <p className="font-medium">{firm.products.length}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <Building className="h-5 w-5 mr-2 text-gray-500" />
                            <div>
                              <p className="text-xs text-gray-500">Sektör</p>
                              <p className="font-medium">Endüstriyel</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Firma Detay ve Ürünler */}
                <div className="md:col-span-2">
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle>Firma Hakkında</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{firm.longDescription}</p>
                      
                      <div className="flex flex-wrap gap-2 mt-6">
                        <Badge variant="outline">Endüstriyel Komponentler</Badge>
                        <Badge variant="outline">Kalite</Badge>
                        <Badge variant="outline">Mühendislik</Badge>
                        <Badge variant="outline">İnovasyon</Badge>
                        <Badge variant="outline">Çözüm Ortağı</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <h3 className="text-xl font-bold mb-4">Öne Çıkan Ürünler</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {firm.products.map((product) => (
                      <ProductCard 
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        oldPrice={product.oldPrice}
                        image={product.image}
                        rating={product.rating}
                        firm={product.firm}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default FirmsPage;
