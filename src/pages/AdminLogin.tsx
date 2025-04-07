
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Lock, LogIn } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Şema tanımlaması
const formSchema = z.object({
  username: z.string().min(1, { message: "Kullanıcı adı gereklidir" }),
  password: z.string().min(1, { message: "Şifre gereklidir" }),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Admin bilgileri - Gerçek uygulamada bu bir API'dan gelmelidir
  const adminCredentials = {
    username: "admin",
    password: "yapim123"
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Basit bir kimlik doğrulama kontrolü
    if (values.username === adminCredentials.username && 
        values.password === adminCredentials.password) {
      // Başarılı giriş
      localStorage.setItem("yapim-admin-auth", "true");
      toast({
        title: "Giriş başarılı",
        description: "Yönetici paneline yönlendiriliyorsunuz.",
      });
      navigate("/admin");
    } else {
      // Başarısız giriş
      toast({
        title: "Giriş başarısız",
        description: "Kullanıcı adı veya şifre hatalı.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Yapımarket Yönetici Girişi
            </CardTitle>
            <CardDescription className="text-center">
              Yönetici paneline erişmek için giriş yapın
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kullanıcı Adı</FormLabel>
                      <FormControl>
                        <Input placeholder="admin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Şifre</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full" size="lg">
                  <LogIn className="mr-2 h-4 w-4" /> Giriş Yap
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-sm text-muted-foreground flex items-center">
              <Lock className="mr-1 h-4 w-4" /> Güvenli bağlantı
            </div>
          </CardFooter>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminLogin;
