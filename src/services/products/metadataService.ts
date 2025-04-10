
import { supabase } from "@/integrations/supabase/client";

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
