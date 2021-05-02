"use strict";
class Person {
    constructor(name) {
        this.name = name;
        this.age = 24;
    }
    greet(phrase) {
        console.log(`${phrase} ${this.name}`);
    }
}
let user1;
user1 = new Person("John");
user1.greet("Hi there - I am");
console.log(user1);
//# sourceMappingURL=app.js.map