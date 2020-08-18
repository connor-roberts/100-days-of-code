// Closure = combo of function and lexical scope

// BASIC EXAMPLE

const myFunction = () => {
    const message = "This is a message"
    const printMessage = () => {
        console.log(message)
    }
    return printMessage
}

const myPrintMessage = myFunction()
myPrintMessage()

// EXAMPLE - PRIVATE VARIABLE

const createCounter = () => {
    let count = 0
    return {
        increment() {
            count++
        },
        decrement() {
            count--
        },
        getCount() {
            return count
        }
    }
}

// High control over how the # is changed. Can't be modified externally

const counter = createCounter()
counter.increment()
counter.increment()
counter.increment()
counter.decrement()
console.log(counter.getCount())

// Adder - closure + currying
/* 
Currying = process of taking a single function that takes a lot of...
...arguments and splitting it into multiple functions that take a subset of the arguments
*/

const createAdder = (a) => {
    return (b) => {
        return a + b
    }
}

const add10 = createAdder(10)
console.log(add10(-2))
console.log(add10(20))

// Tipper

const createTipper = (percent) => {
    return (billAmount) => {
        return percent * billAmount
    }
}

const tip15 = createTipper(0.15) // 15%
const tip20 = createTipper(0.2) // 20%

console.log(tip15(100))
console.log(tip20(100))

