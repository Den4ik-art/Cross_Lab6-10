import { Accessory } from './Accessory';

describe('Accessory class', () => {
    it('should create an Accessory with valid data', () => {
        const accessory = new Accessory(1, 'Hat', 25, 'Headwear');

        expect(accessory).toBeInstanceOf(Accessory);
        expect(accessory.getID()).toBe(1);
        expect(accessory.getName()).toBe('Hat');
        expect(accessory.getPrice()).toBe(25);
        expect(accessory.getDetails()).toEqual(['Type: Headwear']);
        expect(accessory.getType()).toBe('Accessory');
    });

    it('should throw an error if accessoryType is missing', () => {
        expect(() => {
        // @ts-ignore: Testing constructor error with missing parameter
        new Accessory(2, 'Belt', 15);
        }).toThrowError('Accessory type is required');
    });

    it('should return correct details string', () => {
        const accessory = new Accessory(3, 'Sunglasses', 50, 'Eyewear');
        expect(accessory.getDetails()).toEqual(['Type: Eyewear']);
    });

    it('should return type as Accessory', () => {
        const accessory = new Accessory(4, 'Bracelet', 40, 'Jewelry');
        expect(accessory.getType()).toBe('Accessory');
    });
});
