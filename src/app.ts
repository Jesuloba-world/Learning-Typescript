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
	return function <T extends { new (...args: any[]): { name: string } }>(
		originalConstructor: T
	) {
		return class extends originalConstructor {
			constructor(..._: any[]) {
				super();
				console.log("rendering template");
				const hookEl = document.getElementById(hookId);
				if (hookEl) {
					hookEl.innerHTML = template;
					document.querySelector(
						"h1"
					)!.textContent = `my name is ${this.name}`;
				}
			}
		};
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

//----------------------------------------------------------------
// Autobind decorator

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
	const originalMethod = descriptor.value;
	const adjDescriptor: PropertyDescriptor = {
		configurable: true,
		enumerable: false,
		get() {
			const boundFn = originalMethod.bind(this);
			return boundFn;
		},
	};
	return adjDescriptor;
}

class Printer {
	message: string = "This works!";

	@Autobind
	showMessage() {
		console.log(this.message);
	}
}

const p = new Printer();

const button = document.querySelector("button")!;
button.addEventListener("click", p.showMessage);

//----------------------------------------------------------------
// Validation with decorators
interface ValidatorConfig {
	[property: string]: {
		[validatableProp: string]: string[]; // ['required', 'positive']
	};
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
	registeredValidators[target.constructor.name] = {
		...registeredValidators[target.constructor.name],
		[propName]: ["required"],
	};
}

function PositiveNumber(target: any, propName: string) {
	registeredValidators[target.constructor.name] = {
		...registeredValidators[target.constructor.name],
		[propName]: ["positive"],
	};
}

function validate(obj: any) {
	const objValidatorConfig = registeredValidators[obj.constructor.name];
	if (!objValidatorConfig) {
		return true;
	}
	let isValid = true;
	for (const prop in objValidatorConfig) {
		for (const validator of objValidatorConfig[prop]) {
			switch (validator) {
				case "required":
					isValid = isValid && !!obj[prop];
					break;
				case "positive":
					isValid = isValid && obj[prop] > 0;
					break;
			}
		}
	}
	return isValid;
}

class Course {
	@Required
	title: string;
	@PositiveNumber
	price: number;

	constructor(t: string, p: number) {
		this.title = t;
		this.price = p;
	}
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const titleEl = document.getElementById("title") as HTMLInputElement;
	const priceEl = document.getElementById("price") as HTMLInputElement;

	const title = titleEl.value;
	const price = +priceEl.value;

	const createdCourse = new Course(title, price);

	if (!validate(createdCourse)) {
		alert("Invalid input, please try again!");
		return;
	}
	console.log(createdCourse);
});
