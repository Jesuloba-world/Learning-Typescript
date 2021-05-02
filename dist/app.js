"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    static createEmployee(name) {
        return { name: name };
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
Department.fiscalYear = 2020;
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, "IT");
        this.id = id;
        this.admins = admins;
    }
    describe() {
        console.log(`IT department - ID: ${this.id}`);
    }
}
class AccountingDepartment extends Department {
    constructor(id, reports) {
        super(id, "Accounting");
        this.id = id;
        this.reports = reports;
        this.lastReport = reports[0];
    }
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error("No report found");
    }
    set mostRecentReport(value) {
        if (!value) {
            throw new Error("Pls pass in a valid value!");
        }
        this.addReport(value);
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment("D2", []);
        return this.instance;
    }
    addEmployee(name) {
        if (name === "Max") {
            return;
        }
        super.addEmployee(name);
    }
    describe() {
        console.log(`Accounting Department - ID: ${this.id}`);
    }
    addReport(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
    printReport() {
        console.log(this.reports);
    }
}
const employee = Department.createEmployee("Gudu");
console.log(employee, Department.fiscalYear);
const hello = AccountingDepartment.getInstance();
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
//# sourceMappingURL=app.js.map