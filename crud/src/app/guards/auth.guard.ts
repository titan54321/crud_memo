import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

async canActivate(): Promise<boolean> {
  const session = await this.auth.getSession();

  if (session) {
    return true;
  }

  this.router.navigate(['login']); // OJO: sin slash
  return false;
}

}
