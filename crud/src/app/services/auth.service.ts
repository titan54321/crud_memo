import { Injectable } from '@angular/core';
import { supabase } from '../Supabase/supabase.client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isBrowser = typeof window !== 'undefined';

  constructor() {}

  // LOGIN
  async login(email: string, password: string) {
    if (!this.isBrowser) return null; // SSR safe

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data.session;
  }

  // LOGOUT
  async logout() {
    if (!this.isBrowser) return;
    await supabase.auth.signOut();
  }

  // OBTENER SESIÓN
  async getSession() {
    if (!this.isBrowser) return null;

    const { data } = await supabase.auth.getSession();
    return data.session;
  }

  // OBTENER USUARIO
  async getUser() {
    if (!this.isBrowser) return null;

    const { data } = await supabase.auth.getUser();
    return data.user;
  }
}
