import { Product } from './Product';

export class Accessory extends Product {
    private accessoryType: string;

    constructor(id: number, name: string, price: number, accessoryType: string) {
        super(id, name, price);
        if (!accessoryType) throw new Error('Accessory type is required');
        this.accessoryType = accessoryType;
    }

    getDetails(): string[] {
        return [`Type: ${this.accessoryType}`];
    }

    getType(): string {
        return 'Accessory';
    }
}
