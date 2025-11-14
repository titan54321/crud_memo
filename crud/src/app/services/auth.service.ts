import { Injectable } from '@angular/core';
import { supabase } from '../Supabase/supabase.client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  // 👉 LOGIN
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data.session;
  }

  // 👉 LOGOUT
  async logout() {
    await supabase.auth.signOut();
  }

  // 👉 OBTENER SESIÓN ACTUAL
  async getSession() {
    const { data } = await supabase.auth.getSession();
    return data.session;
  }

  // 👉 OBTENER USUARIO
  async getUser() {
    const { data } = await supabase.auth.getUser();
    return data.user;
  }
}
