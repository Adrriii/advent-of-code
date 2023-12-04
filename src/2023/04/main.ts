import 'module-alias/register';
import clock from '@lib/clock';
import { format_day } from '@lib/string';
const day = 4;

import { readlines } from '@lib/readlines';
import { IndexMap, sum, unique_map } from '@lib/maps';

const lines = readlines(`src/2023/${format_day(day)}/input.txt`);

type Card = {
	winning: IndexMap<number,boolean>,
	numbers: IndexMap<number,boolean>,
	number: number
}
const parse_line = (line: string): Card => {
	let infos = line.split(':');
	let id = infos[0].split(' ');
	let card = infos[1];
	let sides = card.split('|');

	return {
		winning: unique_map<number>(sides[0].split(' ').map((s) => parseInt(s)).filter((n) => !Number.isNaN(n))),
		numbers: unique_map<number>(sides[1].split(' ').map((s) => parseInt(s)).filter((n) => !Number.isNaN(n))),
		number: parseInt(id[id.length-1]),
	}
}

const get_won_in_card = (card: Card): number => {
	let won = 0;
	for(let number of Object.keys(card.numbers)) {
		if(!card.winning[number]) continue;
		won++;
	}
	return won;
}

const get_card_value = (card: Card): number => {
	return Math.floor(Math.pow(2,get_won_in_card(card))/2);
}

const part1 = (): number => {
	let total_value = 0;

	for(let line of lines) {
		total_value += get_card_value(parse_line(line));
	}

	return total_value;
};

const part2 = (): number => {
	let cards = lines.map((l) => parse_line(l));
	let map: IndexMap<number, number> = cards.reduce((map, card) => { map[card.number] = 1; return map; }, {});

	const add_won_cards = (card: Card, mult: number): void => {
		let copies_won = get_won_in_card(card);
		for(let i = card.number + 1; i <= card.number + copies_won; i++) {
			map[i] += mult;
		}
	}

	for(let card of cards) {
		add_won_cards(card, map[card.number]);
	}

	return sum(map);
}
clock.start(`Day ${format_day(day)} - Part 1`);
const result_1: number = part1();
clock.endPrint(`Day ${format_day(day)} - Part 1`);

console.log(result_1);

clock.start(`Day ${format_day(day)} - Part 2`);
const result_2: number = part2();
clock.endPrint(`Day ${format_day(day)} - Part 2`);

console.log(result_2);