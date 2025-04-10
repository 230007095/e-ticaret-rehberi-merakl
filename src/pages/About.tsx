import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Building, Users, Target, Award, TrendingUp, Map, MailOpen, Phone } from "lucide-react";
const About = () => {
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Bölümü */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hakkımızda</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Yapımarket olarak, endüstriyel komponentler ve makine elemanları konusunda 
            Türkiye'nin önde gelen tedarikçisiyiz. Müşterilerimize en kaliteli ürünleri 
            en uygun fiyatlarla sunarak, endüstriyel projelerinizin başarısına katkıda bulunuyoruz.
          </p>
        </div>
      </div>
      
      {/* Misyon, Vizyon ve Değerlerimiz */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-blue-700" />
                </div>
                <CardTitle>Misyonumuz</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-center">
                  Endüstriyel komponentler alanında kaliteli ürünleri, rekabetçi fiyatlarla 
                  sunarak müşterilerimizin projelerinde güvenilir bir çözüm ortağı olmak.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <div className="rounded-full bg-indigo-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-indigo-700" />
                </div>
                <CardTitle>Vizyonumuz</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-center">
                  Endüstriyel komponentler sektöründe Türkiye'nin lider tedarikçisi olmak ve 
                  global pazarda ülkemizi başarıyla temsil etmek.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <div className="rounded-full bg-purple-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-purple-700" />
                </div>
                <CardTitle>Değerlerimiz</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-700 space-y-2">
                  <li className="flex items-center">
                    <span className="bg-purple-100 rounded-full w-2 h-2 mr-2"></span>
                    <span>Müşteri memnuniyeti</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-purple-100 rounded-full w-2 h-2 mr-2"></span>
                    <span>Kalite ve güvenilirlik</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-purple-100 rounded-full w-2 h-2 mr-2"></span>
                    <span>İnovasyon ve sürekli gelişim</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-purple-100 rounded-full w-2 h-2 mr-2"></span>
                    <span>Etik iş anlayışı</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-purple-100 rounded-full w-2 h-2 mr-2"></span>
                    <span>Sürdürülebilirlik</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Hikayemiz Bölümü */}
      <div className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Hikayemiz</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img alt="Şirket tarihi" className="rounded-lg shadow-lg w-full" src="/lovable-uploads/08d9ea7d-9bce-4f1e-a1af-03b39186d8f2.png" />
            </div>
            
            <div className="space-y-4">
              <div className="relative pl-8 pb-8 border-l-2 border-blue-500">
                <div className="absolute top-0 left-[-9px] bg-blue-500 w-4 h-4 rounded-full"></div>
                <h3 className="text-xl font-bold mb-2">2005 - Kuruluş</h3>
                <p className="text-gray-700">
                  İstanbul'da küçük bir ofiste, endüstriyel komponetler ve makine elemanları
                  satışı yapan bir şirket olarak faaliyetlerimize başladık.
                </p>
              </div>
              
              <div className="relative pl-8 pb-8 border-l-2 border-blue-500">
                <div className="absolute top-0 left-[-9px] bg-blue-500 w-4 h-4 rounded-full"></div>
                <h3 className="text-xl font-bold mb-2">2010 - Büyüme</h3>
                <p className="text-gray-700">
                  Artan müşteri talebiyle birlikte, Ankara ve İzmir'de yeni şubeler açtık ve
                  ürün yelpazemizi genişlettik.
                </p>
              </div>
              
              <div className="relative pl-8 pb-8 border-l-2 border-blue-500">
                <div className="absolute top-0 left-[-9px] bg-blue-500 w-4 h-4 rounded-full"></div>
                <h3 className="text-xl font-bold mb-2">2015 - E-Ticaret</h3>
                <p className="text-gray-700">
                  Yapımarket.com online satış platformumuzu kurarak, Türkiye'nin her yerindeki
                  müşterilerimize hızlı ve kolay erişim imkanı sağladık.
                </p>
              </div>
              
              <div className="relative pl-8">
                <div className="absolute top-0 left-[-9px] bg-blue-500 w-4 h-4 rounded-full"></div>
                <h3 className="text-xl font-bold mb-2">2023 - Bugün</h3>
                <p className="text-gray-700">
                  Bugün 100'den fazla çalışanımız, 10.000'in üzerinde ürün çeşidimiz ve
                  Türkiye genelinde 10.000'den fazla müşterimiz ile sektörün önde gelen firmalarından
                  biri olarak faaliyetlerimize devam ediyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Takımımız Bölümü */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Takımımız</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[{
            name: "Ahmet Yılmaz",
            position: "Genel Müdür",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80"
          }, {
            name: "Ayşe Demir",
            position: "Satış Direktörü",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80"
          }, {
            name: "Mehmet Kaya",
            position: "Ürün Müdürü",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80"
          }, {
            name: "Zeynep Şahin",
            position: "Pazarlama Müdürü",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80"
          }].map((member, index) => <Card key={index}>
                <CardContent className="p-0">
                  <img src={member.image} alt={member.name} className="w-full h-48 object-cover object-center" />
                </CardContent>
                <CardFooter className="flex flex-col items-start p-4">
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-gray-600">{member.position}</p>
                </CardFooter>
              </Card>)}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-xl font-medium text-gray-700">
              100'den fazla çalışanımızla, müşterilerimize en iyi hizmeti sunmak için çalışıyoruz.
            </p>
          </div>
        </div>
      </div>
      
      {/* İstatistikler */}
      <div className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">18+</div>
              <div className="text-lg">Yıllık Deneyim</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10.000+</div>
              <div className="text-lg">Ürün Çeşidi</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15.000+</div>
              <div className="text-lg">Mutlu Müşteri</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">6</div>
              <div className="text-lg">Ülke Genelinde</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Neden Biz? */}
      <div className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Neden Yapımarket?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[{
            icon: <Award className="h-10 w-10 text-blue-600" />,
            title: "Kalite Garantisi",
            description: "Sadece en kaliteli ve sertifikalı ürünleri sunuyoruz."
          }, {
            icon: <TrendingUp className="h-10 w-10 text-blue-600" />,
            title: "Geniş Ürün Yelpazesi",
            description: "10.000'den fazla endüstriyel komponent ve makine elemanı."
          }, {
            icon: <Users className="h-10 w-10 text-blue-600" />,
            title: "Uzman Kadro",
            description: "Alanında uzman teknik ekibimiz ile her zaman yanınızdayız."
          }, {
            icon: <Map className="h-10 w-10 text-blue-600" />,
            title: "Hızlı Teslimat",
            description: "Türkiye'nin her yerine hızlı ve güvenli teslimat imkanı."
          }, {
            icon: <MailOpen className="h-10 w-10 text-blue-600" />,
            title: "7/24 Destek",
            description: "Sorularınız için her zaman destek ekibimize ulaşabilirsiniz."
          }, {
            icon: <Building className="h-10 w-10 text-blue-600" />,
            title: "Çözüm Ortağınız",
            description: "Projelerinizde güvenilir bir çözüm ortağı olarak yanınızdayız."
          }].map((item, index) => <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="mb-4">{item.icon}</div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>;
};
export default About;