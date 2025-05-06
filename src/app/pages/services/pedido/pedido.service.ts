import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  itens: any[] = [];

  get totalItens() {
    return this.itens.length;
  }

  get total() {
    console.log(this.itens);
    return this.itens.reduce((acc, item) => acc + item.preco, 0);
  }

  adicionarItem(item: any) {
    this.itens.push(item);
  }

  limparPedido() {
    this.itens = [];
  }
}