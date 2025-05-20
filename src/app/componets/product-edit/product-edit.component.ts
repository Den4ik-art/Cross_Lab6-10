import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

import { IProduct } from 'src/app/classes/interface/IProduct';
import { ProductFactory } from 'src/app/classes/class/ProductFactory';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class ProductEditComponent implements OnInit {
  @Input() product!: IProduct;

  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController
  ) {}

  ngOnInit(): void {
    console.log('[Edit Init] Отримано продукт:', this.product);

    this.productForm = this.fb.group({
      id: [this.product.getID(), Validators.required],
      name: [this.product.getName(), [Validators.required, Validators.minLength(3)]],
      price: [this.product.getPrice(), [Validators.required, Validators.min(0.01)]],
      type: [this.product.getType(), Validators.required],

      size: [(this.product as any).size || ''],
      material: [(this.product as any).material || ''],
      color: [(this.product as any).color || ''],
      accessoryType: [(this.product as any).accessoryType || ''],
      sportType: [(this.product as any).sportType || ''],
    });

    console.log('[Edit Init] Ініціалізована форма редагування:', this.productForm.value);
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      console.error('[Edit Submit] Форма невалідна:', this.productForm.errors);
      return;
    }

    const formData = this.productForm.value;
    console.log('[Edit Submit] Дані з форми перед створенням продукту:', formData);

    try {
      const updatedProduct = ProductFactory.createProduct(formData);
      console.log('[Edit Submit] Оновлений продукт:', updatedProduct);
      this.modalController.dismiss(updatedProduct);
    } catch (error) {
      console.error('[Edit Submit] Помилка при створенні продукту:', error);
    }
  }

  close(): void {
    this.modalController.dismiss();
  }
}
