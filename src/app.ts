/**
 *  Generics
 *  built in generics
 */

// const promise: Promise<number> = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		resolve(10);
// 	}, 2000);
// });

// promise.then((data) => {
// 	data.split(" ");
// });

/**
 * Custom generics
 */

function merge<T extends object, U extends object>(objA: T, objB: U) {
	return Object.assign(objA, objB);
}

const mergedObject = merge({ name: "Max" }, { age: 20 });
console.log(mergedObject.name);

/**
 *  Generic Function
 */

// only properties with the length value will be allowed into the function
interface Lenghty {
	length: number;
}

function countAndDescribe<T extends Lenghty>(element: T): [T, string] {
	let descriptionText = "Got no value.";
	if (element.length === 1) {
		descriptionText = "Got 1 element.";
	} else if (element.length > 1) {
		descriptionText = `Got ${element.length} elements`;
	}

	return [element, descriptionText];
}

console.log(countAndDescribe("hi there!"));

/**
 *  The Keyof Constraint
 */

function extractAndConvert<T extends object, U extends keyof T>(
	obj: T,
	key: U
) {
	return obj[key];
}

extractAndConvert({ name: "Max" }, "name");

/**
 *  Generic classes
 */

class DataStorage<T extends string | number | boolean> {
	private data: T[] = [];

	addItem(item: T) {
		this.data.push(item);
	}

	removeItem(item: T) {
		this.data.splice(this.data.indexOf(item), 1);
	}

	getItems() {
		return [...this.data];
	}
}

const textStorage = new DataStorage<string>();
textStorage.addItem("John");
textStorage.addItem("Max");
textStorage.addItem("Manu");
textStorage.removeItem("Manu");
console.log(textStorage.getItems());

/**
 *  Generic Utility Types
 */

interface Goal {
	title: string;
	description: string;
	completeUntil: Date;
}

// the Partial type
function createGoal(title: string, description: string, date: Date): Goal {
	let goal: Partial<Goal> = {};
	goal.title = title;
	goal.description = description;
	goal.completeUntil = date;
	return goal as Goal;
}

// the Readonly type
const names: Readonly<string[]> = ["Jesuloba", "John", "Needle"];
