import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { IProduct } from 'src/app/classes/interface/IProduct';
import { Outerwear } from 'src/app/classes/class/Outerwear';

describe('ProductService', () => {
    let service: ProductService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ProductService);
        service.clear(); // Очищення перед кожним тестом
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should add a product and retrieve it', (done) => {
        const product: IProduct = new Outerwear(1, 'Coat', 120, 'M', 'Wool');

        spyOn(window, 'fetch').and.returnValue(Promise.resolve(new Response(null, { status: 200 })));

        service.addProduct(product).subscribe((result) => {
        expect(result).toBe(product);
        const fetched = service.getProductById(1);
        expect(fetched?.getName()).toBe('Coat');
        done();
        });
    });

    it('should update a product', (done) => {
        const product = new Outerwear(2, 'Jacket', 100, 'L', 'Cotton');
        service['products'].push(product);

        const updated = new Outerwear(2, 'Winter Jacket', 150, 'L', 'Wool');

        spyOn(window, 'fetch').and.returnValue(Promise.resolve(new Response(null, { status: 200 })));

        service.updateProduct(updated).subscribe((res) => {
        expect(res.getName()).toBe('Winter Jacket');
        expect(service.getProductById(2)?.getPrice()).toBe(150);
        done();
        });
    });

    it('should remove a product', (done) => {
        const product = new Outerwear(3, 'Parka', 180, 'XL', 'Polyester');
        service['products'].push(product);

        spyOn(window, 'fetch').and.returnValue(Promise.resolve(new Response(null, { status: 200 })));

        service.removeProduct(3).subscribe(() => {
        expect(service.getProductById(3)).toBeUndefined();
        done();
        });
    });

    it('should clear the cache', () => {
        service['products'].push(new Outerwear(4, 'Coat', 200, 'L', 'Wool'));
        service.clear();
        expect(service.getAllProducts().length).toBe(0);
    });
});
