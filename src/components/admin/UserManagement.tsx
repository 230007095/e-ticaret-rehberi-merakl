
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Edit, Trash2, UserPlus } from "lucide-react";

export const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Örnek kullanıcı verileri
  const users = [
    { id: 1, name: "Ahmet Yılmaz", email: "ahmet@yapimarket.com", role: "Admin", lastLogin: "2 saat önce" },
    { id: 2, name: "Mehmet Kaya", email: "mehmet@yapimarket.com", role: "Satış Temsilcisi", lastLogin: "1 gün önce" },
    { id: 3, name: "Ayşe Demir", email: "ayse@yapimarket.com", role: "Satış Temsilcisi", lastLogin: "3 gün önce" },
    { id: 4, name: "Fatma Şahin", email: "fatma@yapimarket.com", role: "Stok Yöneticisi", lastLogin: "5 saat önce" },
    { id: 5, name: "Ali Öztürk", email: "ali@yapimarket.com", role: "Müşteri Temsilcisi", lastLogin: "1 hafta önce" },
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Kullanıcı Yönetimi</h2>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Kullanıcı ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Yeni Kullanıcı
        </Button>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kullanıcı</TableHead>
              <TableHead>E-posta</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Son Giriş</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.lastLogin}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="icon" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
