import fs from 'fs';

const readlines = (fileName) => fs.readFileSync(fileName, 'utf8').split('\n').filter((l) => !!l);

const pipes = {
	'|': [[0,-1],[0,1]],
	'-': [[-1,0],[1,0]],
	'L': [[0,-1],[1,0]],
	'J': [[0,-1],[-1,0]],
	'7': [[-1,0],[0,1]],
	'F': [[1,0],[0,1]],
};

const valid_tile = Object.keys(pipes).reduce((m,v) => { m[v] = true; return m;}, {});

let lines = readlines('input.txt');
let lines_copy = [...lines];

const str_replaceAt = function(str, index, replacement) {
    return str.substring(0, index) + replacement + str.substring(index + replacement.length);
}

const search_around_pos = [
	[0,-1],
	[0,1],
	[-1,0],
	[1,0],
];

const corner_change = {
	'L': {
		'J': false,
		'7': true,
	},
	'F': {
		'J': true,
		'7': false,
	},
}

const get_char = (pos) => {
	return lines[pos[1]][pos[0]];
}

const add_pos = (pos1, pos2) => {
	return [pos1[0]+pos2[0], pos1[1]+pos2[1]]
}

const is_same_pos = (pos1, pos2) => {
	return pos1[0] === pos2[0] && pos1[1] === pos2[1];
}

const find_pos = (symbol) => {
	let pos = [0,0];
	for(const line of lines) {
		pos[0] = 0;
		for(const char of line) {
			if(char === symbol) {
				return pos;
			}
			pos[0]++;
		}
		pos[1]++;
	}
	return null;
}

const find_around = (pos) => {
	const char = get_char(pos);
	if(valid_tile[char]) {
		return pipes[char].map((dir) => add_pos(pos, dir));
	}
	return null;
}

const find_next = (prev, current) => {
	const found = find_around(current);
	if(!found) return null;
	const results = found.filter((next) => !is_same_pos(next, prev));
	if(!results.length) return null;
	return results[0];
}

const get_path = () => {
	let start = find_pos('S');

	let next;
	for(const around of search_around_pos) {
		const pos = add_pos(start, around);
		const found = find_around(pos);
		if(!found) continue;
		if(found.filter((pos) => is_same_pos(pos, start)).length > 0) {
			next = pos;
			break;
		}
	}

	if(!next) {
		console.log('nothing around');
		return -1;
	}

	let prev = start;
	let current = next;
	let path = [['S', start]];
	while(true) {
		path.push([get_char(current), current]);
		next = find_next(prev, current);
		if(!next) {
			break;
		}
		prev = current;
		current = next;
	}

	return path;
}

const part1 = () => {
	return Math.floor((get_path().length) / 2);
}

const part2 = () => {
	const path = get_path();
	const vertices = path.map((p) => p[1]);
	const map = vertices.reduce((m,v) => {
		if(!m[v[0]]) m[v[0]] = {};
		m[v[0]][v[1]] = true;
		return m;
	}, {});
	const is_in_path = (pos) => {
		if(!map[pos[0]]) return false;
		return !!map[pos[0]][pos[1]];
	}
	const is_corner = (pos) => {
		const c = get_char(pos);
		return ['L','J','7','F'].includes(c);
	}

	let total = 0;
	let y = 0;
	let x = 0;
	for(const line of lines) {
		let inside = false;
		let previous_corner;
		x = 0;
		let last_char;
		for(const char of line) {
			if(is_in_path([x,y]) && is_corner([x,y])) {
				if(!previous_corner) {
					previous_corner = char;
				} else {
					if(corner_change[previous_corner][char]) {
						inside = !inside;
					}
					previous_corner = undefined;
					x++;last_char=char;continue
				}
			}
			if(is_in_path([x,y]) && (char === '|' || char === 'S')) {
				inside = !inside;
				x++;last_char=char;continue
			}
			if(is_in_path([x,y])) {x++;last_char=char;continue}
			if (inside) {
				lines_copy[y] = str_replaceAt(lines_copy[y], x, 'I');
				total++;
			} else {
				lines_copy[y] = str_replaceAt(lines_copy[y], x, 'O');
			}
			x++;
			last_char = char;
		}
		y++;
	}

	fs.writeFileSync('output.txt', lines_copy.join('\n'));

	return total;
}

console.time('Part 1');
console.log(part1());
console.timeEnd('Part 1');
console.time('Part 2');
console.log(part2());
console.timeEnd('Part 2');