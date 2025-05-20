import { ProductFactory } from './ProductFactory';
import { Outerwear } from './Outerwear';
import { Shoes } from './Shoes';
import { Accessory } from './Accessory';
import { Sportswear } from './Sportswear';

describe('ProductFactory', () => {
    describe('createProduct', () => {
        it('should create an Outerwear product', () => {
        const formData = {
            id: 1,
            name: 'Winter Jacket',
            price: 200,
            type: 'Outerwear',
            size: 'L',
            material: 'Wool'
        };

        const product = ProductFactory.createProduct(formData);
        expect(product).toBeInstanceOf(Outerwear);
        expect(product.getName()).toBe('Winter Jacket');
        });

        it('should create a Shoes product', () => {
        const formData = {
            id: 2,
            name: 'Sneakers',
            price: 100,
            type: 'Shoes',
            size: '42',
            color: 'Black'
        };

        const product = ProductFactory.createProduct(formData);
        expect(product).toBeInstanceOf(Shoes);
        expect(product.getName()).toBe('Sneakers');
        });

        it('should create an Accessory product', () => {
        const formData = {
            id: 3,
            name: 'Watch',
            price: 300,
            type: 'Accessory',
            accessoryType: 'Wristwatch'
        };

        const product = ProductFactory.createProduct(formData);
        expect(product).toBeInstanceOf(Accessory);
        expect(product.getName()).toBe('Watch');
        });

        it('should create a Sportswear product', () => {
        const formData = {
            id: 4,
            name: 'Track Pants',
            price: 80,
            type: 'Sportswear',
            size: 'M',
            sportType: 'Running'
        };

        const product = ProductFactory.createProduct(formData);
        expect(product).toBeInstanceOf(Sportswear);
        expect(product.getName()).toBe('Track Pants');
        });

        it('should throw error for unknown type', () => {
        const formData = {
            id: 5,
            name: 'Unknown',
            price: 50,
            type: 'SomethingElse'
        };

        expect(() => ProductFactory.createProduct(formData)).toThrowError(
            'Unknown product type: SomethingElse'
        );
        });
    });

    describe('toPlainObject', () => {
        it('should convert Outerwear to plain object', () => {
        const outerwear = new Outerwear(10, 'Coat', 150, 'XL', 'Leather');
        const obj = ProductFactory.toPlainObject(outerwear);

        expect(obj).toEqual({
            id: 10,
            name: 'Coat',
            price: 150,
            type: 'Outerwear',
            size: 'XL',
            material: 'Leather'
        });
        });

        it('should convert Shoes to plain object', () => {
        const shoes = new Shoes(11, 'Boots', 120, 43, 'Brown');
        const obj = ProductFactory.toPlainObject(shoes);

        expect(obj).toEqual({
            id: 11,
            name: 'Boots',
            price: 120,
            type: 'Shoes',
            size: 43,
            color: 'Brown'
        });
        });

        it('should convert Accessory to plain object', () => {
        const accessory = new Accessory(12, 'Bracelet', 90, 'Gold');
        const obj = ProductFactory.toPlainObject(accessory);

        expect(obj).toEqual({
            id: 12,
            name: 'Bracelet',
            price: 90,
            type: 'Accessory',
            accessoryType: 'Gold'
        });
        });

        it('should convert Sportswear to plain object', () => {
        const sportswear = new Sportswear(13, 'Shorts', 60, 'L', 'Basketball');
        const obj = ProductFactory.toPlainObject(sportswear);

        expect(obj).toEqual({
            id: 13,
            name: 'Shorts',
            price: 60,
            type: 'Sportswear',
            size: 'L',
            sportType: 'Basketball'
        });
        });
    });
});
