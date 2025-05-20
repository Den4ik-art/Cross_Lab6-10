import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { requiredTypeFieldValidator } from '../validators/required-type-field-validator';
import { sizeValidator } from '../validators/size-validator';

// Перелік типів товарів (можна імпортувати з ProductType.ts при бажанні)
const ProductType = {
    Outerwear: 'Outerwear',
    Shoes: 'Shoes',
    Accessory: 'Accessory',
    Sportswear: 'Sportswear'
};


// Головна функція побудови форми
export function formConstructor(
    type: string,
    productForm: FormGroup,
    fb: FormBuilder,
    nextId: number // <-- передаємо сюди
    ) {
    const controlsToRemove = [
        'size', 'material', 'color', 'accessoryType', 'sportType'
    ];
    controlsToRemove.forEach(control => {
        if (productForm.contains(control)) {
        productForm.removeControl(control);
        }
    });

    productForm.addControl('id', fb.control(nextId, [Validators.required, Validators.min(1)]));
    productForm.addControl('name', fb.control('', [Validators.required]));
    productForm.addControl('price', fb.control('', [Validators.required, Validators.min(0.01)]));
    productForm.addControl('type', fb.control(type, Validators.required));

    if (type === ProductType.Outerwear) {
        productForm.addControl('size', fb.control('', [sizeValidator]));
        productForm.addControl('material', fb.control('', [requiredTypeFieldValidator]));
    } else if (type === ProductType.Shoes) {
        productForm.addControl('size', fb.control('', [sizeValidator]));
        productForm.addControl('color', fb.control('', [requiredTypeFieldValidator]));
    } else if (type === ProductType.Accessory) {
        productForm.addControl('accessoryType', fb.control('', [requiredTypeFieldValidator]));
    } else if (type === ProductType.Sportswear) {
        productForm.addControl('size', fb.control('', [sizeValidator]));
        productForm.addControl('sportType', fb.control('', [requiredTypeFieldValidator]));
    }

    console.log(productForm.value);
    console.log('Form valid:', productForm.valid);
}