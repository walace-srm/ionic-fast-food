import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/products/producs.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ReactiveFormsModule
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  form: FormGroup;
  categories = ['Blusa', 'Bermuda', 'Calça'];
  sizes = ['P', 'M', 'G', 'GG', '36', '38', '40', '42'];
  colors = ['Preto', 'Branco', 'Azul', 'Vermelho', 'Verde'];
  selectedImage = '';
  allImages: string[] = [];
  selectedImages: string[] = [];

  constructor(
    private fb: FormBuilder,
    //private snackBar: MatSnackBar,
    private router: Router,
    private productService: ProductService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(1)]],
      category: ['', [Validators.required]],
      size: [''],
      color: [''],
      //image: ['', [Validators.required]],
      images: [],
      status: [],
      discount: []
    });

    this.generateImages();
  }

  generateImages() {
    const folders = ['blusas', 'bermudas', 'calcas'];
    for (let folder of folders) {
      for (let i = 1; i <= 5; i++) {
        this.allImages.push(`assets/images/${folder}/${i}.jpg`);
      }
    }
  }

  onImageSelect(imagePath: string) {
    if (!this.selectedImages.includes(imagePath)) {
      this.selectedImages.push(imagePath);
      this.form.patchValue({ images: this.selectedImages });
    }
  }

  removeImage(imagePath: string) {
    this.selectedImages = this.selectedImages.filter(img => img !== imagePath);
    this.form.patchValue({ images: this.selectedImages });
  }

  get images(): FormArray {
    return this.form.get('images') as FormArray;
  }

  onImageToggle(image: string, event: any) {
    const checked = event.checked;
    if (checked) {
      this.images.push(this.fb.control(image));
    } else {
      const index = this.images.controls.findIndex(ctrl => ctrl.value === image);
      if (index !== -1) {
        this.images.removeAt(index);
      }
    }
  }

  async onSubmit() {
    if (this.form.invalid) {
      // this.snackBar.open('Preencha todos os campos obrigatórios.', 'Fechar', {
      //   duration: 3000
      // });
      return;
    }

    const product: any = this.form.value;

    try {
      await this.productService.create(product);
      // this.snackBar.open('Produto cadastrado com sucesso!', 'Fechar', {
      //   duration: 3000
      // });
      this.form.reset();
      this.selectedImage = '';
    } catch (error) {
      console.error(error);
      // this.snackBar.open('Erro ao cadastrar o produto.', 'Fechar', {
      //   duration: 3000
      // });
    }
  }

  onCancel() {
    this.router.navigate(['/products'])
  }
}
