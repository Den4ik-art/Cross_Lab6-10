import { Product } from './Product';

export class Outerwear extends Product {
    private size: string;
    private material: string;

    constructor(id: number, name: string, price: number, size: string, material: string) {
        super(id, name, price);
        if (!size || !material) throw new Error('Size and material are required for Outerwear');
        this.size = size;
        this.material = material;
    }

    getDetails(): string[] {
        return [`Size: ${this.size}`, `Material: ${this.material}`];
    }

    getType(): string {
        return 'Outerwear';
    }
}
