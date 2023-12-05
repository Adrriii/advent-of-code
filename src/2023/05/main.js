import fs from 'fs';

const readlines = (fileName) => fs.readFileSync(fileName, 'utf8').split('\n').filter((l) => !!l);

const lines = readlines('input.txt');

const maps = {};
const steps = [];

const transition = (seed, source, destination) => {
	const transitions = maps[destination][source];

	for(let transition of transitions) {
		let source_start = transition.source;
		let source_end = source_start + transition.length;
		if(seed >= source_start && seed < source_end) {
			const pos = seed - source_start;
			return transition.destination + pos;
		}
	}

	return seed;
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

const part1 = () => {
	let total = 0;

	const seeds = lines[0].split(':')[1].trim().split(' ');
	add_maps();

	console.log(seeds);
	let min_pos;
	for(let seed of seeds) {
		let position = seed;
		for(let step of steps) {
			console.log(position,step[0], step[1])
			position = transition(position, step[0], step[1]);
		}

		if(!min_pos || min_pos > position) {
			min_pos = position;
		}
		console.log(seed,position);
	}

	return min_pos;
}

console.log(part1());