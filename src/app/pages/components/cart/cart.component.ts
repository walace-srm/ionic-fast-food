import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../services/pedido/pedido.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  constructor(public pedidoService: PedidoService) {}

  incrementar(item: any) {
    item.quantidade++;
    this.pedidoService.atualizarTotais();
  }

  decrementar(item: any) {
    if (item.quantidade > 1) {
      item.quantidade--;
      this.pedidoService.atualizarTotais();
    } else {
      this.remover(item);
    }
  }

  remover(item: any) {
    this.pedidoService.removerItem(item);
  }

  limparCarrinho() {
    this.pedidoService.limpar();
  }
}
