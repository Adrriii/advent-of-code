


const _rawDigits = ['1','2','3','4','5','6','7','8','9'] as const;
const _spelledDigits = ['one','two','three','four','five','six','seven','eight','nine'] as const;
const _digits = [..._rawDigits, ..._spelledDigits] as const;

export type RawDigit 		= typeof _rawDigits[number];
export type SpelledDigit 	= typeof _spelledDigits[number];
export type Digit 			= typeof _digits[number];

export type RawDigitValue 		= {[key in RawDigit]: number};
export type SpelledDigitValue 	= {[key in SpelledDigit]: number};
export type DigitValue 			= {[key in Digit]: number};

export const rawDigitsValues: RawDigitValue 			= _rawDigits.reduce((m,d) => {m[`${d}`] = parseInt(d); return m;}, {}) as RawDigitValue;
export const spelledDigitsValues: SpelledDigitValue 	= _spelledDigits.reduce((m,d,i) => {m[d] = i+1; return m;}, {}) as SpelledDigitValue;
export const digitValues: DigitValue 					= {...rawDigitsValues, ...spelledDigitsValues};

export const rawDigits: RawDigit[] = Object.keys(rawDigitsValues) as RawDigit[];
export const spelledDigits: SpelledDigit[] = Object.keys(spelledDigitsValues) as SpelledDigit[];
export const digits: Digit[] = Object.keys(digitValues) as Digit[];