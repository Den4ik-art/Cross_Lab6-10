import { Product } from './Product';

export class Sportswear extends Product {
    private size: string;
    private sportType: string;

    constructor(id: number, name: string, price: number, size: string, sportType: string) {
        super(id, name, price);
        if (!size || !sportType) throw new Error('Size and sport type are required');
        this.size = size;
        this.sportType = sportType;
    }

    getDetails(): string[] {
        return [`Size: ${this.size}`, `Sport type: ${this.sportType}`];
    }

    getType(): string {
        return 'Sportswear';
    }
}
