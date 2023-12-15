import fs from 'fs';

const readlines = (fileName) => fs.readFileSync(fileName, 'utf8').split('\n');

let lines = readlines('input.txt');

const flip = (base_lines) => {
	let lines = [];

	for(let c of base_lines[0]) {
		lines.push('');
	}
	for(let line of base_lines) {
		let x = base_lines.length - 1;
		for(let c of line) {
			lines[x] = lines[x] + c;
			x--;
		}
	}

	return lines;
}

const rflip = (base_lines) => {
	let lines = [];

	for(let c of base_lines[0]) {
		lines.push('');
	}
	for(let line of base_lines) {
		let x = 0;
		for(let c of line) {
			lines[x] = c + lines[x];
			x++;
		}
	}

	return lines;
}

const roll = (line) => {
	let parts = line.split('#');
	let rolled = parts.map((p) => {
		let t = p.length;
		let c = p.split('O').length - 1;

		return 'O'.repeat(c) + '.'.repeat(t-c);
	});

	return rolled.join('#');
}

const count_weights = (lines) => {
	let total = 0;
	let w = lines.length;
	for(let line of lines) {
		total += (line.split('O').length - 1) * w;
		console.log(line, total);
		w--;
	}
	return total;
}

const cycle = (north_left) => {
	let rolled = north_left.map((l) => roll(l));
	const west_left = rflip(rolled);

	rolled = west_left.map((l) => roll(l));
	const south_left = rflip(rolled);

	rolled = south_left.map((l) => roll(l));
	const east_left = rflip(rolled);

	rolled = east_left.map((l) => roll(l));
	north_left = rflip(rolled);

	return north_left;
}

const hashmap = (lines) => {
	return lines.join('|');
}

const part1 = () => {
	const north_left = flip(lines);
	const rolled = north_left.map((l) => roll(l));
	const north_up = rflip(rolled);
	const total = count_weights(north_up);
	return total;
}
const part2 = () => {
	let north_left = flip(lines);
	let map = {};
	let v = count_weights(rflip(north_left));
	let c;
	let i = 0;
	for(; i < 1000000; i++) {
		let h = hashmap(north_left);
		if(map[h]) {
			[north_left, c] = map[h];
			continue;
		}
		north_left = cycle(north_left);
		c = count_weights(rflip(north_left));
		map[h] = [north_left, c];
		console.log(i,v,c);
		v = c;
	}
	return c;
}

console.time('Part 1');
console.log(part1());
console.timeEnd('Part 1');
console.time('Part 2');
console.log(part2());
console.timeEnd('Part 2');