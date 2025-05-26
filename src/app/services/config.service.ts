import { Injectable } from '@angular/core';
import { ProductType, ProductTypes } from '../classes/class/ProductType';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    currentType = DEFAULT_TYPE;

    type$: BehaviorSubject<ProductType> = new BehaviorSubject<ProductType>(
        DEFAULT_TYPE
    );

    setType(type: ProductType) {
        console.log('€ змінн!!!!');
        this.type$.next(type);
        this.currentType = type;
    }

    constructor() {}
}

const DEFAULT_TYPE = ProductTypes[0];