import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductFactory } from 'src/app/classes/class/ProductFactory';
import { IProduct } from 'src/app/classes/interface/IProduct';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class ProductCreateComponent implements OnInit {
  productForm!: FormGroup;
  currentType: string = 'Outerwear';

  types = [
    { value: 'Outerwear', label: 'Верхній одяг' },
    { value: 'Shoes', label: 'Взуття' },
    { value: 'Accessory', label: 'Аксесуари' },
    { value: 'Sportswear', label: 'Спортивний одяг' },
  ];

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.createForm();
    this.onTypeChange(this.currentType);
    console.log('[Create Init] Форма створена з типом:', this.currentType);
  }

  createForm() {
    this.productForm = this.fb.group({
      id: [Date.now(), [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)]],
      type: [this.currentType, Validators.required],
    });

    console.log('[Create Form] Базова форма ініціалізована:', this.productForm.value);
  }

  onTypeChange(type: string): void {
    this.currentType = type;
    console.log('[Create TypeChange] Тип змінено на:', type);

    const controls = this.productForm.controls;

    ['size', 'material', 'color', 'accessoryType', 'sportType'].forEach((field) => {
      if (controls[field]) {
        this.productForm.removeControl(field);
        console.log(`[Create TypeChange] Видалено поле: ${field}`);
      }
    });

    switch (type) {
      case 'Outerwear':
        this.productForm.addControl('size', this.fb.control('', Validators.required));
        this.productForm.addControl('material', this.fb.control('', Validators.required));
        break;
      case 'Shoes':
        this.productForm.addControl('size', this.fb.control('', [Validators.required, Validators.min(15)]));
        this.productForm.addControl('color', this.fb.control('', Validators.required));
        break;
      case 'Accessory':
        this.productForm.addControl('accessoryType', this.fb.control('', Validators.required));
        break;
      case 'Sportswear':
        this.productForm.addControl('size', this.fb.control('', Validators.required));
        this.productForm.addControl('sportType', this.fb.control('', Validators.required));
        break;
    }

    console.log('[Create TypeChange] Форма після зміни типу:', this.productForm.value);
    this.productForm.get('type')?.setValue(type);
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      console.log('[Create Submit] Дані з форми перед створенням продукту:', formData);

      const product = ProductFactory.createProduct(formData);
      console.log('[Create Submit] Створено продукт:', product);

      this.modalController.dismiss(product);
    } else {
      console.error('[Create Submit] Форма невалідна:', this.productForm.errors);
    }
  }

  cancel() {
    this.modalController.dismiss();
  }
}
