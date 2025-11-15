import { Injectable } from '@angular/core';
import { supabase } from '../Supabase/supabase.client';
import { AuthService } from './auth.service';

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

  constructor(private auth: AuthService) {}

  async getProducts(): Promise<Product[]> {

    const user = await this.auth.getUser();
    if (!user) throw new Error("Usuario no autenticado");

    const { data, error } = await supabase
      .from('product')
      .select('*')
      .eq('user_id', user.id)
      .order('id', { ascending: true });

    if (error) throw error;
    return data as Product[];
  }

  async addProduct(product: Product) {

    const user = await this.auth.getUser();
    if (!user) throw new Error("Usuario no autenticado");//Con este if comprobamos que el usuario no lo mande como null


    const { data, error } = await supabase
      .from('product')
      .insert({
        ...product,
        user_id: user.id    // 👈 OBLIGATORIO
      })
      .select();

    if (error) throw error;
    return data;
  }

async updateProduct(id: number, product: Product) {

  const user = await this.auth.getUser();
  if (!user) throw new Error("Usuario no autenticado");

  const { data, error } = await supabase
    .from('product')
    .update({
      name: product.name,
      price: product.price,
      stock: product.stock
    })
    .eq('id', id)
    .eq('user_id', user.id) // ✔ asegura propiedad
    .select();

  if (error) {
    console.error("ERROR UPDATE:", error);
    throw error;
  }

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
