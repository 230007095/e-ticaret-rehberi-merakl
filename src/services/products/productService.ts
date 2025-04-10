
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Product } from "./types";

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

// Re-export types for backward compatibility
export type { Product } from './types';
export { dummyProducts } from './types';
