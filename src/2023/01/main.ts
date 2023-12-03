import 'module-alias/register';
import clock from '@lib/clock';
import { format_day, indices_of_digits_in_string } from '@lib/string';
const day = 1;

import { readlines } from '@lib/readlines';
import { Digit, digitValues, digits, rawDigits } from '@lib/digits';

const lines = readlines(`src/2023/${format_day(day)}/input.txt`);

/**
 * Create a 2-digit number from the first and the last digit of a string, with a given set of allowed digits @see Digit
 */
export const make_number_from_first_and_last = (string: string, spelled: Digit[]): number => {
	let index_value = indices_of_digits_in_string(string, spelled);
	let indices = Object.keys(index_value);
	let result = parseInt(`${digitValues[index_value[indices[0]]]}${digitValues[index_value[indices[indices.length-1]]]}`);
	return result;
}

// Use only raw digits [0-9]
clock.start(`Day ${format_day(day)} - Part 1`);
const result_1: number = lines.reduce((total, line) =>  total + make_number_from_first_and_last(line, rawDigits), 0);
clock.endPrint(`Day ${format_day(day)} - Part 1`);

console.log(result_1);

// Use all digits [0-9] | spelled
clock.start(`Day ${format_day(day)} - Part 2`);
const result_2: number = lines.reduce((total, line) =>  total + make_number_from_first_and_last(line, digits), 0);
clock.endPrint(`Day ${format_day(day)} - Part 2`);

console.log(result_2);