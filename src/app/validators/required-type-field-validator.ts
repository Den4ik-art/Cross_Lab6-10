import { AbstractControl, ValidationErrors } from '@angular/forms';

export function requiredTypeFieldValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const productType = control.parent?.get('type')?.value;

    if (!productType) return null; // Не знаємо тип — не валідовуємо

    switch (productType) {
        case 'Outerwear':
        if (control.parent?.get('material') === control && !value?.trim()) {
            return { requiredMaterial: true };
        }
        break;

        case 'Shoes':
        if (control.parent?.get('color') === control && !value?.trim()) {
            return { requiredColor: true };
        }
        break;

        case 'Accessory':
        if (control.parent?.get('accessoryType') === control && !value?.trim()) {
            return { requiredAccessoryType: true };
        }
        break;

        case 'Sportswear':
        if (control.parent?.get('sportType') === control && !value?.trim()) {
            return { requiredSportType: true };
        }
        break;
    }

    return null;
}