/* 

https://youtu.be/PFmuCDHHpwk

4 pillars of OOP
----------------

1. Encapsulation - grouping properties and methods into an object

- Object: A grouping of related variables (properties) and functions (methods)

2. Abstraction - hide some properties and methods from the outside

- Show only the essentials
- Makes working w/ objects easier (simpler interface)
- Reduces impact of change (changes don't leak to outside)

3. Inheritance

- Eliminates redundant code by sharing commonalities

4. Polymorphism

- Refactor switch/case & if/else statements

*/

/*

https://youtu.be/3AKh0-PDsMw

Constructor acts as a blueprint
From one constructor, we can create many instances

Inheritance - one object gets access to another object's properties and methods

JS is a prototype-based language

Each JS object has a prototype property

Inheritance is made possible by the "prototype" property on every object

The prototype property is where we put methods and and properties that we want other objects to inherit

Prototype chain: 
Every object we create is an instance of the Object constructor

https://cdn.zappy.app/2a8905e5b9241fcd980066658d2a7bd5.png

Object
|_ Person
    |_ Athlete

When we try to use a method on an object, JS will try to find it on that object
If it does not find it, it will look at the object's prototype (i.e. the prototype of the parent)
Continues until null

Summary:
https://cdn.zappy.app/0fba9879ef5d7c37033bc50a908e6835.png

*/

// Constructor
const Person = function (name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
};

// Adding a method to the Constructor's prototype property
Person.prototype.getAgeSummary = function () {
    return `${this.name} is ${this.age} years old.`
};

// Instantiation
const dave = new Person("Dave", 45, "accountant")

console.log(dave.getAgeSummary())

// Specifying inheritance using Object.create()
const mike = Object.create(Person.prototype, {
    name: {value: "Mike"},
    age: {value: 25},
    job: {value: "pilot"}
})

console.log(mike)

/* 

Difference between Object.create() and function constructor:

Object.create()
- Builds object that inherits directly from the one we pass into the first argument
- Lets us to create complex inheritance patterns

Function constructor
- Newly-created object inherits from constructor's prototype property

*/