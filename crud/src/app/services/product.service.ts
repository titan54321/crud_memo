import { Injectable } from '@angular/core';
import { supabase } from '../Supabase/supabase.client';


export interface Product {
  id?: number;
  name: string;
  price: number;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() {}

  async getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('product')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;
    return data as Product[];
  }

  async addProduct(product: Product) {
    const { data, error } = await supabase
      .from('product')
      .insert(product)
      .select();

    if (error) throw error;
    return data;
  }

  async updateProduct(id: number, product: Product) {
    const { data, error } = await supabase
      .from('product')
      .update(product)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data;
  }

  async deleteProduct(id: number) {
    const { error } = await supabase
      .from('product')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}
