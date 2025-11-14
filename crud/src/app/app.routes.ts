import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  // LOGIN (ruta pública)
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component')
        .then(m => m.LoginComponent)
  },

  // LAYOUT PROTEGIDO
  {
  path: '',
  canActivate: [AuthGuard],
  loadComponent: () =>
    import('./pages/layout/app-layout/app-layout.component').then(m => m.AppLayoutComponent),

  children: [
    {
      path: 'products',
      loadComponent: () =>
        import('./pages/components/product-list/product-list.component')
          .then(m => m.ProductListComponent)
    },
    {
      path: 'add-product',
      loadComponent: () =>
        import('./pages/components/form-product/form-product.component')
          .then(m => m.FormProductComponent)
    }
  ]
},


  // fallback
  { path: '**', redirectTo: 'login' }
];
