import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IonButtons,
  IonContent,
  IonHeader,

  IonMenu,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

import { register } from 'swiper/element/bundle';
import { PedidoService } from './pages/services/pedido/pedido.service';
import { IonBadge } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { MenuController } from '@ionic/angular';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    RouterModule,
    CommonModule,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonMenuButton,
    IonBadge
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  pedidoService = inject(PedidoService);
  menu = inject(MenuController)

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {
  }

  fecharMenu() {
    this.menu.close();
  }
}
