// CONSTRUCTOR + PROTOTYPE SYNTAX

// Prototypal inheritance

// Constructor fuction 

const Human = function (firstName, lastName, age, likes = []) {
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
    this.likes = likes
}

// Prototype properties

Human.prototype.getBio = function () {
    let bio = `${this.firstName} is ${this.age} years old.`
    this.likes.forEach((like) => {
        bio += ` ${this.firstName} likes ${like}.`
    })
    return bio
}

Human.prototype.setName = function (fullName) {
    const names = fullName.split(" ")
    this.firstName = names[0]
    this.lastName = names[1]
}


// CLASS SYNTAX

class Person {
    constructor(firstName, lastName, age, likes) {
        this.firstName = firstName
        this.lastName = lastName
        this.age = age
        this.likes = likes
    }
    getBio() {
        let bio = `${this.firstName} is ${this.age} years old.`
        this.likes.forEach((like) => {
            bio += ` ${this.firstName} likes ${like}.`
        })
        return bio
        }
    set fullName(fullName) {
        const names = fullName.split(" ")
        this.firstName = names[0]
        this.lastName = names[1]
    }
    get fullName() {
        return `${this.firstName} ${this.lastName}`
    }
}

// Subsclass - helps reduce duplicate code

class Employee extends Person {
    constructor(firstName, lastName, age, position, likes) {
        super(firstName, lastName, age, likes)
        this.position = position
    }
    getBio() {
        return `${this.fullName} is a ${this.position}.`
    }
    getYearsLeft() {
        return 65 - this.age
    }    
}

class Student extends Person {
    constructor(firstName, lastName, age, likes, grade) {
        super(firstName, lastName, age, likes)
        this.grade = grade
    }
    updateGrade(points) {
        this.grade += points
    }
    getBio() {
        const status = this.grade >= 70 ? "passing" : "failing"
        return `${this.grade}: ${this.firstName} is ${status} the class.`
    }
}

// const myPerson = new Employee("Bruce", "Wayne", 35, "Batman", ["utility belts", "butlers"])
// console.log(myPerson.getBio())

// const myStudent = new Student("Mike", "Smith", 18, ["diplomas"], 80)
// myStudent.fullName = "Maxwell Dorian"
// console.log(myStudent.getBio())

const myEmployee = new Employee("Mike", "Smith", 21, "nuclear plant worker", ["donuts"])
myEmployee.fullName = "Homer Simpson"
console.log(myEmployee.getBio())
