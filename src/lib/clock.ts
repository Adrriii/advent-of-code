import { performance } from 'perf_hooks';

class Clock {
	time: {[key:string]: number};
	constructor() {
		this.time = {};
	}

	start(label: string) {
		this.time[label] = performance.now();
	}

	endPrint(label: string): number {
		if(this.time[label] === null) return -1;
		let result = performance.now() - this.time[label];
		delete this.time[label];
		console.log(label,'-',result.toFixed(3),'ms');
		return result;
	}
}
const inst = new Clock();
export default inst;