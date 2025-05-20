import { FormControl, FormGroup, Validators } from '@angular/forms';
import { requiredTypeFieldValidator } from './required-type-field-validator';

describe('requiredTypeFieldValidator', () => {

    it('should return null if product type is missing', () => {
        const form = new FormGroup({
        type: new FormControl(null),
        material: new FormControl('', [requiredTypeFieldValidator])
        });

        form.get('material')!.updateValueAndValidity();

        expect(form.get('material')!.errors).toBeNull();
    });

    it('should return requiredMaterial error if type is Outerwear and material is empty', () => {
        const form = new FormGroup({
        type: new FormControl('Outerwear'),
        material: new FormControl('', [requiredTypeFieldValidator])
        });

        form.get('material')!.updateValueAndValidity();

        expect(form.get('material')!.errors).toEqual({ requiredMaterial: true });
    });

    it('should return null if type is Outerwear and material is filled', () => {
        const form = new FormGroup({
        type: new FormControl('Outerwear'),
        material: new FormControl('Wool', [requiredTypeFieldValidator])
        });

        form.get('material')!.updateValueAndValidity();

        expect(form.get('material')!.errors).toBeNull();
    });

    it('should return requiredColor error if type is Shoes and color is empty', () => {
        const form = new FormGroup({
        type: new FormControl('Shoes'),
        color: new FormControl('', [requiredTypeFieldValidator])
        });

        form.get('color')!.updateValueAndValidity();

        expect(form.get('color')!.errors).toEqual({ requiredColor: true });
    });

    it('should return requiredAccessoryType error if type is Accessory and accessoryType is empty', () => {
        const form = new FormGroup({
        type: new FormControl('Accessory'),
        accessoryType: new FormControl('', [requiredTypeFieldValidator])
        });

        form.get('accessoryType')!.updateValueAndValidity();

        expect(form.get('accessoryType')!.errors).toEqual({ requiredAccessoryType: true });
    });

    it('should return requiredSportType error if type is Sportswear and sportType is empty', () => {
        const form = new FormGroup({
        type: new FormControl('Sportswear'),
        sportType: new FormControl('', [requiredTypeFieldValidator])
        });

        form.get('sportType')!.updateValueAndValidity();

        expect(form.get('sportType')!.errors).toEqual({ requiredSportType: true });
    });

    it('should return null for unrelated field', () => {
        const form = new FormGroup({
        type: new FormControl('Outerwear'),
        material: new FormControl('', [requiredTypeFieldValidator]),
        color: new FormControl('', [requiredTypeFieldValidator]) // не має бути валідовано
        });

        form.get('color')!.updateValueAndValidity();

        expect(form.get('color')!.errors).toBeNull();
    });

});
