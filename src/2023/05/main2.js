import fs from 'fs';
import { performance } from 'perf_hooks';

const readlines = (fileName) => fs.readFileSync(fileName, 'utf8').split('\n').filter((l) => !!l);

const lines = readlines('input.txt');

const transition_rev = (final, source, destination) => {
	const transitions = maps[destination][source];

	for(let transition of transitions) {
		let final_start = transition.destination;
		let final_end = final_start + transition.length;
		if(final >= final_start && final < final_end) {
			const pos = final - final_start;
			return transition.source + pos;
		}
	}

	return final;
}

const seed_from_position = (position) => {
	let prev;
	for(let step of [...steps].reverse()) {
		prev = position;
		position = transition_rev(position, step[0], step[1]);
		// console.log(prev, '->', position, ' | ', step[0], '->', step[1]);
	}
	return position;
}

const seed_in_initial = (seed) => {
	for(let range of seed_ranges) {
		if(seed >= range[0] && seed < range[0] + range[1]) {
			return true;
		}
	}
	return false;
}

const add_maps = () => {
	let current_end = '';
	let current_start = '';
	for(let line of lines) {
		const parts = line.split(' ');
		if(parts[parts.length-1] === 'map:') {
			const label = parts[0];
			const dirs = label.split('-');
			current_start = dirs[0];
			current_end = dirs[2];
			steps.push([current_start, current_end]);
		} else {
			if(current_end && current_start) {
				if(!maps[current_end]) {
					maps[current_end] = {}
				}
				if(!maps[current_end][current_start]) {
					maps[current_end][current_start] = [];
				}
				const parts = line.split(' ');
				maps[current_end][current_start].push({
					destination: parseInt(parts[0]),
					source: parseInt(parts[1]),
					length: parseInt(parts[2])
				});
			}
		}
	}
}
//4403041
const part2 = () => {
	add_maps();

	let lower = 1;
	let upper = 1;
	let step = 1;
	while(true) {
		let i = lower + (upper-lower)/2;
		let seed = seed_from_position(i);
		if(seed_in_initial(seed)) {
			if(step === 1) {
				return i;
			}
			step /= 2;
			upper -= step;
		} else {
			step *= 2;
			upper += step;
		}
	}
}

let perf = performance.now();

const maps = {};
const steps = [];

const seeds = lines[0].split(':')[1].trim().split(' ');
const seed_ranges = [];
let add = false;
for(let seed of seeds) {
	if(add) {
		seed_ranges[seed_ranges.length-1].push(parseInt(seed));
	} else {
		seed_ranges.push([parseInt(seed)]);
	}
	add = !add;
}
console.log(part2());
console.log(performance.now() - perf, 'ms');