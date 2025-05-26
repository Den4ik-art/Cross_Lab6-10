import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';
import { ProductTypes, ProductType } from '../classes/class/ProductType';

describe('ConfigService', () => {
    let service: ConfigService;

    const DEFAULT_TYPE: ProductType = ProductTypes[0];
    const ANOTHER_TYPE: ProductType = ProductTypes[1];

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ConfigService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should initialize with default type', () => {
        expect(service.currentType).toEqual(DEFAULT_TYPE);
        expect(service.type$.value).toEqual(DEFAULT_TYPE);
    });

    it('should update currentType and emit new value on setType()', () => {
        service.setType(ANOTHER_TYPE);

        expect(service.currentType).toEqual(ANOTHER_TYPE);
        expect(service.type$.value).toEqual(ANOTHER_TYPE);
    });

    it('should emit new value via type$ observable', (done) => {
        const expected = ANOTHER_TYPE;

        service.type$.subscribe(value => {
        if (value === expected) {
            expect(value).toBe(expected);
            done();
        }
        });

        service.setType(expected);
    });
});
