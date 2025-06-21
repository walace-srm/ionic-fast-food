import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { ProductService } from 'src/app/pages/services/products/producs.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class AdminProductComponent {
  form: FormGroup;

  imagens = [
    { name: 'Número 1', path: 'assets/images/burguer1.png' },
    { name: 'Número 2', path: 'assets/images/burguer2.png' },
    { name: 'Número 3', path: 'assets/images/burguer1.png' },
    { name: 'Guaraná natural', path: 'assets/images/guaracamp.png' },
    // ➕ Adicione mais imagens conforme sua estrutura
  ];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private toast: ToastController,
    private loadingCtrl: LoadingController
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      descricao: [''],
      preco: [null, Validators.required],
      categoria: ['', Validators.required],
      imagem: ['', Validators.required], // Caminho da imagem
      extras: this.fb.array([])
    });
  }

  get extras() {
    return this.form.get('extras') as FormArray;
  }

  addExtra() {
    const extra = this.fb.group({
      nome: ['', Validators.required],
      valor: [0, Validators.required]
    });
    this.extras.push(extra);
  }

  removeExtra(index: number) {
    this.extras.removeAt(index);
  }

  getExtrasControls() {
    return (this.form.get('extras') as FormArray).controls as FormGroup[];
  }

  async submit() {
    if (this.form.invalid) {
      this.showToast('Preencha todos os campos obrigatórios.');
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Salvando...' });
    await loading.present();

    try {
      const produto = this.form.value;
      const productId = crypto.randomUUID();

      await this.productService.create({
        ...produto,
        id: productId
      });

      this.form.reset();
      this.extras.clear();

      this.showToast('Produto cadastrado com sucesso!');
    } catch (error) {
      console.error(error);
      this.showToast('Erro ao cadastrar produto.');
    } finally {
      loading.dismiss();
    }
  }

  async showToast(message: string) {
    const toast = await this.toast.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
