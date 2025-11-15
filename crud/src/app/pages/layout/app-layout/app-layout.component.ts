import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-layout',
  imports: [
    RouterLink,          // 👈 NECESARIO PARA routerLink
    RouterLinkActive, 
    CommonModule,
    RouterOutlet,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    RouterLinkActive,   // 👈 IMPORTANTE
  ],
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent {

  isCollapsed = false;

   constructor(private auth: AuthService, private router: Router) {}

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/login']);
  }

}
