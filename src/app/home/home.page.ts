import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { IProduct } from '../classes/interface/IProduct';
import { ModalController } from '@ionic/angular';
import { ProductCreateComponent } from '../componets/product-create/product-create.component';
import { ProductEditComponent } from '../componets/product-edit/product-edit.component';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle,
  IonButton,
  IonItem,
  IonLabel,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/angular/standalone';
import { MyHeaderComponentComponent } from '../my-header-component/my-header-component.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonCardSubtitle,
    IonButton,
    IonItem,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    ProductCreateComponent,
    ProductEditComponent,
    MyHeaderComponentComponent,
    CommonModule
  ]
})
export class HomePage implements OnInit {
  products: IProduct[] = [];
  loading: boolean = true;

  constructor(
    private productReadService: ProductService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.productReadService.load().subscribe(
      (data: IProduct[]) => {
        console.log('Товари завантажено:', data);
        this.products = data;
        this.loading = false;
      },
      (error) => {
        console.error('Помилка при завантаженні товарів:', error);
        this.loading = false;
      }
    );
  }

  handleClick(productId: number) {
    const selectedProduct = this.productReadService.getProductById(productId);
    if (selectedProduct) {
      console.log(`Придбано товар: ${selectedProduct.getName()}`);
      // Тут можеш реалізувати кошик, список покупок тощо
    } else {
      console.error('Товар не знайдено');
    }
  }

  async openAddProductModal() {
    const modal = await this.modalController.create({
      component: ProductCreateComponent,
    });

    await modal.present();

    modal.onWillDismiss().then((res) => {
      const data = res.data;
      if (data) {
        console.log('Новий товар додано:', data);
        this.products.push(data);
      }
    });
  }

  async openEditProductModal(productId: number) {
    const product = this.products.find(p => p.getID() === productId);

    if (!product) {
      console.error('Товар не знайдено для редагування');
      return;
    }

    const modal = await this.modalController.create({
      component: ProductEditComponent,
      componentProps: {
        product: product
      }
    });

    await modal.present();

    const { data: updatedProduct } = await modal.onWillDismiss();

    if (updatedProduct) {
      const index = this.products.findIndex(p => p.getID() === updatedProduct.id);
      if (index !== -1) {
        this.products[index] = updatedProduct;
        console.log('Товар оновлено:', updatedProduct);
      }
    }
  }

}
