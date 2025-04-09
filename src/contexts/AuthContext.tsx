
import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "@/components/ui/use-toast";

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database for demo purposes
const MOCK_USERS = [
  {
    id: "1",
    email: "test@example.com",
    name: "Test User",
    password: "password123",
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = MOCK_USERS.find(
          (u) => u.email === email && u.password === password
        );

        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          localStorage.setItem("user", JSON.stringify(userWithoutPassword));
          toast({
            title: "Giriş Başarılı",
            description: "Hoş geldiniz, " + foundUser.name,
          });
          resolve(true);
        } else {
          toast({
            title: "Giriş Başarısız",
            description: "E-posta veya şifre hatalı",
            variant: "destructive",
          });
          resolve(false);
        }
      }, 800);
    });
  };

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingUser = MOCK_USERS.find((u) => u.email === email);
        if (existingUser) {
          toast({
            title: "Kayıt Başarısız",
            description: "Bu e-posta adresi zaten kullanılıyor",
            variant: "destructive",
          });
          resolve(false);
        } else {
          const newUser = {
            id: String(MOCK_USERS.length + 1),
            email,
            name,
            password,
          };
          MOCK_USERS.push(newUser);
          
          const { password: _, ...userWithoutPassword } = newUser;
          setUser(userWithoutPassword);
          localStorage.setItem("user", JSON.stringify(userWithoutPassword));
          
          toast({
            title: "Kayıt Başarılı",
            description: "Hesabınız başarıyla oluşturuldu!",
          });
          resolve(true);
        }
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Çıkış Yapıldı",
      description: "Başarıyla çıkış yaptınız",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
