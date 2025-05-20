import { Product } from './Product';

export class Shoes extends Product {
    private size: number;
    private color: string;

    constructor(id: number, name: string, price: number, size: number, color: string) {
        super(id, name, price);
        if (!size || !color) throw new Error('Size and color are required for Shoes');
        this.size = size;
        this.color = color;
    }

    getDetails(): string[] {
        return [`Size: ${this.size}`, `Color: ${this.color}`];
    }

    getType(): string {
        return 'Shoes';
    }
}
