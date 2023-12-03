import clock from '../../lib/clock';
import { readlines } from '../../lib/readlines';

const lines = readlines('2015/01/input.txt');

clock.start('Day1 - Not quite LISP');

const parseLine = (line: string): number => {
	let total = 0;
	let position = 1;
	let basement_position = -1;
	for(let char of line) {
		total += char === '(' ? 1 : -1;
		if(basement_position < 0 && total === -1) {
			console.log('Basement position is', position);
			basement_position = position;
		}
		position++;
	}
	return total;
}

console.log(parseLine(lines[0]));
clock.endPrint('Day1 - Not quite LISP');