import { Injectable } from '@angular/core';
import { IProduct } from 'src/app/classes/interface/IProduct';
import { ProductFactory } from 'src/app/classes/class/ProductFactory';
import { ProductTypes, ProductType } from 'src/app/classes/class/ProductType';
import { Observable } from 'rxjs';

const API_URL = 'https://api.jsonbin.io/v3/b/682b70bf8561e97a50177312';
const API_KEY_MASTER = '$2a$10$kD/DtCDRyGQgkUMXU7iPGu5SzVgrGjaji.Jly910pNinh1OMEAzNq';
const API_KEY_ACCESS = '$2a$10$Y0dd2vcv2Kc/GaluyxQejOi/o5HxMFHgUfgtZOO/2rYZEkTfskJ4a';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private products: IProduct[] = [];

    constructor() {}

    // Завантаження всіх товарів з API (з кешем)
    public load(): Observable<IProduct[]> {
        return new Observable((observer) => {
        if (this.products.length > 0) {
            observer.next([...this.products]);
            observer.complete();
            return;
        }

        fetch(API_URL + '/latest', {
            method: 'GET',
            headers: {
            'X-Master-Key': API_KEY_MASTER,
            'X-Access-Key': API_KEY_ACCESS,
            'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
            const items = data.record || data;

            const productTypeMap: { [key: string]: ProductType } = {
                'Верхній одяг': 'Outerwear',
                'Взуття': 'Shoes',
                'Аксесуари': 'Accessory',
                'Спортивний одяг': 'Sportswear',
            };

            const products = items.map((item: any) => {
                try {
                const productType = productTypeMap[item.type] || item.type;

                if (!ProductTypes.includes(productType)) {
                    throw new Error(`Invalid product type: ${item.type}`);
                }

                const formData = {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    type: productType,
                    size: item.size,
                    material: item.material,
                    color: item.color,
                    accessoryType: item.accessoryType,
                    sportType: item.sportType,
                };

                return ProductFactory.createProduct(formData);
                } catch (error) {
                console.error('Error creating product:', error);
                return null;
                }
            });

            this.products = products.filter((p: IProduct | null): p is IProduct => p !== null);
            observer.next([...this.products]);
            observer.complete();
            })
            .catch((error) => {
            console.error('Error loading products:', error);
            observer.error(error);
            });
        });
    }

    // Отримати всі продукти
    getAllProducts(): IProduct[] {
        return [...this.products];
    }

    // Отримати один продукт
    getProductById(id: number): IProduct | undefined {
        return this.products.find((p) => p.getID() === id);
    }

    // Додати продукт
    addProduct(product: IProduct): Observable<IProduct> {
        return new Observable((observer) => {
        this.products.push(product);
        this.saveAllProducts()
            .then(() => {
            observer.next(product);
            observer.complete();
            })
            .catch((error) => observer.error(error));
        });
    }

    // Оновити продукт
    updateProduct(updatedProduct: IProduct): Observable<IProduct> {
        return new Observable((observer) => {
        const index = this.products.findIndex((p) => p.getID() === updatedProduct.getID());
        if (index !== -1) {
            this.products[index] = updatedProduct;
        }

        this.saveAllProducts()
            .then(() => {
            observer.next(updatedProduct);
            observer.complete();
            })
            .catch((error) => observer.error(error));
        });
    }

    // Видалити продукт
    removeProduct(id: number): Observable<void> {
        return new Observable((observer) => {
        this.products = this.products.filter((p) => p.getID() !== id);

        this.saveAllProducts()
            .then(() => {
            observer.next();
            observer.complete();
            })
            .catch((error) => observer.error(error));
        });
    }

    // Очищення локального кешу
    clear(): void {
        this.products = [];
    }

    // Приватний метод: зберігає весь масив у jsonbin
    private saveAllProducts(): Promise<void> {
        const plainProducts = this.products.map((p) => ProductFactory.toPlainObject(p));

        return fetch(API_URL + '?meta=false', {
        method: 'PUT',
        headers: {
            'X-Master-Key': API_KEY_MASTER,
            'X-Access-Key': API_KEY_ACCESS,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(plainProducts),
        }).then((response) => {
        if (!response.ok) {
            throw new Error('Failed to save products');
        }
        });
    }
}
