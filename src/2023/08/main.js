import fs from 'fs';

const readlines = (fileName) => fs.readFileSync(fileName, 'utf8').split('\n').filter((l) => !!l);

const lines = readlines('input.txt');

const parse_line = (line) => {
	let parts = line.split(' = ');
	let next = parts[1].substr(1,8).split(', ');
	return {
		id: parts[0],
		left: next[0],
		right: next[1],
	}
}

const part1 = () => {
	const lines_ = [...lines];
	const directions = lines_.shift();

	const nodes = lines_.map((l) => parse_line(l));
	const map = nodes.reduce((map, node) => {
		map[node.id] = node;
		return map;
	}, {});

	let current_node = map["AAA"];
	let pos = 0;
	let first = current_node.id;
	while(true) {
		if(current_node.id === "ZZZ") return pos;
		const i = pos % directions.length;
		if(current_node.id === first && pos !== 0 && i === 0) return 'Infinity';
		const dir = directions[i];
		const next = dir === "L" ? current_node.left : current_node.right;
		current_node = map[next];
		pos++;
	}
}

const get_steps_to_z = (node_id) => {
	const lines_ = [...lines];
	const directions = lines_.shift();

	const nodes = lines_.map((l) => parse_line(l));
	const map = nodes.reduce((map, node) => {
		map[node.id] = node;
		return map;
	}, {});

	let current_node = map[node_id];
	let pos = 0;
	while(true) {
		if(current_node.id[2] === "Z") return pos;
		const i = pos % directions.length;
		const dir = directions[i];
		const next = dir === "L" ? current_node.left : current_node.right;
		current_node = map[next];
		pos++;
	}
}

const get_next_to_z = (node_id) => {
	const lines_ = [...lines];
	const directions = lines_.shift();

	const nodes = lines_.map((l) => parse_line(l));
	const map = nodes.reduce((map, node) => {
		map[node.id] = node;
		return map;
	}, {});

	let current_node = map[node_id];
	let pos = 0;
	let poses = [];
	while(true) {
		if(current_node.id[2] === "Z") {
			poses.push(pos);
		}
		if(poses.length > 2) break;;
		const i = pos % directions.length;
		const dir = directions[i];
		const next = dir === "L" ? current_node.left : current_node.right;
		current_node = map[next];
		pos++;
	}
	return poses[2] - poses[1];
}

const part2_modulo = () => {
	const lines_ = [...lines];
	const directions = lines_.shift();

	const nodes = lines_.map((l) => parse_line(l));
	const map = nodes.reduce((map, node) => {
		map[node.id] = node;
		return map;
	}, {});

	let current_nodes = Object.entries(map).filter(([k,v]) => k[2] === 'A').map(([k,v]) => v);
	let distances_full = current_nodes.reduce((m, n) => {
		m[n.id] = [get_steps_to_z(n.id), get_steps_to_z(n.id)];
		return m;
	}, {});
	console.log(distances_full);
	while(true) {
		let vals = Object.values(distances_full);
		let check_same = vals.reduce((c,d) => [c[0] && c[1] === d[1], d[1]], [true, vals[0][1]]);
		if(check_same[0]) return check_same[1];
		let entr = Object.entries(distances_full);
		let get_min = entr.reduce((m,e) => m[1][1] > e[1][1] ? e : m, entr[0]);
		distances_full[get_min[0]][1] += distances_full[get_min[0]][0];
		console.log(vals);
	}
}

const part2 = () => {
	const lines_ = [...lines];
	const directions = lines_.shift();

	const nodes = lines_.map((l) => parse_line(l));
	const map = nodes.reduce((map, node) => {
		map[node.id] = node;
		return map;
	}, {});

	let current_nodes = Object.entries(map).filter(([k,v]) => k[2] === 'A').map(([k,v]) => v);
	let nb_nodes = current_nodes.length;
	let pos = 0;
	while(true) {
		if(current_nodes.filter((n) => n.id[2] === 'Z').length === nb_nodes) return pos;
		const i = pos % directions.length;
		const dir = directions[i];
		current_nodes = current_nodes.map((n) => dir === "L" ? map[n.left] : map[n.right]);
		pos++;
	}
}

console.log(part1());
console.log(part2_modulo());