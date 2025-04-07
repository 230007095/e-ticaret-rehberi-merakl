
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Search, Menu, User } from "lucide-react";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="container mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col gap-4 mt-8">
                  <Link to="/" className="text-lg font-medium">Ana Sayfa</Link>
                  <Link to="/products" className="text-lg font-medium">Ürünler</Link>
                  <Link to="/firms" className="text-lg font-medium">Firmalar</Link>
                  <Link to="/about" className="text-lg font-medium">Hakkımızda</Link>
                  <Link to="/contact" className="text-lg font-medium">İletişim</Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">Yapımarket</Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="font-medium">Ana Sayfa</Link>
            <Link to="/products" className="font-medium">Ürünler</Link>
            <Link to="/firms" className="font-medium">Firmalar</Link>
            <Link to="/about" className="font-medium">Hakkımızda</Link>
            <Link to="/contact" className="font-medium">İletişim</Link>
          </nav>

          {/* Search, Cart, Account */}
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center relative">
              <Input
                type="text"
                placeholder="Ürün ara..."
                className="w-64 pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 text-gray-400" size={18} />
            </div>
            
            <Button variant="ghost" size="icon" className="md:ml-2" asChild>
              <Link to="/cart">
                <ShoppingCart />
              </Link>
            </Button>
            
            <Button variant="ghost" size="icon" asChild>
              <Link to="/account">
                <User />
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Mobile Search */}
        <div className="mt-4 md:hidden">
          <div className="relative">
            <Input
              type="text"
              placeholder="Ürün ara..."
              className="w-full pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
