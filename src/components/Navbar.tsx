
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShoppingCart, Search, Menu, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout, isAuthenticated } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would navigate to search results
      console.log("Searching for:", searchQuery);
    }
  };

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
                  {isAuthenticated ? (
                    <>
                      <div className="text-lg font-medium">Merhaba, {user?.name}</div>
                      <Button variant="ghost" className="justify-start px-0" onClick={() => logout()}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Çıkış Yap
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="text-lg font-medium">Giriş Yap</Link>
                      <Link to="/signup" className="text-lg font-medium">Kayıt Ol</Link>
                    </>
                  )}
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
              <form onSubmit={handleSearch}>
                <Input
                  type="text"
                  placeholder="Ürün ara..."
                  className="w-64 pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button 
                  type="submit" 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 top-0 h-full"
                >
                  <Search className="text-gray-400" size={18} />
                </Button>
              </form>
            </div>
            
            <Button variant="ghost" size="icon" className="md:ml-2 relative" asChild>
              <Link to="/cart">
                <ShoppingCart />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </Button>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    Merhaba, {user?.name}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">Profilim</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="cursor-pointer">Siparişlerim</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Çıkış Yap
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/login" className="cursor-pointer">Giriş Yap</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/signup" className="cursor-pointer">Kayıt Ol</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
        
        {/* Mobile Search */}
        <div className="mt-4 md:hidden">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Ürün ara..."
              className="w-full pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0 h-full"
            >
              <Search className="text-gray-400" size={18} />
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
