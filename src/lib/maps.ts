type Indexable = string | number | symbol;

export type IndexMap<T extends Indexable, R> = {
	[key in T]?: R;
};

export const objects_to_map = <T extends Indexable, R>(object: R[], property: string, is_func: boolean = false): IndexMap<T, R> => object.reduce((map, object) => {
	if(is_func) {
		map[object[property]()] = object;
	} else {
		map[object[property]] = object;
	}
	return map;
}, {});

export const count_map : <T extends Indexable>(array: T[]) => IndexMap<T, number> = (array) => array.reduce((map, value) => {
	if(!map[value]) map[value] = 0;
	map[value]++;
	return map;
}, {} as IndexMap<Indexable, number>);

export const unique_map : <T extends Indexable>(array: T[]) => IndexMap<T, boolean> = (array) => array.reduce((map, value) => {
	map[value] = true;
	return map;
}, {} as IndexMap<Indexable, boolean>);

export const is_all_n = <T>(array: T[], n: T): boolean => {
	return array.reduce((t,v) => t && v === n, true);
}

export const sum = (map: {[key: Indexable]: number}) => Object.values(map).reduce((c,v) => c+v, 0);