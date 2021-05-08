/**
 * 	DECORATORS
 */

function Logger(logString: string) {
	return function (constructor: Function) {
		console.log(logString);
		console.log(constructor);
	};
}

function WithTemplate(template: string, hookId: string) {
	return function (constructor: any) {
		const hookEl = document.getElementById(hookId);
		const p = new constructor();
		if (hookEl) {
			hookEl.innerHTML = template;
			document.querySelector("h1")!.textContent = `my name is ${p.name}`;
		}
	};
}

// @Logger("LOGGING - PERSON")
@WithTemplate("<h3>My person object</h3>", "app")
class Person {
	name = "John";

	constructor() {
		console.log("creating person object...");
	}
}

const pers = new Person();

console.log(pers);
