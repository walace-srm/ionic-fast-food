import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./pages/components/products/products.component').then((m) => m.ProductsComponent),
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/components/admin/admin-products/admin-products.component').then(m => m.AdminProductComponent)
  },
  {
    path: 'carrinho',
    loadComponent: () => import('./pages/components/cart/cart.component').then(m => m.CartComponent)
  }
];
