import { Outerwear } from './Outerwear';

describe('Outerwear class', () => {
    it('should create an Outerwear with valid data', () => {
        const outerwear = new Outerwear(1, 'Winter Jacket', 120, 'L', 'Wool');

        expect(outerwear).toBeInstanceOf(Outerwear);
        expect(outerwear.getID()).toBe(1);
        expect(outerwear.getName()).toBe('Winter Jacket');
        expect(outerwear.getPrice()).toBe(120);
        expect(outerwear.getDetails()).toEqual(['Size: L', 'Material: Wool']);
        expect(outerwear.getType()).toBe('Outerwear');
    });

    it('should throw an error if size is missing', () => {
        expect(() => {
        // @ts-ignore
        new Outerwear(2, 'Raincoat', 80, undefined, 'Polyester');
        }).toThrowError('Size and material are required for Outerwear');
    });

    it('should throw an error if material is missing', () => {
        expect(() => {
        // @ts-ignore
        new Outerwear(3, 'Trench Coat', 150, 'M', undefined);
        }).toThrowError('Size and material are required for Outerwear');
    });

    it('should return correct details string', () => {
        const outerwear = new Outerwear(4, 'Parka', 200, 'XL', 'Down');
        expect(outerwear.getDetails()).toEqual(['Size: XL', 'Material: Down']);
    });

    it('should return type as Outerwear', () => {
        const outerwear = new Outerwear(5, 'Bomber', 90, 'M', 'Cotton');
        expect(outerwear.getType()).toBe('Outerwear');
    });
});
