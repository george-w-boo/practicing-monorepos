import { BaseConverter } from './base-converter';

let converter: BaseConverter;

beforeAll(() => {
  converter = new BaseConverter();
});

describe('convertFromBaseNToDecimal()', () => {
  describe('base is less than or equal to 10', () => {
    it('converts to decimal', () => {
      expect(converter.convertFromBaseNToDecimal('1101', 2)).toEqual(13);
      expect(converter.convertFromBaseNToDecimal('11011', 2)).toEqual(27);
      expect(converter.convertFromBaseNToDecimal('1210', 3)).toEqual(48);
    });
  });

  describe('base is greater than 10', () => {
    it('converts to decimal', () => {
      expect(converter.convertFromBaseNToDecimal('1A1', 11)).toEqual(232);
      expect(converter.convertFromBaseNToDecimal('1B1', 14)).toEqual(351);
      expect(converter.convertFromBaseNToDecimal('ABC', 16)).toEqual(2748);
    });
  });

  describe('number in base N with an integer and decimal part', () => {
    it('converts to a decimal number', () => {
      expect(converter.convertFromBaseNToDecimal('1101.10', 2)).toBeCloseTo(13.5);
      expect(converter.convertFromBaseNToDecimal('1234.12', 8)).toBeCloseTo(668.15625);
    });
  });

  describe('invalid number in base N', () => {
    it('throws error indicating the number is not a string', () => {
      //@ts-ignore
      expect(() => converter.convertFromBaseNToDecimal(1010, 2)).toThrow('Number to convert must be a string');
    });

    it('throws the more-than-one-delimiter error', () => {
      expect(() => converter.convertFromBaseNToDecimal('1101.10.11', 2)).toThrow(
        'Number contains more than one delimiter',
      );
    });

    it('throws the number-is-invalid error', () => {
      expect(() => converter.convertFromBaseNToDecimal('123', 3)).toThrow('Invalid number');
      expect(() => converter.convertFromBaseNToDecimal('12@', 3)).toThrow('Invalid number');
    });

    it('throws the baseForm-must-be-a-number error', () => {
      //@ts-ignore
      expect(() => converter.convertFromBaseNToDecimal('123', '5')).toThrow('Base from needs to be a number');
    });
  });
});

describe('convertFromDecimalToBaseN()', () => {
  test('converts to base N', () => {
    expect(converter.convertDecimalToBaseN(13, 2)).toEqual('1101');
    expect(converter.convertDecimalToBaseN(27, 2)).toEqual('11011');
    expect(converter.convertDecimalToBaseN(48, 3)).toEqual('1210');
    expect(converter.convertDecimalToBaseN(232, 11)).toEqual('1A1');
    expect(converter.convertDecimalToBaseN(351, 14)).toEqual('1B1');
    expect(converter.convertDecimalToBaseN(2748, 16)).toEqual('ABC');
  });

  describe('decimal is less than the base', () => {
    it('converts to base N and deletes zeroes from the left', () => {
      expect(converter.convertDecimalToBaseN(10, 16)).toEqual('A');
    });
  });
});
