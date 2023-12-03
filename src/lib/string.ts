import { Digit } from "./digits";

/**
 * (1) -> '01'
 */
export const format_day = (number: number): string => number.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});

/**
 * Collect all indices from a pattern inside a string
 * @param string The string inside of which to detect indices
 * @param search The string to search for, or a regular expression (mode: gi)
 */
export const indices_of = (string: string, search: string|RegExp, flags: string = 'gi'): number[] => [...string.matchAll(new RegExp(search, flags))].map(a => a.index);

/**
 * Collect all indices of digits in a string
 * @param string The string inside of which to detect indices
 * @param digits The detectable digits (raw, spelled, subset, all...) @see Digit
 */
export const indices_of_digits_in_string = (string: string, digits: Digit[]): {[key: string]: Digit} => digits.reduce((values, spelled) => {
	for(let index of indices_of(string, spelled)) {
		values[index] = spelled;
	}
	return values;
}, {});