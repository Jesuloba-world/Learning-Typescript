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
