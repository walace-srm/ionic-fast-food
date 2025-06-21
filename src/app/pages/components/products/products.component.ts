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
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
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
    this.productService.getAll().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
        this.categorias = [
          ...new Set(
            produtos
              .map(p => p.categoria)
              .filter(c => !!c)
          )
        ];
        this.categoriaSelecionada = this.categorias[0];
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
        this.loading.set(false);
      }
    });
  }

  adicionar(item: any) {
    const itemPedido = {
      ...item,
      quantidade: 1,
      extras: [],
      total: item.preco
    };

    this.pedidoService.adicionarItem(itemPedido);
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
