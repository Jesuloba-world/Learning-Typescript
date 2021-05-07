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

function merge<T, U>(objA: T, objB: U) {
	return Object.assign(objA, objB);
}

const mergedObject = merge({ name: "Max" }, { age: 20 });
console.log(mergedObject.name);
