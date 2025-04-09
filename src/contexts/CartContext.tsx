
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  quantity: number;
  firm: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product: Omit<CartItem, "quantity">) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);
      
      if (existingItem) {
        toast({
          title: "Ürün Güncellendi",
          description: `${product.name} ürününün miktarı artırıldı.`,
        });
        
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast({
          title: "Sepete Eklendi",
          description: `${product.name} sepete eklendi.`,
        });
        
        return [...currentItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeItem = (id: number) => {
    setItems((currentItems) => {
      const itemToRemove = currentItems.find((item) => item.id === id);
      
      if (itemToRemove) {
        toast({
          title: "Ürün Silindi",
          description: `${itemToRemove.name} sepetten çıkarıldı.`,
        });
      }
      
      return currentItems.filter((item) => item.id !== id);
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Sepet Temizlendi",
      description: "Tüm ürünler sepetten çıkarıldı.",
    });
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
