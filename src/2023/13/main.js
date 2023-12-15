import fs from 'fs';

const readlines = (fileName) => fs.readFileSync(fileName, 'utf8').split('\n');

let lines = readlines('input.txt');

const getPatterns = () => {
	let patterns = [];

	let current = [];
	for(let line of lines) {
		if(line === '') {
			patterns.push(current);
			current = [];
		} else {
			current.push(line);
		}
	}
	if(current.length) patterns.push(current);
	return patterns;
}

const flipPattern = (pattern) => {
	let lines = [];

	for(let c of pattern[0]) {
		lines.push('');
	}
	for(let line of pattern) {
		let x = 0;
		for(let c of line) {
			lines[x] = lines[x] + c;
			x++;
		}
	}

	return lines;
}

const countMirrs = (pattern) => {
	let found = false;
	let x = 0;
	let results = [];
	while(++x < pattern.length && !found) {
		let stop = false;
		while(pattern[x-1] !== pattern[x]) {
			if(++x >= pattern.length) { stop = true; break; }
		}
		if(stop) break;
		let i = x-2;
		let j = x+1;
		let c = false;
		while(i >= 0 && j < pattern.length) {
			if(pattern[i] !== pattern[j]) {
				c = true;
				break;
			}
			i--;
			j++;
		}
		if(c) continue;
		results.push(x);
	}
	return results;
}

const getValues = (p) => {
	let c = countMirrs(p).map((r) => r * 100);
	c = c.concat(countMirrs(flipPattern(p)));
	return c;
}

const part1 = () => {
	let total = 0;
	for(let p of getPatterns()) {
		total += getValues(p)[0];
	}
	return total;
}
const part2 = () => {
	let total = 0;
	for(let p of getPatterns()) {
		let base = getValues(p)[0];
		let found = 0;
		let tries = 0;
		let stop = false;
		for(let line in p) {
			line = parseInt(line);
			for(let pos = 0; pos < p[line].length;	pos++) {
				let c = p[line][pos];
				let newpattern = [...p];
				let ch = c === '.' ? '#' : '.';
				let newline = newpattern[line].slice(0, pos) + ch + newpattern[line].slice(pos+1);
				newpattern[line] = newline;
				let vals = getValues(newpattern);
				if(vals.length) {
					for(let nval of vals) {
						if(nval > 0 && nval !== base) {
							total += nval;
							found++;
							stop = true;
							break;
						}
					}
				}
				tries++;
				if(stop) break;
			}
			if(stop) break;
		}
	}
	return total;
}

console.time('Part 1');
console.log(part1());
console.timeEnd('Part 1');
console.time('Part 2');
console.log(part2());
console.timeEnd('Part 2');