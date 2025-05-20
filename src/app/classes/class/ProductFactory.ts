import { IProduct } from '../interface/IProduct';
import { Outerwear } from './Outerwear';
import { Shoes } from './Shoes';
import { Accessory } from './Accessory';
import { Sportswear } from './Sportswear';

export class ProductFactory {
    static createProduct(formData: any): IProduct {
        const { id, name, price, type, size, material, color, accessoryType, sportType } = formData;

        switch (type) {
        case 'Outerwear':
            return new Outerwear(id, name, price, size, material);
        case 'Shoes':
            return new Shoes(id, name, price, size, color);
        case 'Accessory':
            return new Accessory(id, name, price, accessoryType);
        case 'Sportswear':
            return new Sportswear(id, name, price, size, sportType);
        default:
            throw new Error(`Unknown product type: ${type}`);
        }
    }

    static toPlainObject(product: IProduct): any {
        const base = {
        id: product.getID(),
        name: product.getName(),
        price: product.getPrice(),
        type: product.getType()
        };

        const details = product as any;

        switch (product.getType()) {
        case 'Outerwear':
            return { ...base, size: details.size, material: details.material };
        case 'Shoes':
            return { ...base, size: details.size, color: details.color };
        case 'Accessory':
            return { ...base, accessoryType: details.accessoryType };
        case 'Sportswear':
            return { ...base, size: details.size, sportType: details.sportType };
        default:
            return base;
        }
    }
}
