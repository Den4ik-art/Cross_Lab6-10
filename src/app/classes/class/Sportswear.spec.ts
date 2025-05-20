import { Sportswear } from './Sportswear';

describe('Sportswear', () => {
    it('should create a Sportswear product with valid properties', () => {
        const sportswear = new Sportswear(1, 'Training Suit', 59.99, 'L', 'Running');

        expect(sportswear.getID()).toBe(1);
        expect(sportswear.getName()).toBe('Training Suit');
        expect(sportswear.getPrice()).toBe(59.99);
        expect(sportswear.getType()).toBe('Sportswear');
        expect(sportswear.getDetails()).toEqual(['Size: L', 'Sport type: Running']);
    });

    it('should throw an error if size is missing', () => {
        expect(() => {
        new Sportswear(2, 'Gym Shorts', 29.99, '', 'Fitness');
        }).toThrowError('Size and sport type are required');
    });

    it('should throw an error if sport type is missing', () => {
        expect(() => {
        new Sportswear(3, 'Gym Shorts', 29.99, 'M', '');
        }).toThrowError('Size and sport type are required');
    });
});
