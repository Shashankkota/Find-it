import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Item, ItemFormData } from '@/types/item';

export function useItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('items')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      // Transform database format to app format
      const transformedItems: Item[] = (data || []).map(item => ({
        id: item.id,
        type: item.type as 'lost' | 'found',
        name: item.name,
        description: item.description,
        location: item.location,
        date: item.date,
        contactName: item.contact_name,
        contactPhone: item.contact_phone || undefined,
        contactEmail: item.contact_email || undefined,
        category: item.category,
        createdAt: item.created_at
      }));

      setItems(transformedItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (itemData: ItemFormData): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error: insertError } = await supabase
        .from('items')
        .insert({
          type: itemData.type,
          name: itemData.name,
          description: itemData.description,
          location: itemData.location,
          date: itemData.date,
          contact_name: itemData.contactName,
          contact_phone: itemData.contactPhone || null,
          contact_email: itemData.contactEmail || null,
          category: itemData.category
        });

      if (insertError) throw insertError;

      // Refresh items after successful insert
      await fetchItems();
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add item';
      return { success: false, error: errorMessage };
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return {
    items,
    loading,
    error,
    addItem,
    refetch: fetchItems
  };
}