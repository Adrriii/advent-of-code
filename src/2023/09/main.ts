import 'module-alias/register';
import clock from '@lib/clock';
import { format_day } from '@lib/string';
const day = 9;

import { readlines } from '@lib/readlines';
import { IndexMap, count_map, is_all_n, sum, unique_map } from '@lib/maps';

const lines = readlines(`src/2023/${format_day(day)}/input.txt`);

const parse_line = (line: string): number[] => {
	return line.split(' ').map((c: string) => parseInt(c));
}

const get_next_diff = (numbers: number[]): number[] => {
	return numbers.reduce((nexts, curr, i, a) => {
		if(i === 0) return [];
		nexts.push(curr - a[i-1]);
		return nexts;
	}, []);
}

const extrapolate_diff = (above: number[], diff: number[]): number[] => {
	const last = diff[diff.length - 1];
	const last_above = above[above.length - 1];
	diff.push(last + last_above);
	return diff;
}

const get_diffs = (numbers: number[]): number[] []=> {
	let diffs = [numbers];
	let current = numbers;
	while(!is_all_n(current, 0)) {
		current = get_next_diff(current);
		diffs.push(current);
	}
	return diffs;
}

const get_extrapolated = (numbers: number[]): number => {
	const diffs = get_diffs(numbers).reverse();

	diffs[0].push(0);
	for(let i = 1; i < diffs.length; i++) {
		diffs[i] = extrapolate_diff(diffs[i-1], diffs[i]);
	}
	let i = diffs.length - 1;
	return diffs[i][diffs[i].length - 1];
}

const part1 = (): number => {
	let total = 0;
	for(let line of lines) {
		total += get_extrapolated(parse_line(line));
	}
	return total;
};

const part2 = (): number => {
	let total = 0;
	for(let line of lines) {
		total += get_extrapolated(parse_line(line).reverse());
	}
	return total;
}

clock.start(`Day ${format_day(day)} - Part 1`);
const result_1: number = part1();
clock.endPrint(`Day ${format_day(day)} - Part 1`);

console.log(result_1);

clock.start(`Day ${format_day(day)} - Part 2`);
const result_2: number = part2();
clock.endPrint(`Day ${format_day(day)} - Part 2`);

console.log(result_2);