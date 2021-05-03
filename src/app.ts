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
