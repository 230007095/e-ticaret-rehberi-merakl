import { Link } from "react-router-dom";
const Footer = () => {
  return <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">E-Market</h3>
            <p className="text-gray-400 mb-4">
              Kaliteli ürünleri en uygun fiyatlarla sunuyoruz. 7/24 müşteri desteği ve hızlı teslimat garantisi.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Ana Sayfa</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">Ürünler</Link></li>
              <li><Link to="/categories" className="text-gray-400 hover:text-white transition-colors">Kategoriler</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">Hakkımızda</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">İletişim</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Müşteri Hizmetleri</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">SSS</Link></li>
              <li><Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">Kargo Bilgisi</Link></li>
              <li><Link to="/returns" className="text-gray-400 hover:text-white transition-colors">İade Koşulları</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Gizlilik Politikası</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Kullanım Koşulları</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">İletişim</h3>
            <address className="text-gray-400 not-italic">
              <p className="mb-2">Gaziantep, Türkiye</p>
              <p className="mb-2">info@e-market.com</p>
              <p>+90 554 964 93 58</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} E-Market. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;