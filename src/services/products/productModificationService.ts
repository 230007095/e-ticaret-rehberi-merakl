
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Product } from "./types";

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
