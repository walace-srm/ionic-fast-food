import { CommonModule } from '@angular/common';
import {
  AfterViewInit, Component, ElementRef, OnDestroy, OnInit,
  ViewChild,
  inject, signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonContent,
  IonFooter,
  IonIcon, IonItem, IonLabel, IonList, IonModal,
  IonNote,
  IonSegment, IonSegmentButton, IonThumbnail,
  IonToolbar
} from '@ionic/angular/standalone';
import { PedidoService } from '../../services/pedido/pedido.service';
import { ProductService } from '../../services/products/producs.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonCard,
    IonButton,
    IonToolbar,
    IonFooter,
    IonIcon,
    IonList,
    IonSegmentButton,
    IonContent,
    IonSegment,
    IonLabel,
    IonItem,
    IonThumbnail,
    IonModal,
    IonNote
  ]
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('modal', { static: true }) modal!: IonModal;
  @ViewChild('sentinela', { static: true }) sentinelaRef!: ElementRef;
  @ViewChild('segmentContainer', { static: true }) segmentContainerRef!: ElementRef;

  private productService = inject(ProductService);
  public pedidoService = inject(PedidoService);

  categoriaSelecionada = 'hamburguer';
  categorias: string[] = [];
  produtos: any[] = [];

  selectedItem: any;
  quantidade: number = 1;

  presentingElement!: HTMLElement | null;
  loading = signal(false);

  private observer!: IntersectionObserver;

  ngOnInit() {
    this.getAll();
    this.presentingElement = document.querySelector('.ion-page');
  }

  ngAfterViewInit() {
    const segmentEl = this.segmentContainerRef.nativeElement as HTMLElement;
    const sentinelaEl = this.sentinelaRef.nativeElement as HTMLElement;

    this.observer = new IntersectionObserver(
      ([entry]) => {
        segmentEl.classList.toggle('fixed-segment', !entry.isIntersecting);
      },
      { root: null, threshold: 0 }
    );

    this.observer.observe(sentinelaEl);
  }

  ngOnDestroy() {
    if (this.observer && this.sentinelaRef?.nativeElement) {
      this.observer.unobserve(this.sentinelaRef.nativeElement);
    }
  }

  getAll() {
    this.loading.set(true);
    // Simulando chamada ao service (pode ser substituído por this.productService.getAll().subscribe(...))
    this.produtos = [
      {
        id: 1,
        nome: 'Numero 1',
        descricao: 'Pão com gergilim, ketchup, mostarda, cebola, alface, tomate, presunto, cheddar fatiado e 1 carne.',
        preco: 11.00,
        categoria: 'hamburguer',
        imagem: 'assets/images/burguer1.png',
        extras: [
          { nome: 'Carne', valor: 2.5 },
          { nome: 'Cheddar fatiado', valor: 2.0 },
          { nome: 'Ovo', valor: 1.5 },
          { nome: 'Bacon', valor: 2.0 }
        ]
      },
      {
        id: 2,
        nome: 'Numero 2',
        descricao: 'Pão com gergilim, ketchup, mostarda, cebola, alface, tomate, presunto, cheddar fatiado, 1 ovo e 2 carnes.',
        preco: 13.50,
        categoria: 'hamburguer',
        imagem: 'assets/images/burguer2.png'
      },
      {
        id: 3,
        nome: 'Numero 3',
        descricao: 'Pão com gergilim, ketchup, mostarda, cebola, alface, tomate, presunto, cheddar fatiado e 1 carne.',
        preco: 11.00,
        categoria: 'hamburguer',
        imagem: 'assets/images/burguer1.png'
      },
      {
        id: 4,
        nome: 'Numero 4',
        descricao: 'Pão com gergilim, ketchup, mostarda, cebola, alface, tomate, presunto, cheddar fatiado, 1 ovo e 2 carnes.',
        preco: 13.50,
        categoria: 'hamburguer',
        imagem: 'assets/images/burguer2.png'
      },
      {
        id: 5,
        nome: 'Numero 5',
        descricao: 'Pão com gergilim, ketchup, mostarda, cebola, alface, tomate, presunto, cheddar fatiado e 1 carne.',
        preco: 11.00,
        categoria: 'hamburguer',
        imagem: 'assets/images/burguer1.png'
      },
      {
        id: 6,
        nome: 'Numero 6',
        descricao: 'Pão com gergilim, ketchup, mostarda, cebola, alface, tomate, presunto, cheddar fatiado, 1 ovo e 2 carnes.',
        preco: 13.50,
        categoria: 'hamburguer',
        imagem: 'assets/images/burguer2.png'
      },
      {
        id: 7,
        nome: 'Numero 7',
        descricao: 'Pão com gergilim, ketchup, mostarda, cebola, alface, tomate, presunto, cheddar fatiado e 1 carne.',
        preco: 11.00,
        categoria: 'hamburguer',
        imagem: 'assets/images/burguer1.png'
      },
      {
        id: 8,
        nome: 'Numero 8',
        descricao: 'Pão com gergilim, ketchup, mostarda, cebola, alface, tomate, presunto, cheddar fatiado, 1 ovo e 2 carnes.',
        preco: 13.50,
        categoria: 'hamburguer',
        imagem: 'assets/images/burguer2.png'
      },
      {
        id: 9,
        nome: 'Numero 9',
        descricao: 'Pão com gergilim, ketchup, mostarda, cebola, alface, tomate, presunto, cheddar fatiado e 1 carne.',
        preco: 11.00,
        categoria: 'hamburguer',
        imagem: 'assets/images/burguer1.png'
      },
      {
        id: 10,
        nome: 'Numero 10',
        descricao: 'Pão com gergilim, ketchup, mostarda, cebola, alface, tomate, presunto, cheddar fatiado, 1 ovo e 2 carnes.',
        preco: 13.50,
        categoria: 'hamburguer',
        imagem: 'assets/images/burguer2.png'
      },
      {
        id: 11,
        nome: 'Numero 11',
        descricao: 'Pão com gergilim, ketchup, mostarda, cebola, alface, tomate, presunto, cheddar fatiado e 1 carne.',
        preco: 11.00,
        categoria: 'hamburguer',
        imagem: 'assets/images/burguer1.png'
      },
      {
        id: 12,
        nome: 'Numero 12',
        descricao: 'Pão com gergilim, ketchup, mostarda, cebola, alface, tomate, presunto, cheddar fatiado, 1 ovo e 2 carnes.',
        preco: 13.50,
        categoria: 'hamburguer',
        imagem: 'assets/images/burguer2.png'
      },
      {
        id: 13,
        nome: 'Numero 13',
        descricao: 'Pão com gergilim, ketchup, mostarda, cebola, alface, tomate, presunto, cheddar fatiado e 1 carne.',
        preco: 11.00,
        categoria: 'hamburguer',
        imagem: 'assets/images/burguer1.png'
      },
      {
        id: 14,
        nome: 'Numero 14',
        descricao: 'Pão com gergilim, ketchup, mostarda, cebola, alface, tomate, presunto, cheddar fatiado, 1 ovo e 2 carnes.',
        preco: 13.50,
        categoria: 'hamburguer',
        imagem: 'assets/images/burguer2.png'
      },
      {
        id: 1,
        nome: 'Guaraná natural',
        descricao: 'Refresco de guaraná natural 290ml.',
        preco: 3.00,
        categoria: 'Bebidas',
        imagem: 'assets/images/guaracamp.png'
      },
      {
        id: 2,
        nome: 'Refrigerante de guaraná',
        descricao: 'Refrigerante de guaraná 2l.',
        preco: 9,
        categoria: 'Bebidas',
        imagem: 'assets/images/guarana-antartica.png'
      },
    ];
    this.categorias = [...new Set(this.produtos.map(p => p.categoria))];
    this.loading.set(false);
  }

  adicionar(item: any) {
    this.pedidoService.adicionarItem(item);
  }

  abrirModal(item: any) {
    this.selectedItem = item;
    this.quantidade = 1;
    this.modal.present();
  }

  incrementar() {
    this.quantidade++;
  }

  decrementar() {
    if (this.quantidade > 1) this.quantidade--;
  }

  adicionarExtra(extra: any) {
    extra.quantidade = (extra.quantidade || 0) + 1;
  }

  calcularTotal(): number {
    const base = this.selectedItem?.preco || 0;
    const extras = (this.selectedItem?.extras || []).reduce((acc: number, cur: any) => acc + ((cur.quantidade || 0) * cur.valor), 0);
    return (base * this.quantidade) + extras;
  }

  adicionarAoPedido() {
    const item = {
      ...this.selectedItem,
      quantidade: this.quantidade,
      extras: this.selectedItem.extras?.filter((e: any) => e.quantidade),
      total: this.calcularTotal()
    };

    this.pedidoService.adicionarItem(item);
    this.modal.dismiss();
  }
}
