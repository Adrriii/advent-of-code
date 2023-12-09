import fs from 'fs';

const readlines = (fileName) => fs.readFileSync(fileName, 'utf8').split('\n').filter((l) => !!l);

const lines = readlines('input.txt');

const get_distance_for_press = (press, left) => {
	return (press * left);
}

const part1 = () => {
	const races = lines[0].split(':')[1].split(' ').filter((l) => !!l).map(t => [t]);
	lines[1].split(':')[1].split(' ').filter((l) => !!l).forEach((d, i) => races[i].push(d));

	let ways = [];
	for(let race of races) {
		let total = 0;
		for(let i = 1; i < race[0]; i++) {
			if(get_distance_for_press(i, race[0] - i) > race[1]) {
				total++;
			}
		}
		ways.push(total);
	}

	return ways.reduce((m,v) => m*v, 1);
}

const part2 = () => {
	const race = [parseInt(lines[0].split(':')[1].split('').filter((l) => l !== ' ').join(''))];
	race.push(parseInt(lines[1].split(':')[1].split('').filter((l) => l !== ' ').join('')));

	console.log(race);
	let total = 0;
	for(let i = 1; i < race[0]; i++) {
		if(get_distance_for_press(i, race[0] - i) > race[1]) {
			total++;
		}
	}

	return total;
}

console.log(part1());
console.log(part2());