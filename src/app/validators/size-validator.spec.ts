import { FormControl, FormGroup } from '@angular/forms';
import { sizeValidator } from './size-validator';

describe('sizeValidator', () => {

    it('should return error if size is missing', () => {
        const form = new FormGroup({
        type: new FormControl('Shoes'),
        size: new FormControl('', [sizeValidator])
        });

        form.get('size')!.updateValueAndValidity();

        expect(form.get('size')!.errors).toEqual({ invalidSize: true });
    });

    it('should return error if size is not a number for Shoes', () => {
        const form = new FormGroup({
        type: new FormControl('Shoes'),
        size: new FormControl('abc', [sizeValidator])
        });

        form.get('size')!.updateValueAndValidity();

        expect(form.get('size')!.errors).toEqual({ invalidSize: true });
    });

    it('should return error if shoe size is below range', () => {
        const form = new FormGroup({
        type: new FormControl('Shoes'),
        size: new FormControl('19', [sizeValidator])
        });

        form.get('size')!.updateValueAndValidity();

        expect(form.get('size')!.errors).toEqual({ invalidSize: true });
    });

    it('should return error if shoe size is above range', () => {
        const form = new FormGroup({
        type: new FormControl('Shoes'),
        size: new FormControl('51', [sizeValidator])
        });

        form.get('size')!.updateValueAndValidity();

        expect(form.get('size')!.errors).toEqual({ invalidSize: true });
    });

    it('should return null if valid shoe size', () => {
        const form = new FormGroup({
        type: new FormControl('Shoes'),
        size: new FormControl('42', [sizeValidator])
        });

        form.get('size')!.updateValueAndValidity();

        expect(form.get('size')!.errors).toBeNull();
    });

    it('should return error if Outerwear size is just spaces', () => {
        const form = new FormGroup({
        type: new FormControl('Outerwear'),
        size: new FormControl('   ', [sizeValidator])
        });

        form.get('size')!.updateValueAndValidity();

        expect(form.get('size')!.errors).toEqual({ invalidSize: true });
    });

    it('should return null if Outerwear size is filled', () => {
        const form = new FormGroup({
        type: new FormControl('Outerwear'),
        size: new FormControl('M', [sizeValidator])
        });

        form.get('size')!.updateValueAndValidity();

        expect(form.get('size')!.errors).toBeNull();
    });

    it('should return null if Sportswear size is filled', () => {
        const form = new FormGroup({
        type: new FormControl('Sportswear'),
        size: new FormControl('L', [sizeValidator])
        });

        form.get('size')!.updateValueAndValidity();

        expect(form.get('size')!.errors).toBeNull();
    });

});
