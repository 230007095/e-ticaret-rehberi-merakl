
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: "E-Ticaret Sitesi",
    siteDescription: "Geniş ürün gamına sahip e-ticaret platformu",
    contactEmail: "iletisim@eticaret.com",
    contactPhone: "+90 555 123 4567",
    enableNotifications: true,
    enableGuestCheckout: true,
    maintenanceMode: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSettings({
      ...settings,
      [name]: checked,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Site Ayarları</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Adı</Label>
              <Input 
                id="siteName" 
                name="siteName" 
                value={settings.siteName}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contactEmail">İletişim E-posta</Label>
              <Input 
                id="contactEmail" 
                name="contactEmail" 
                type="email"
                value={settings.contactEmail}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="siteDescription">Site Açıklaması</Label>
            <Textarea 
              id="siteDescription" 
              name="siteDescription"
              value={settings.siteDescription}
              onChange={handleChange}
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactPhone">İletişim Telefon</Label>
              <Input 
                id="contactPhone" 
                name="contactPhone"
                value={settings.contactPhone}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Özellik Ayarları</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableNotifications">Bildirimler</Label>
              <p className="text-sm text-muted-foreground">
                Kullanıcılara e-posta bildirimleri gönder
              </p>
            </div>
            <Switch 
              id="enableNotifications"
              checked={settings.enableNotifications}
              onCheckedChange={(checked) => handleSwitchChange("enableNotifications", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableGuestCheckout">Misafir Alışverişi</Label>
              <p className="text-sm text-muted-foreground">
                Kullanıcıların üye olmadan alışveriş yapmasına izin ver
              </p>
            </div>
            <Switch 
              id="enableGuestCheckout"
              checked={settings.enableGuestCheckout}
              onCheckedChange={(checked) => handleSwitchChange("enableGuestCheckout", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="maintenanceMode" className="text-red-500">Bakım Modu</Label>
              <p className="text-sm text-muted-foreground">
                Siteyi bakım moduna alır ve ziyaretçilere bakım sayfası gösterilir
              </p>
            </div>
            <Switch 
              id="maintenanceMode"
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) => handleSwitchChange("maintenanceMode", checked)}
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline">Varsayılanlara Sıfırla</Button>
        <Button>Ayarları Kaydet</Button>
      </div>
    </div>
  );
};
