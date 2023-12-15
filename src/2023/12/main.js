import fs from 'fs';

const lines = fs.readFileSync("input.txt", 'utf-8').split('\n').filter((l) => !!l);

const getFolded = (line, folds) => {
	let [data, counts] = line.split(' ');
	let rcounts = [];
	let rdata = [];
	for(let i = 0; i < folds; i++) {
		rcounts.push(counts);
		rdata.push(data);
	}
	counts = rcounts.join(',');
	data = rdata.join('?');
	return [data, counts];
}
const memory = {};
const returnSaveMem = (data, j, in_group, ended_group, r) => {
	if(!memory[data]) memory[data] = {};
	if(!memory[data][j]) memory[data][j] = {};
	if(!memory[data][j][in_group]) memory[data][j][in_group] = {};
	memory[data][j][in_group][ended_group] = r;
	return r;
}
const check = (data, groups_int, in_group, ended_group) => {
	const j = groups_int.join(',');
	if(memory[data] && memory[data][j] && memory[data][j][in_group] && memory[data][j][in_group][ended_group] !== undefined) {
		return memory[data][j][in_group][ended_group];
	}
	if(!data) {
		return returnSaveMem(data, j, in_group, ended_group, groups_int.length === 0 ? 1 : 0);
	}
	if(!groups_int.length) {
		if((data.split('#').length - 1) === 0) return returnSaveMem(data, j, in_group, ended_group, 1);
		return returnSaveMem(data, j, in_group, ended_group, 0);
	}
	if(data[0] === '.') {
		if(in_group) {
			return returnSaveMem(data, j, in_group, ended_group, 0);
		}
		return returnSaveMem(data, j, in_group, ended_group, check(data.slice(1), groups_int, false));
	}
	if(data[0] === '#') {
		if(ended_group) return returnSaveMem(data, j, in_group, ended_group, 0);

		groups_int = [...groups_int];
		groups_int[0] = groups_int[0] - 1;
		in_group = true;
		ended_group = false;
		if(groups_int[0] === 0) {
			in_group = false;
			ended_group = true,
			groups_int.shift();
		}
		return check(data.slice(1), groups_int, in_group, ended_group);
	}
	if(data[0] === '?') {
		return 	returnSaveMem(data, j, in_group, ended_group, check('.'+data.slice(1), groups_int, in_group, ended_group)
			+ 	check('#'+data.slice(1), groups_int, in_group, ended_group));
	}
	return returnSaveMem(data, j, in_group, ended_group, 0);
}

const getNbValidPermutations = (line, folds) => {
	let [data, counts] = getFolded(line, folds);
	let perms = check(data, counts.split(',').map((c)=>parseInt(c)));
	return perms;
}

const part1 = () => {
	return lines.reduce((t,l) => t + getNbValidPermutations(l, 1), 0);
}

const part2 = () => {
	return lines.reduce((t,l, i, a) => {
		return t + getNbValidPermutations(l, 5)
	}, 0);
}

console.time('Part 1');
console.log(part1());
console.timeEnd('Part 1');
console.time('Part 2');
console.log(part2());
console.timeEnd('Part 2');