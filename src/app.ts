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

type Combinable = number | string;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;
