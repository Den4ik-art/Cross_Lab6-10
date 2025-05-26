import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { FilterPageComponent } from '../componets/filter-page/filter-page.component';
import { ConfigService } from '../services/config.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

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
    CommonModule,
    FilterPageComponent,
    FormsModule
  ]
})
export class HomePage implements OnInit, OnDestroy {
  products: IProduct[] = [];
  loading: boolean = true;
  filteredProducts: IProduct[] = [];
  filtered: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private productReadService: ProductService,
    private configService: ConfigService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.products = this.productReadService.getProductsByType(this.configService.currentType);
    this.filteredProducts = this.products;

    const sub = this.configService.type$.subscribe(type => {
      this.products = this.productReadService.getProductsByType(type);
    });
    this.subscriptions.push(sub);

    const loadSub = this.productReadService.load().subscribe(
      (data: IProduct[]) => {
        console.log('Товари завантажено:', data);
        this.products = this.productReadService.getProductsByType(this.configService.currentType);
        this.loading = false;
      },
      (error) => {
        console.error('Помилка при завантаженні товарів:', error);
        this.loading = false;
      }
    );
    this.subscriptions.push(loadSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  handleClick(productId: number) {
    const selectedProduct = this.productReadService.getProductById(productId);
    if (selectedProduct) {
      console.log(`Придбано товар: ${selectedProduct.getName()}`);
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
        this.productReadService.addProduct(data);
        this.products = this.productReadService.getProductsByType(this.configService.currentType);
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
        this.productReadService.updateProduct(updatedProduct);
        this.products = this.productReadService.getProductsByType(this.configService.currentType);
        console.log('Товар оновлено:', updatedProduct);
      }
    }
  }

  onFilterProducts(filtered: IProduct[]) {
    this.filtered = true;
    this.filteredProducts = filtered;
    console.log('Фільтровані товари:', this.filteredProducts);
  }

  get visibleProducts(): IProduct[] {
    return this.filtered ? this.filteredProducts : this.products;
  }
}
