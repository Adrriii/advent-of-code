import fs from 'fs';

const readlines = (fileName) => fs.readFileSync(fileName, 'utf8').split('\n');

let lines = readlines('input.txt');

const boxes = {};

const HASH_step = (current, c) => {
	const asc = c.charCodeAt(0);
	current += asc;
	current *= 17;
	current = current % 256;
	return current;
}

const HASH = (str) => {
	let current = 0;
	for(let c of str) {
		current = HASH_step(current, c);
	}
	return current;
}

const decode_instr = (instr) => {
	const dash = instr.includes('-');
	let [label, goal] = instr.split(dash ? '-' : '=');
	goal = parseInt(goal);
	const box = HASH(label);

	if(!boxes[box]) {
		boxes[box] = [];
	}

	if(dash) {
		boxes[box] = boxes[box].filter((lib) => lib[0] !== label);
	} else {
		const already = boxes[box].find((lib) => lib[0] === label);
		if(already) {
			boxes[box].map((lib, i) => {
				if(lib[0] === label) boxes[box][i][1] = goal;
			});
		} else {
			boxes[box].push([label, goal]);
		}
	}
}

const lenses_power = (box_number, lenses) => {
	const base = 1 + box_number;
	let total = 0;
	let index = 1;
	for(let lens of lenses) {
		total += base * index * lens[1];
		index++;
	}
	console.log(total, lenses);
	return total;
}

const part1 = () => {
	const parts = lines[0].split(',');
	let total = 0;
	for(let part of parts) {
		total += HASH(part);
	}
	return total;
}
const part2 = () => {
	const parts = lines[0].split(',');
	for(let part of parts) {
		decode_instr(part);
	}
	console.log(boxes);
	const total = Object.entries(boxes).reduce((t,b_info) => t + lenses_power(parseInt(b_info[0]), b_info[1]), 0);
	return total;
}

console.time('Part 1');
console.log(part1());
console.timeEnd('Part 1');
console.time('Part 2');
console.log(part2());
console.timeEnd('Part 2');