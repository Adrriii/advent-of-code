import fs from 'fs';

const readlines = (fileName) => fs.readFileSync(fileName, 'utf8').split('\n');

const lines = readlines('input.txt');

const dirs = {
	'U': [0,-1],
	'D': [0,1],
	'L': [-1,0],
	'R': [1,0],
}
const hexdirs = {
	'0': 'R',
	'1': 'D',
	'2': 'L',
	'3': 'U',
}
const get_moves = () => {
	const vects = [];
	for(let line of lines) {
		const [dir, l, color] = line.split(' ');
		vects.push([parseInt(l), dirs[dir]]);
	}
	return vects;
}

const get_real_moves = () => {
	const vects = [];
	for(let line of lines) {
		const [dir, l, color] = line.split(' ');
		const hex = color.slice(1);
		const hex_l = hex.slice(6,7);
		const hex_d = hex.slice(1,6);
		vects.push([parseInt('0x'+hex_d), dirs[hexdirs[hex_l]]]);
	}
	return vects;
}

const add_pos_x = ([x,y],[dx,dy],m) => {
	return [x+(dx*m),y+(dy*m)];
}

const dist = ([x1,y1],[x2,y2]) => {
	return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}

const find_min_bounds = (moves) => {
	let pos = [0,0];
	let min = {
		x: Infinity,
		y: Infinity
	};
	for(let [l, dir] of moves) {
		pos = add_pos_x(pos, dir, l);
		let [x,y] = pos;

		min.y = Math.min(min.y, y);
		min.x = Math.min(min.x, x);
	}
	return min;
}

const get_verts = (moves) => {
	let min_bounds = find_min_bounds(moves);
	let pos = [-min_bounds.x, -min_bounds.y];

	const verts = [pos];
	let next_pos;
	for(let [l, dir] of moves) {
		next_pos = add_pos_x(pos, dir, l)
		verts.push(next_pos);
		pos = next_pos;
	}
	return verts;
}
const get_poly_area = (verts) => {
    var total = 0;
	var edges = 0;
    for (var i = 0; i < verts.length; i++) {
		var is_first = i === 0;
		var is_last = i == verts.length - 1;
		var next_i = is_last ? 0 : i + 1;

		total += (verts[i][0] * verts[next_i][1] * 0.5);
		total -= (verts[next_i][0] * verts[i][1] * 0.5);
		edges += is_first ? 0 : dist(verts[i], verts[i-1]);
    }

    return Math.abs(total) + Math.floor(edges/2) + 1;
}
const part1 = () => get_poly_area(get_verts(get_moves()));
const part2 = () => get_poly_area(get_verts(get_real_moves()));

console.time('Part 1');
console.log(part1());
console.timeEnd('Part 1');
console.time('Part 2');
console.log(part2());
console.timeEnd('Part 2');