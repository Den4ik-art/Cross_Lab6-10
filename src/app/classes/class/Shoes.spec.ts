import { Shoes } from './Shoes';

describe('Shoes', () => {
    it('should create a Shoes product with valid properties', () => {
        const shoes = new Shoes(1, 'Running Shoes', 99.99, 42, 'Black');

        expect(shoes.getID()).toBe(1);
        expect(shoes.getName()).toBe('Running Shoes');
        expect(shoes.getPrice()).toBe(99.99);
        expect(shoes.getType()).toBe('Shoes');
        expect(shoes.getDetails()).toEqual(['Size: 42', 'Color: Black']);
    });

    it('should throw an error if size is missing', () => {
        expect(() => {
        new Shoes(2, 'Boots', 89.99, 0 as any, 'Brown');
        }).toThrowError('Size and color are required for Shoes');
    });

    it('should throw an error if color is missing', () => {
        expect(() => {
        new Shoes(3, 'Boots', 89.99, 42, '');
        }).toThrowError('Size and color are required for Shoes');
    });
});
