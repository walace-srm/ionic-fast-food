import { Injectable } from '@angular/core';
import { collection, collectionData, doc, setDoc, getFirestore } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private firestore: Firestore = inject(Firestore);

  itens: any[] = [];

  // 🔸 Total de itens (soma quantidades)
  get totalItens() {
    return this.itens.reduce((acc, item) => acc + item.quantidade, 0);
  }

  // 🔸 Total geral (produto + extras)
  get total() {
    return this.itens.reduce((acc, item) => acc + item.total, 0);
  }

  adicionarItem(item: any) {
    const existente = this.itens.find(i => i.id === item.id && JSON.stringify(i.extras) === JSON.stringify(item.extras));

    if (existente) {
      existente.quantidade += item.quantidade;
      existente.total = this.calcularTotalItem(existente);
    } else {
      item.total = this.calcularTotalItem(item);
      this.itens.push(item);
    }
  }

  removerItem(item: any) {
    this.itens = this.itens.filter(i => i !== item);
  }

  limpar() {
    this.itens = [];
  }

  atualizarTotais() {
    this.itens.forEach(item => {
      item.total = this.calcularTotalItem(item);
    });
  }

  private calcularTotalItem(item: any): number {
    const precoBase = item.preco || 0;
    const totalExtras = (item.extras || []).reduce(
      (acc: number, extra: any) => acc + (extra.quantidade || 0) * (extra.valor || 0),
      0
    );
    return (precoBase * item.quantidade) + totalExtras;
  }

  // 🔥 Envia o pedido para o Firestore
  async enviarPedido(dadosCliente: any) {
    const pedido = {
      itens: this.itens,
      total: this.total,
      totalItens: this.totalItens,
      status: 'pendente', // 🔥 você pode usar: pendente, em produção, pronto, entregue
      dadosCliente: dadosCliente,
      criadoEm: new Date()
    };

    const pedidoId = crypto.randomUUID();
    const pedidoRef = doc(this.firestore, 'pedidos', pedidoId);

    await setDoc(pedidoRef, pedido);

    // Limpa o carrinho após envio
    this.limpar();

    return pedidoId;
  }
}
