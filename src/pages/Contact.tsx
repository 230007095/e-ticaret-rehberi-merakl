
import { useState } from "react";
import { 
  Card, 
  CardContent, 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { MapPin, Mail, Phone, Clock, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simüle edilmiş form gönderimi
    setTimeout(() => {
      toast({
        title: "Mesajınız Gönderildi",
        description: "En kısa sürede size geri dönüş yapacağız.",
      });
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setDepartment("");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Bölümü */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">İletişim</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Sorularınız, önerileriniz veya talepleriniz için bizimle iletişime geçin.
            Size en kısa sürede yanıt vereceğiz.
          </p>
        </div>
      </div>
      
      {/* İletişim Bilgileri ve Form */}
      <div className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* İletişim Bilgileri */}
            <div>
              <h2 className="text-2xl font-bold mb-6">İletişim Bilgilerimiz</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <MapPin className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Merkez Ofis</h3>
                    <p className="text-gray-700 mb-1">Atatürk Caddesi No: 123</p>
                    <p className="text-gray-700 mb-1">Mecidiyeköy / İstanbul</p>
                    <p className="text-gray-700">34000</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Mail className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">E-posta</h3>
                    <p className="text-gray-700 mb-1">info@yapimarket.com</p>
                    <p className="text-gray-700">destek@yapimarket.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Phone className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Telefon</h3>
                    <p className="text-gray-700 mb-1">+90 (212) 123 45 67</p>
                    <p className="text-gray-700">+90 (212) 987 65 43</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Clock className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Çalışma Saatleri</h3>
                    <p className="text-gray-700 mb-1">Pazartesi - Cuma: 09:00 - 18:00</p>
                    <p className="text-gray-700">Cumartesi: 09:00 - 13:00</p>
                    <p className="text-gray-700">Pazar: Kapalı</p>
                  </div>
                </div>
              </div>
              
              {/* Şubeler */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Şubelerimiz</h2>
                
                <Tabs defaultValue="istanbul">
                  <TabsList className="mb-4">
                    <TabsTrigger value="istanbul">İstanbul</TabsTrigger>
                    <TabsTrigger value="ankara">Ankara</TabsTrigger>
                    <TabsTrigger value="izmir">İzmir</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="istanbul">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-2">İstanbul Şube</h3>
                        <p className="text-gray-700 mb-1">Atatürk Caddesi No: 123</p>
                        <p className="text-gray-700 mb-1">Mecidiyeköy / İstanbul</p>
                        <p className="text-gray-700 mb-4">+90 (212) 123 45 67</p>
                        <div className="aspect-video bg-gray-200 rounded-md overflow-hidden">
                          <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96690.80542089987!2d28.987883541992376!3d41.03525005440225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab71450c2b0dd%3A0x44d0174182f7dd89!2zxLBzdGFuYnVs!5e0!3m2!1str!2str!4v1690377532146!5m2!1str!2str" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen={true} 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                          ></iframe>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="ankara">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-2">Ankara Şube</h3>
                        <p className="text-gray-700 mb-1">Çankaya Caddesi No: 45</p>
                        <p className="text-gray-700 mb-1">Kızılay / Ankara</p>
                        <p className="text-gray-700 mb-4">+90 (312) 456 78 90</p>
                        <div className="aspect-video bg-gray-200 rounded-md overflow-hidden">
                          <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d97178.32826258351!2d32.6990392!3d39.9035248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f190a9cea55%3A0xb701f5443120d379!2sAnkara!5e0!3m2!1str!2str!4v1690377609131!5m2!1str!2str" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen={true} 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                          ></iframe>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="izmir">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-2">İzmir Şube</h3>
                        <p className="text-gray-700 mb-1">Konak Bulvarı No: 78</p>
                        <p className="text-gray-700 mb-1">Alsancak / İzmir</p>
                        <p className="text-gray-700 mb-4">+90 (232) 765 43 21</p>
                        <div className="aspect-video bg-gray-200 rounded-md overflow-hidden">
                          <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12607.815819468242!2d27.135969249999998!3d38.42329665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd862a762cacd%3A0x628cbba1a59ce8fe!2zxLB6bWly!5e0!3m2!1str!2str!4v1690377658387!5m2!1str!2str" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen={true} 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                          ></iframe>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            {/* İletişim Formu */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Bize Ulaşın</h2>
              
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium">
                          Adınız Soyadınız
                        </label>
                        <Input
                          id="name"
                          placeholder="Adınız Soyadınız"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium">
                          E-posta Adresiniz
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="E-posta Adresiniz"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="subject" className="block text-sm font-medium">
                          Konu
                        </label>
                        <Input
                          id="subject"
                          placeholder="Konu"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="department" className="block text-sm font-medium">
                          Departman
                        </label>
                        <Select 
                          value={department} 
                          onValueChange={setDepartment}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Departman Seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sales">Satış</SelectItem>
                            <SelectItem value="support">Teknik Destek</SelectItem>
                            <SelectItem value="billing">Fatura ve Ödeme</SelectItem>
                            <SelectItem value="other">Diğer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-medium">
                        Mesajınız
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Mesajınızı buraya yazın..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={6}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        <div className="flex items-center">
                          <svg 
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24"
                          >
                            <circle 
                              className="opacity-25" 
                              cx="12" 
                              cy="12" 
                              r="10" 
                              stroke="currentColor" 
                              strokeWidth="4"
                            ></circle>
                            <path 
                              className="opacity-75" 
                              fill="currentColor" 
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Gönderiliyor...
                        </div>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" /> Mesajı Gönder
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              {/* SSS */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Sık Sorulan Sorular</h2>
                
                <div className="space-y-4">
                  {[
                    {
                      question: "Sipariş verdikten sonra ne kadar sürede teslim alırım?",
                      answer: "Siparişleriniz, ödemenin onaylanmasının ardından genellikle 1-3 iş günü içerisinde kargoya verilir. Teslimat süresi, bulunduğunuz bölgeye göre 1-4 iş günü arasında değişebilir."
                    },
                    {
                      question: "Ürün iade ve değişim politikanız nedir?",
                      answer: "Ürünlerimizi, teslim aldığınız tarihten itibaren 14 gün içerisinde, kullanılmamış ve orijinal ambalajında olmak kaydıyla iade edebilirsiniz. İade sürecini başlatmak için müşteri hizmetlerimizle iletişime geçmeniz yeterlidir."
                    },
                    {
                      question: "Toplu alımlarda özel fiyat teklifi alabilir miyim?",
                      answer: "Evet, toplu alımlarınız için özel fiyat teklifi sunuyoruz. Talep ettiğiniz ürün ve miktarları içeren bir e-postayı info@yapimarket.com adresine gönderebilir veya satış ekibimizle doğrudan iletişime geçebilirsiniz."
                    },
                  ].map((faq, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                        <p className="text-gray-700">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
