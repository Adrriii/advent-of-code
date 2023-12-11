import fs from 'fs';

const readlines = (fileName) => fs.readFileSync(fileName, 'utf8').split('\n').filter((l) => !!l);

let lines = readlines('input.txt');

const getEmptyVects = () => {
	let ys = [];
	let xs = [];

	let y = 0;
	for(let line of lines) {
		let n = line.split('#');
		if(n.length === 1) {
			ys.push(y);
		}
		y++;
	}

	for(let x = 0; x < lines[0].length; x++) {
		let found = false;
		for(let line of lines) {
			if(line[x] === '#') {
				found = true;
				break;
			}
		}
		if(!found) {
			xs.push(x);
		}
	}

	return [xs, ys];
}

const getMapAfterEmpty = () => {
	let nlines = [...lines];
	let empty = getEmptyVects();
	empty[0].reverse();

	for(let y = nlines.length -1; y >= 0; y--) {
		if(empty[1].includes(y)) {
			nlines[y] = nlines[y].replaceAll('.', 'E');
		}
	}
	for(let y = 0; y < nlines.length; y++) {
		let line = nlines[y];
		for(let x of empty[0]) {
			line = line.slice(0, x) + "E" + line.slice(x+1);
		}
		nlines[y] = line;
	}

	return nlines;
}

const getGalaxiesMap = (lines) => {
	let map = {};
	let id = 1;
	let y = 0;
	for(let line of lines) {
		let x = 0;
		for(let char of line) {
			if(char === '#') {
				map[id++] = [x,y];
			}
			x++;
		}
		y++;
	}
	return map;
}

const getPairs = (map) => {
	let galaxies = Object.keys(map);
	let pairs = [];

	for(let a = 0; a < galaxies.length; a++) {
		let a_id = a + 1;
		for(let b = a + 1; b < galaxies.length; b++) {
			let b_id = b + 1;
			pairs.push([map[a_id], map[b_id]]);
		}
	}

	return pairs;
}

const getRange = (a,b) => {
	if(b > a) {
		return Array(b - a).fill().map((_, idx) => a + idx + 1)
	} else if (a > b) {
		return Array(a - b).fill().map((_, idx) => a - (idx + 1))
	}
	return [];
}

const getDistance = (map,a,b, e_size = 1) => {
	let total = 0;
	for(let x of getRange(a[0], b[0])) {
		if(map[a[1]][x] === 'E') total += e_size;
		else total++;
	}
	for(let y of getRange(a[1], b[1])) {
		if(map[y][a[0]] === 'E') total += e_size;
		else total++;
	}
	return total;
}

const getPairsDistances = (e_size = 1) => {
	let empty_map = getMapAfterEmpty();
	return getPairs(getGalaxiesMap(empty_map)).reduce((t,p) => t + getDistance(empty_map, p[0], p[1], e_size), 0);
}

const part1 = () => getPairsDistances(2);
const part2 = () => getPairsDistances(1000000);

console.time('Part 1');
console.log(part1());
console.timeEnd('Part 1');
console.time('Part 2');
console.log(part2());
console.timeEnd('Part 2');