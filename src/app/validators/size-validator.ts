import { AbstractControl, ValidationErrors } from '@angular/forms';

export function sizeValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) return { invalidSize: true };

    const productType = control.parent?.get('type')?.value;

    if (productType === 'Shoes') {
        const numericValue = +value;
        if (isNaN(numericValue) || numericValue < 20 || numericValue > 50) {
        return { invalidSize: true };
        }
    }

    // Для інших типів перевіряємо просто на наявність
    if ((productType === 'Outerwear' || productType === 'Sportswear') && !value.trim()) {
        return { invalidSize: true };
    }

    return null;
}
