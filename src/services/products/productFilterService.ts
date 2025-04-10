
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Product } from "./types";

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
