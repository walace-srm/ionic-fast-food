import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { bootstrapApplication } from '@angular/platform-browser';
import { PreloadAllModules, RouteReuseStrategy, provideRouter, withPreloading } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

// ✅ Importa e registra os ícones do Ionicons
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { addIcons } from 'ionicons';
import {
  add, addOutline,
  cart, cartOutline,
  cashOutline,
  chevronBack,
  chevronForward,
  close,
  eyeOutline,
  fastFoodOutline,
  heart, heartOutline,
  home, homeOutline,
  menu, menuOutline,
  remove, removeOutline,
  search,
  star, starOutline
} from 'ionicons/icons';
import { environment } from './environments/environment';

registerLocaleData(localePt);

addIcons({
  home,
  homeOutline,
  heart,
  heartOutline,
  cart,
  cartOutline,
  add,
  addOutline,
  remove,
  removeOutline,
  menu,
  menuOutline,
  chevronForward,
  chevronBack,
  star,
  starOutline,
  search,
  close,
  eyeOutline,
  cashOutline,
  fastFoodOutline
});

// 🚀 Inicializa a aplicação
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
});
