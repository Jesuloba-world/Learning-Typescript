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
		console.log("rendering template");
		const hookEl = document.getElementById(hookId);
		const p = new constructor();
		if (hookEl) {
			hookEl.innerHTML = template;
			document.querySelector("h1")!.textContent = `my name is ${p.name}`;
		}
	};
}

@Logger("LOGGING")
@WithTemplate("<h3>My person object</h3>", "app")
class Person {
	name = "John";

	constructor() {
		console.log("creating person object...");
	}
}

const pers = new Person();

console.log(pers);

// property decorators
function Log(target: any, propertyName: string) {
	console.log("property decorator!");
	console.log(target, propertyName);
}

// accessor decorators
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
	console.log("accessor decorator");
	console.log(target);
	console.log(name);
	console.log(descriptor);
}

// method decorators
function Log3(
	target: any,
	name: string | Symbol,
	descriptor: PropertyDescriptor
) {
	console.log("method decorator");
	console.log(target);
	console.log(name);
	console.log(descriptor);
}

// parameter decorators
function Log4(target: any, name: string, position: number) {
	console.log("parameter decorator");
	console.log(target);
	console.log(name);
	console.log(position);
}

class product {
	@Log
	title: string;
	private _price: number;

	@Log2
	set price(val: number) {
		if (val > 0) {
			this._price = val;
		} else {
			throw new Error("Invalid price - should be positive");
		}
	}

	constructor(t: string, p: number) {
		this.title = t;
		this._price = p;
	}

	@Log3
	getPriceWithTax(@Log4 tax: number) {
		return this._price * (1 + tax);
	}
}
