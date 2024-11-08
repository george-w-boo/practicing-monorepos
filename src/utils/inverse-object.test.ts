import { inverseObject } from './inverse-object';

describe('given an object', () => {
  it('reverses the keys with the values', () => {
    expect(inverseObject({ A: 10, B: 11, C: 12 })).toEqual({ 10: 'A', 11: 'B', 12: 'C' });
  });
});
