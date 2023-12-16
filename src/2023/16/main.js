import fs from 'fs';

const readlines = (fileName) => fs.readFileSync(fileName, 'utf8').split('\n');

const lines = readlines('input.txt');

const get_tile = ([x,y]) => {
	if(y < 0 || y >= lines.length) return null;
	if(x < 0 || x >= lines[y].length) return null;
	return lines[y][x];
}

const get_facing = ([x,y]) => {
	if(x === 0) return y === 1 ? 'south' : 'north';
	if(y === 0) return x === 1 ? 'east' : 'west';
}

const facing_axis = {
	'east': 'horiz',
	'west': 'horiz',
	'south': 'vert',
	'north': 'vert',
}

const make_heatmap = () => {
	return [...lines].map((l) => '.'.repeat(l.length));
}

const get_energized = (start, dir) => {
	const hitmap = {};

	const loop_check = (path, jpath, dir) => {
		const p_s = jpath + dir.join(',');
		if(path[p_s]) return true;
		path[p_s] = true;
		return false;
	}

	const step = ([px,py], dir, path = {}) => {
		const [dx,dy] = dir;
		const pos = [px + dx, py + dy];
		const jpath = pos.join(',');

		if(loop_check(path, jpath, dir)) return;

		const tile = get_tile(pos);
		if(!tile) return;

		hitmap[jpath] = true;

		const facing = get_facing(dir);
		switch(tile) {
			case '.':
				return step(pos, dir, path);
			case '|':
				if(facing_axis[facing] === 'horiz')	return step(pos, [0,1], path) + step(pos, [0,-1], path);
				return step(pos, dir, path);
			case '-':
				if(facing_axis[facing] === 'vert') 	return step(pos, [1,0], path) + step(pos, [-1,0], path);
				return step(pos, dir, path);
			case '/':
				if(facing === 'north') 	return step(pos, [1,0], path);
				if(facing === 'west') 	return step(pos, [0,1], path);
				if(facing === 'south') 	return step(pos, [-1,0], path);
				if(facing === 'east') 	return step(pos, [0,-1], path);
			case '\\':
				if(facing === 'north') 	return step(pos, [-1,0], path);
				if(facing === 'west') 	return step(pos, [0,-1], path);
				if(facing === 'south') 	return step(pos, [1,0], path);
				if(facing === 'east') 	return step(pos, [0,1], path);
		}
	};

	step(start, dir);
	return Object.keys(hitmap).length;
}

const part1 = () => get_energized([-1,0], [1,0]);
const part2 = () => {
	let max = 0;
	for(let y = 0; y < lines.length; y++) {
		max = Math.max(max,
			Math.max(
				get_energized([-1,y],[1,0]),
				get_energized([lines[y].length,y],[-1,0])
			)
		)
	}
	for(let x = 0; x < lines[0].length; x++) {
		max = Math.max(max,
			Math.max(
				get_energized([x,-1],[0,1]),
				get_energized([x,lines.length],[0,-1])
			)
		)
	}
	return max;
}

console.time('Part 1');
console.log(part1());
console.timeEnd('Part 1');
console.time('Part 2');
console.log(part2());
console.timeEnd('Part 2');