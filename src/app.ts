type Admin = {
	name: string;
	privileges: string[];
};

type Employee = {
	name: string;
	startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
	name: "John",
	privileges: ["create-server"],
	startDate: new Date(),
};

// type Combinable = number | string;
// type Numeric = number | boolean;

// type Universal = Combinable & Numeric;

type unknownEmployee = Admin | Employee;

// You can also use the 'typeof' operator
// but it only works for javascript built in types

// Type guard using 'in' operator
// Works for both classes and types
function printEmployeeInformation(emp: unknownEmployee) {
	console.log(`Name: ${emp.name}`);
	if ("privileges" in emp) console.log(`Privileges: ${emp.privileges}`);
	if ("startDate" in emp) console.log(`startDate: ${emp.startDate}`);
}

printEmployeeInformation(e1);

class Car {
	drive() {
		console.log("Driving...");
	}
}

class Truck {
	drive() {
		console.log("Driving a Truck...");
	}

	loadCargo(amount: number) {
		console.log("Loading cargo... " + amount);
	}
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

// Type guard using 'instanceof'
// Only works for classes
function useVehicle(vehicle: Vehicle) {
	vehicle.drive();
	if (vehicle instanceof Truck) {
		vehicle.loadCargo(1000);
	}
}

useVehicle(v1);
useVehicle(v2);

// Discriminated Union
// All objects have properties of same name that describe them
interface Bird {
	type: "bird";
	flyingSpeed: number;
}

interface Horse {
	type: "horse";
	runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
	let speed;
	switch (animal.type) {
		case "bird":
			speed = animal.flyingSpeed;
			break;
		case "horse":
			speed = animal.runningSpeed;
			break;
		default:
			break;
	}

	console.log("moving at speed: " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 200 });

// Type casting

// const userInputElement = <HTMLInputElement>(
// 	document.getElementById("user-input")
// );

const userInputElement = document.getElementById(
	"user-input"
) as HTMLInputElement;

userInputElement.value = "Hi there!";
