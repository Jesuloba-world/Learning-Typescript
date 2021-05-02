abstract class Department {
	static fiscalYear = 2020;

	private employees: string[] = [];

	constructor(protected readonly id: string, public name: string) {
		// this.name = n;
	}

	abstract describe(this: Department): void;

	static createEmployee(name: string) {
		return { name: name };
	}

	addEmployee(employee: string) {
		this.employees.push(employee);
	}

	printEmployeeInformation() {
		console.log(this.employees.length);
		console.log(this.employees);
	}
}

class ITDepartment extends Department {
	constructor(public readonly id: string, public admins: string[]) {
		super(id, "IT");
	}

	describe() {
		console.log(`IT department - ID: ${this.id}`);
	}
}

class AccountingDepartment extends Department {
	private lastReport: string;

	get mostRecentReport() {
		if (this.lastReport) {
			return this.lastReport;
		}
		throw new Error("No report found");
	}

	set mostRecentReport(value: string) {
		if (!value) {
			throw new Error("Pls pass in a valid value!");
		}
		this.addReport(value);
	}

	constructor(public readonly id: string, private reports: string[]) {
		super(id, "Accounting");
		this.lastReport = reports[0];
	}

	addEmployee(name: string) {
		if (name === "Max") {
			return;
		}
		super.addEmployee(name);
	}

	describe() {
		console.log(`Accounting Department - ID: ${this.id}`);
	}

	addReport(text: string) {
		this.reports.push(text);
		this.lastReport = text;
	}

	printReport() {
		console.log(this.reports);
	}
}

const employee = Department.createEmployee("Gudu");
console.log(employee, Department.fiscalYear);

const hello = new AccountingDepartment("D2", []);

const hi = new ITDepartment("D3", ["Max", "John", "Buza"]);

hi.describe();

hi.addEmployee("duze");
hi.addEmployee("vuka");

console.log(hi);

hello.addEmployee("John");
hello.addEmployee("Max");
hello.addEmployee("Emily");

hello.mostRecentReport = "nbcsjkx v";
hello.addReport("Something went wrong...");
console.log(hello.mostRecentReport);

hello.describe();
// hello.printEmployeeInformation();
// hello.printReport();
