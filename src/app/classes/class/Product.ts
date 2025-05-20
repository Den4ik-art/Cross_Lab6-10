import { IProduct } from "../interface/IProduct";

export abstract class Product implements IProduct {
    private id: number;
    private price: number;
    private name: string;

    constructor(id: number, name: string, price: number) {
        if (id < 0) throw new Error('ID < 0');
        if (price < 0) throw new Error('Price < 0');
        this.id = id;
        this.price = price;
        this.name = name;
    }

    getID(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price;
    }

    abstract getDetails(): string[];
    abstract getType(): string;
}
