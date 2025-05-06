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
  }
];
