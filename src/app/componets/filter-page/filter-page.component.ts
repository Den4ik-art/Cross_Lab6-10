import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  Subject,
  Subscription
} from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from 'src/app/services/config.service';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/classes/interface/IProduct';
import { ProductTypes, ProductType } from 'src/app/classes/class/ProductType';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class FilterPageComponent implements OnInit, OnDestroy {
  @Output() filtered = new EventEmitter<IProduct[]>();

  readonly allTypes: readonly ProductType[] = ProductTypes;
  selectedTypes: Record<ProductType, boolean> = {} as Record<ProductType, boolean>;
  maxPrice: number | null = null;
  keyword: string = '';

  private allProducts$ = new BehaviorSubject<IProduct[]>([]);
  private filterChange$ = new Subject<void>();
  private subscriptions = new Subscription();

  constructor(
    private configService: ConfigService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productSub = this.productService.load().subscribe(products => {
      this.allProducts$.next(products);
    });

    const filterSub = combineLatest([
      this.allProducts$,
      this.filterChange$
    ])
      .pipe(
        map(([products]) => this.filterProducts(products))
      )
      .subscribe(filtered => {
        this.filtered.emit(filtered);
      });

    this.subscriptions.add(productSub);
    this.subscriptions.add(filterSub);
  }

  triggerFilter(): void {
    this.filterChange$.next();
  }

  private filterProducts(products: IProduct[]): IProduct[] {
    let filtered = [...products];

    const activeTypes = Object.entries(this.selectedTypes)
      .filter(([_, selected]) => selected)
      .map(([type]) => type);

    if (activeTypes.length > 0) {
      filtered = filtered.filter(product =>
        activeTypes.includes(product.getType())
      );
    }

    if (this.maxPrice && this.maxPrice > 0) {
      filtered = filtered.filter(product =>
        product.getPrice() <= this.maxPrice!
      );
    }

    const kw = this.keyword.trim().toLowerCase();
    if (kw) {
      filtered = filtered.filter(product =>
        product.getName().toLowerCase().includes(kw) ||
        product.getDetails().some(detail =>
          detail.toLowerCase().includes(kw)
        )
      );
    }

    return filtered;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
