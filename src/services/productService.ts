
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  firm: string;
  stock: number;
  sku: string;
  description: string;
  category?: string;
  subcategory?: string;
  firmId?: string;
  categoryId?: string;
}

// Provide some sample products for development/testing
export const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Ayarlanabilir Kol GN.15",
    price: 899.99,
    oldPrice: 1299.99,
    image: "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80",
    rating: 4.5,
    firm: "Elesa Ganter",
    stock: 42,
    sku: "EG-AK-15-001",
    description: "Endüstriyel uygulamalar için yüksek kaliteli ayarlanabilir kol. Paslanmaz çelik yapısı ile uzun ömürlü kullanım sağlar."
  },
  {
    id: "2",
    name: "Paslanmaz Çelik Menteşe HB.25",
    price: 249.99,
    oldPrice: 349.99,
    image: "https://images.unsplash.com/photo-1574359173043-01fe81602379?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    rating: 4,
    firm: "Elesa Ganter",
    stock: 78,
    sku: "EG-PCM-25-002",
    description: "AISI 316 paslanmaz çelikten üretilen, ağır yük kapasiteli menteşe. Yüksek korozyon direnci ve dayanıklılık sağlar."
  }
];

export const getProducts = async (): Promise<Product[]> => {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select(`
        *,
        firms (name),
        categories (name)
      `)
      .order('name');
    
    if (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Hata",
        description: "Ürünler yüklenirken bir hata oluştu.",
        variant: "destructive"
      });
      return [];
    }
    
    return products.map(product => ({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      oldPrice: product.old_price ? Number(product.old_price) : undefined,
      image: product.image_url || "https://via.placeholder.com/300?text=Ürün+Görseli",
      rating: Number(product.rating) || 0,
      firm: product.firms?.name || "-",
      stock: product.stock || 0,
      sku: product.sku,
      description: product.description || "",
      subcategory: product.subcategory,
      category: product.categories?.name,
      firmId: product.firm_id,
      categoryId: product.category_id
    }));
  } catch (err) {
    console.error("Error in getProducts:", err);
    return [];
  }
};

export const getFilteredProducts = async (
  searchQuery: string = "",
  selectedFirm: string = "",
  priceRange: number[] = [0, 10000],
  sortOption: string = "featured"
): Promise<Product[]> => {
  try {
    let query = supabase
      .from('products')
      .select(`
        *,
        firms (name),
        categories (name)
      `);
    
    // Arama filtresi
    if (searchQuery) {
      query = query.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,sku.ilike.%${searchQuery}%`);
    }
    
    // Firma filtresi
    if (selectedFirm && selectedFirm !== "Tümü" && selectedFirm !== "all") {
      query = query.eq('firms.name', selectedFirm);
    }
    
    // Fiyat aralığı filtresi
    query = query.gte('price', priceRange[0]).lte('price', priceRange[1]);
    
    // Sıralama
    switch (sortOption) {
      case "price-asc":
        query = query.order('price', { ascending: true });
        break;
      case "price-desc":
        query = query.order('price', { ascending: false });
        break;
      case "name-asc":
        query = query.order('name', { ascending: true });
        break;
      case "name-desc":
        query = query.order('name', { ascending: false });
        break;
      default:
        query = query.order('created_at', { ascending: false });
    }
    
    const { data: products, error } = await query;
    
    if (error) {
      console.error("Error fetching filtered products:", error);
      toast({
        title: "Hata",
        description: "Ürünler filtrelenirken bir hata oluştu.",
        variant: "destructive"
      });
      return [];
    }
    
    return products.map(product => ({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      oldPrice: product.old_price ? Number(product.old_price) : undefined,
      image: product.image_url || "https://via.placeholder.com/300?text=Ürün+Görseli",
      rating: Number(product.rating) || 0,
      firm: product.firms?.name || "-",
      category: product.categories?.name,
      stock: product.stock || 0,
      sku: product.sku,
      description: product.description || "",
      subcategory: product.subcategory,
      firmId: product.firm_id,
      categoryId: product.category_id
    }));
  } catch (err) {
    console.error("Error in getFilteredProducts:", err);
    return [];
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const { data: product, error } = await supabase
      .from('products')
      .select(`
        *,
        firms (name),
        categories (name)
      `)
      .eq('id', id)
      .single();
    
    if (error) {
      console.error("Error fetching product details:", error);
      return null;
    }
    
    if (product) {
      return {
        id: product.id,
        name: product.name,
        price: Number(product.price),
        oldPrice: product.old_price ? Number(product.old_price) : undefined,
        image: product.image_url || "https://via.placeholder.com/300?text=Ürün+Görseli",
        rating: Number(product.rating) || 0,
        firm: product.firms?.name || "-",
        category: product.categories?.name,
        stock: product.stock || 0,
        sku: product.sku,
        description: product.description || "",
        subcategory: product.subcategory,
        firmId: product.firm_id,
        categoryId: product.category_id
      };
    }
    return null;
  } catch (err) {
    console.error("Error in getProductById:", err);
    return null;
  }
};

export const getFirms = async (): Promise<{id: string, name: string}[]> => {
  try {
    const { data: firms, error } = await supabase
      .from('firms')
      .select('id, name')
      .order('name');
    
    if (error) {
      console.error("Error fetching firms:", error);
      return [];
    }
    
    return firms;
  } catch (err) {
    console.error("Error in getFirms:", err);
    return [];
  }
};

export const getCategories = async (): Promise<{id: string, name: string}[]> => {
  try {
    const { data: categories, error } = await supabase
      .from('categories')
      .select('id, name')
      .order('name');
    
    if (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
    
    return categories;
  } catch (err) {
    console.error("Error in getCategories:", err);
    return [];
  }
};

export const updateProduct = async (product: Product): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('products')
      .update({
        name: product.name,
        sku: product.sku,
        description: product.description,
        price: product.price,
        old_price: product.oldPrice,
        stock: product.stock,
        firm_id: product.firmId,
        category_id: product.categoryId,
        subcategory: product.subcategory,
        rating: product.rating,
        image_url: product.image,
        updated_at: new Date().toISOString()
      })
      .eq('id', product.id);
    
    if (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Hata",
        description: "Ürün güncellenirken bir hata oluştu.",
        variant: "destructive"
      });
      return false;
    }
    
    toast({
      title: "Başarılı",
      description: "Ürün başarıyla güncellendi."
    });
    return true;
  } catch (err) {
    console.error("Error in updateProduct:", err);
    return false;
  }
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert({
        name: product.name,
        sku: product.sku,
        description: product.description,
        price: product.price,
        old_price: product.oldPrice,
        stock: product.stock,
        firm_id: product.firmId,
        category_id: product.categoryId,
        subcategory: product.subcategory,
        rating: product.rating || 0,
        image_url: product.image
      })
      .select();
    
    if (error) {
      console.error("Error creating product:", error);
      toast({
        title: "Hata",
        description: "Ürün eklenirken bir hata oluştu.",
        variant: "destructive"
      });
      return null;
    }
    
    toast({
      title: "Başarılı",
      description: "Ürün başarıyla eklendi."
    });
    
    // Ürün resmi varsa onu da ürün görselleri tablosuna ekle
    if (product.image && data && data[0]) {
      await supabase
        .from('product_images')
        .insert({
          product_id: data[0].id,
          url: product.image,
          is_primary: true
        });
    }
    
    return data?.[0]?.id || null;
  } catch (err) {
    console.error("Error in createProduct:", err);
    return null;
  }
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Hata",
        description: "Ürün silinirken bir hata oluştu.",
        variant: "destructive"
      });
      return false;
    }
    
    toast({
      title: "Başarılı",
      description: "Ürün başarıyla silindi."
    });
    return true;
  } catch (err) {
    console.error("Error in deleteProduct:", err);
    return false;
  }
};
