# 100 Days of Code

Here, I'm documenting my #100DaysOfCode journey. This is more blog than curriculum, but you might find something interesting! 

Catch me on Twitter: [@connorrobots](https://twitter.com/connorrobots)

Things I'm using in this log (screenshots, hosting, etc.): [Tools](#tools)

### Week 1

Day 1 | Day 2 | Day 3 | Day 4 | Day 5 | Day 6 | Day 7
------------ | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- 
[OOP, primitives, objects, constructors, prototypes](#day-1) | [Prototypal inheritance](#day-2) | [Array methods, DOM manipulation](#day-3) | [OOP, Git, GitHub](#day-4) | [Word-guessing app](#day-5) | [Refactoring, Class syntax](#day-6) | [Subclasses, getters & setters](#day-7)

### Week 2

Day 8 | Day 9 | Day 10 | Day 11 | Day 12 | Day 13 | Day 14
------------ | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- 
[HTTP requests with XMLHttpRequest](#day-8) | [Callback abstraction](#day-9) | [More callback abstraction](#day-10) | [Closures](#day-11) | [Promises](#day-12) | [Practice: Callbacks & Promises](#day-13) | ...

***

<!-- TEMPLATE -->

<!-- https://www.markdownguide.org/basic-syntax -->
<!--
## Day #:
### tl;dr
- Topic(s):
- Time:
### Today's Topic(s)
### Key takeaways
### Tomorrow
### Journal
-->

## Day 13:

### tl;dr

- Topic(s): Practicing callbacks and promises
- Time: 1 hour

### Today's Topic(s)

I was not feeling great about my ability to mentally distinguish between callbacks and promises...and to actually write them. So today, I just focused on getting some practice, comparing and contrasting the two to make sure the syntax sticks. 

I stole this example from @developedbyed, then repeated it from memory, making modifications.

Here, we look at the same situation three ways: synchronous, asynchronous using callbacks, asynchronous using promises

#### Synchronous

Below, we simulate an asynchronous event, like and API call, with `setTimeout()`. The following returns `undefined` for our functions because they're executed before `setTimeout()` completes.

This is why we need asynchronous approaches: So we can accommodate events that are not instantaneous.

```javascript
// * SYNC

console.log("start");

function loginUser(email, password) {
    setTimeout(() => {
        return { userEmail: email };
    }, 2000);
}

function getUserVideos(email) {
    setTimeout(() => {
        return ["Video 1", "Video 2", "Video 3"];
    }, 5000);
}

function getVideoDetails(video) {
    setTimeout(() => {
        return { id: "12345", title: video};
    }, 3000);
}

const loginMike = loginUser("mike@michael.com", 12345);
console.log(loginMike);

const mikesVideos = getUserVideos("mike@michael.com");
console.log(mikesVideos);

const videoOne = getVideoDetails("Video 1");
console.log(videoOne);

console.log("finish");

/*

Output:

"start"
undefined
undefined
undefined
"finish"

*/
```

#### Callbacks

Below, we use callbacks to handle the asychronous events in our functions. This works because the callbacks are not executed until the end of the asynchronous events, so a value is being returned. 

```javascript
// * CALLBACKS

console.log("start");

function loginUser(email, password, callback) {
    setTimeout(() => {
        callback({ userEmail: email});
    }, 2000);
}

function getUserVideos(email, callback) {
    setTimeout(() => {
        callback(["Video 1", "Video 2", "Video 3"]);
    }, 2000);
}

function getVideoDetails(video, callback) {
    setTimeout(() => {
        callback({ id: 1234, title: video});
    }, 2000)
}

loginUser("mike@michael.com", 12345, (user) => {
    console.log(user);
    getUserVideos("mike@michael.com", (videos) => {
        console.log(videos);
        getVideoDetails("Point Break 2", (details) => {
            console.log(details);
        });
    });
});

console.log("finish");

/*

Output:

"start"
"finish"
{ userEmail: "mike@michael.com" }
[ "Video 1", "Video 2", "Video 3" ]
{ id: 1234, title: "Point Break 2" }

*/
```

We also start to see "callback hell" where callbacks are nesting within callbacks within callbacks. 

#### Promises

Here, we use Promises as an alternative to callbacks. We're only using `resolve` for the sake of simplicity.

```javascript
// * PROMISES

console.log("start")

function loginUser(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ userEmail: email });
        }, 2000);
    });
}

function getUserVideos(email) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(["Video 1", "Video 2", "Video 3"]);
        }, 2000);
    });
}

function getVideoDetails(video) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({id: 123, title: video});
        }, 2000);
    });
}

loginUser("mike@michael.com", 1234)
    .then(user => getUserVideos(user.userEmail))
    .then(videos => console.log(videos[0]))
    // if getVideoDetails was able to do anything with the video title, we could continue the chain

console.log("finish")

/*

Output:

"start"
"finish"
"Video 1"

*/
```

The main benefit of this approach it that it makes chaining callbacks a lot easier to write and understand. Each function returns a promise, which can be used in the next function, on down the line.

### Key takeaways

No new takeaways today. Today was really just about building mental models.

### Tomorrow

Tomorrow I'm going to practice these some more, focusing on chaining in particular. I'd like to learn about `fetch()` to see if that might be easier to work with than `XMLHttpRequest()` for trying these out with API calls.

### Journal

I was really bummed this morning, feeling like I just couldn't get it. I'm still not rock-solid on these topics, but I think today was a good exercise of recognizing when to learn and when to practice.

***

## Day 12:

### tl;dr

- Topic(s): Promises (barely)
- Time: 20 minutes

### Today's Topic(s)

Low on time today, so I really just dipped my toe into the topic of Promises. 

What I took away: 

- Promises offer another solution to deal with asynchronous events
- The Promise constructor takes a function, and that function takes two parameters, `resolve` and `reject`, both of which end up being functions
- A Promise is an object with several prototype methods like `.then()` and `.catch()`
- `.then()` takes two callbacks - one for resolution and one for rejection - but I think `.catch` may be an alternative to the second
- Promises help prevent "callback hell"

Looking at two examples...

Here's a callback approach, using `setTimeout()` to simulate an asynchronous event.

```javascript
// CALLBACK

const getDataCallback = (callback) => {
    setTimeout(() => {
        callback(undefined, "this is the CALLBACK data")
    }, 2000)
}

getDataCallback((error, data) => {
    if (error) {
        console.log("Callback error")
    } else {
        console.log(data)
    }
})
```
The above works, but we need to pass the error and the data to the callback. And, the callback could be called multiple times.

But by using a Promise...

```javascript
// PROMISE

const getDataPromise = (data) => new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`This is the success data: ${data}`)
        }, 2000)
    })

const myPromise = getDataPromise("Watermelon")

myPromise.then((data) => {
    console.log(data)
}, (error) => {
    console.log(error)
})
```
...we only need to pass one argument to each of the resolve/reject functions.

### Key takeaways

- Promises ensure that something will happen, good or bad, when an asynchronous event occurrs
- A Promise is an object with properties and prototypes
- Two parts here: creating the Promise and consuming the Promise

### Tomorrow

Tomorrow I'm going to keep working on understanding and practicing Promises. I hope to compare/contrast with callbacks and try to better understand where Closures come in. 

I'd like to read this:

- [Understanding promises in JavaScript](https://hackernoon.com/understanding-promises-in-javascript-13d99df067c1)

### Journal

Feeling like I'm forgetting everything, but maybe also just tired. Today was very busy. I'm allowing myself to go slow right now because I don't have much time, and I know these are very important topics.

***

## Day 11:

### tl;dr

- Topic(s): Closures
- Time: 1 hour

### Today's Topic(s)

Today I started learning about Closures in Javascript. 

To be honest, like callbacks, closures have wrinkled my brain a bit, but I think I'm getting there. I'm under no illusion that I'm mastering this right now, but the goal is really to just be aware of them so I can re-approach the topic in context when run into them or a use-case.

I really liked the way the following article describes closures (and more importantly, *why* we use them):

- [Closures in JavaScript: Why Do We Need Them?](https://blog.bitsrc.io/closures-in-javascript-why-do-we-need-them-2097f5317daf)

Closure: a bundle including a function and the values of the variables on which it depends. 

- Short version (from Doglio's article above): "the function that is assigned (or returned as a value) and its associated scope."
- An amazing analogy from [@segdeha](https://twitter.com/segdeha): "A crystal ball than can only see where it was made"

For example, below, we assign the return value of `myFunction()` to `myPrintMessage`. `myPrintMessage` references the same object in memory as `printMessage()`.

We can call `myPrintMessage()` because the return value of `myFunction()` doesn't just include the function. It returns a record containing the lexical scope of the `printMessage` function - i.e. the function `myPrintMessage` AND the variable, `message`, on which it depends.

```javascript
const myFunction = () => {
    const message = "This is a message"
    const printMessage = () => {
        console.log(message)
    }
    return printMessage
}

const myPrintMessage = myFunction()
myPrintMessage()

// "This is a message"
```

##### A few use-cases:

###### Simulating private scope for variables

Below, we could have created an object, Counter, with a `count` property and several methods to increment/decrement/get the account. But this would have meant making the `count` property available. It could be accessed and changed by something like `myCounter.count = 4`. 

Instead, we can use closure to return an object of several methods. Because the `count` variable is in the methods' scope, they can access and use its value. Below, because all methods share the same scope, they reference the same `count` value and can increment/decrement accordinly, not just +/- 1 from 0.

```javascript
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

const myCounter = createCounter()
myCounter.increment()
myCounter.increment()
myCounter.decrement()
console.log(myCounter.getCount())
// 1

console.log(myCounter.count)
// undefined
```

###### setTimeout()

The `setTimeout()` function works via closure. The following is copy/pasted from the above article:

```javascript
function greetDelay(delay) {

    let greet = "Hello world!"

    setTimeout( _ => {
        console.log(greet)
    }, delay)

    return "done!"
}

console.log(greetDelay(100))
```

The return statement executes before `setTimeout()` finishes, yet because `setTimeout()` is in scope with `greet`, it can still access it's value and execute.

###### Constructing Functions

We can return a function from a function, and then use it to create a new function that has access to the parent function's variables due to closure.

For example, below, we set `tip15` to the return value of `createTipper`. In this way, we create a second function, and we can fix one of the arguments.

```javascript
const createTipper = (percent) => {
    return (billAmount) => {
        return percent * billAmount
    }
}

const tip15 = createTipper(0.15) // 15%
const tip20 = createTipper(0.2) // 20%

console.log(tip15(100))
console.log(tip20(100))
```

There are, of course, other use-cases, but they're a little beyong my scope (lol) right now.

### Key takeaways

- Closure: a function and its lexical scope
- Closure gives us high control over variables

### Tomorrow

Tomorrow, I'm starting in on Promises, which I believe will offer an alternative way to approach asynchrony (versus callbacks). 

***

## Day 10:

### tl;dr

- Topic(s): Callback abstraction challenge
- Time: 30 minutes

### Today's Topic(s)

Didn't have much time today, so I just completed a challenge focused on yesterday's concept: callback abstraction. 

Here, we define a function to take a callback function. Within the event listener, we can call the callback. 

In this way, we ensure that we don't run certain code until we can be confident we've received the HTTP request's response. 

```javascript
const getCountryDetails = (countryCode, callback) => {
    
    const request = new XMLHttpRequest()

    request.addEventListener("readystatechange", (e) => {
        if (e.target.readyState === 4 && e.target.status === 200) {
            const data = JSON.parse(e.target.responseText)
            const country = data.find((country) => country.alpha2Code === countryCode)
            callback(undefined, country.name)
        } else if (e.target.readyState === 4) {
            callback("Unable to fetch data", undefined)
        }
    })
    
    request.open("GET", "https://restcountries.eu/rest/v2/all")
    request.send()
}
```

Calling the above...

```javascript
getCountryDetails("US", (error, countryName) => {
    if (error) {
        console.log(error)
    } else {
        console.log(countryName)
    }
})
```

For some reason, I really struggle to conceptualize the split in functionality between the function and the callback. I think it's because, when calling a function in which we pass a callback, the overall function call looks like a function definition, but missing some code. For that reason, I feel like they should be more aware of each other, but really they are indifferent and just point toward one another.

This is a terrible example, and not in the context of async/sycn, but I think it helps me:

```javascript
const myFunction = (name, age, likes, callback) => {
    const sentence = `${name} is ${age} years old and like ${likes}`
    callback(sentence)
}

myFunction("Tony", 35, "pizza", (sentence) => {
    console.log(sentence)
})

myFunction("Mark", 60, "football", (sentence) => {
    console.log("My function has no concept of this sentence!!!")
    console.log(sentence)
})
```

`myFunction()` doesn't need to know what the callback will do. It simply executes it at the point at which it's called. This gives us flexibity to pass whatever callback function we want. 

I also learned that `.open()` also takes a boolean argument, indicating whether the call should be asynchronous (`true`) or synchronous (`false`).

```javascript
request.open("GET", "https://restcountries.eu/rest/v2/all")
```

In theory, we could use this to solve the problem of code running before we get the response, but this stops the application, which is not a good experience.

### Key takeaways

- Hammering home yesterday's point: we don't need to include any of the specifics of the callback in the actual function definition; only that our function will take a callback. We simply need to know what arguments the callback will take when it's called. That way, we can pass those to the callback within the main function.

### Tomorrow

Tomorrow, I'll have more time. Yay! I'll dig into closures and hopefully get to `fetch()`.

### Journal

As enthusiastic as ever, just having trouble making time due to big life events right now. I'm considering any amount of coding a win right now, looking forward to having more time in a few weeks.

***

## Day 9:

### tl;dr

- Topic(s): Callback abstration
- Time: 1 hour

### Today's Topic(s)

Today, I spent all my time trying to understand one example on callback abstraction in the context of an HTTP request. I think I get it now, and in retrospect, it's not very complicated, but for some reason I struggled.

The goal of the lesson was to find a way to make the response of an HTTP request usable to the rest of the application. 

Based on everything I'd learned up until now, the logical solution was to declare a global variable, `word`, and then assign a value within the event listener.

But this WILL NOT WORK!

```javascript
let word
const request = new XMLHttpRequest()

const getPuzzle = () => {
    request.open("GET", "http://puzzle.mead.io/puzzle?wordCount=2")
    request.send()
    
    request.addEventListener("readystatechange", (e) => {
        if (e.target.readyState === 4) {
           word = e.target.responseText
        }
    })
}

getPuzzle()
console.log(word)

```

This logs `undefined` because `console.log(word)` runs before we receive the response; `word` is declared, but not defined in time to be usable. 

The solution here is to use callback abstraction. My understanding, as it applies here at least, is that that means we can ask our function to take a callback function that we can only call once the arguments are available.

Below, our function takes a callback function. We don't run the callback function until the event listener is triggered, meaning we have needed arguments.

```javascript
const getPuzzle = (callback) => {
    const request = new XMLHttpRequest()

    request.addEventListener("readystatechange", (e) => {
        if (e.target.readyState === 4 && e.target.status === 200) {
            const data = JSON.parse(e.target.responseText)
            callback(undefined, data.puzzle)
        } else if (e.target.readyState === 4) {
            callback(`${e.target.status} - ${e.target.statusText}`, undefined)
        }
    })

    request.open("GET", "http://puzzle.mead.io/puzzle?wordCount=2")
    request.send()
}

getPuzzle((error, puzzle) => {
    if (error) {
        console.log(`Error: ${error}`)
    } else {
        console.log(puzzle)
    }
})
```

The above also has some added flair for error handling.

I suspect upcoming topics like `async` or `.then` will make this easier, but this felt important to understand regardless of the specific context.

### Key takeaways

- When defining a function that takes a callback, you can call the callback within the function by using the callback's name like `callback()`
- Within the function that takes the callback, you don't actually say what the callback does. That is actually passed when calling the function. For example, below, the definition of `forEach()` has no idea what function will be passed, only that one WILL be passed.

```javascript
items.forEach((item) => {
    console.log(item)
}
```

### Tomorrow

Tomorrow, I'm continuing on to the next lesson, building on today's and likely exploring some alternative approaches to the same problem.

### Journal

Feeling great about coding, just wishing I had more time right now. Things will calm down in a few weeks, but for now, I'm grateful for #100DaysOfCode because I feel compelled to keep the streak going when it would otherwise be easy to put this on the backburner. It's been really helpful for staying fresh while navigating this otherwise busy time.

***

## Day 8:

### tl;dr

- Topic(s): HTTP requests with `XMLHttpRequest`
- Time: 1 hour

### Today's Topic(s)

Today, I started learning how to make HTTP requests in Javascript using the XMLHttpRequest object. 

To use it, we first instantiate the request using the XMLHttpRequest constructor:

```javascript
const request = new XMLHttpRequest()
```
Next, we open the request, using the method and the endpoint:

```javascript
request.open("GET", "https://restcountries.eu/rest/v2/all")
```
And then we send:

```javascript
request.send()
```

To work with the response's text, we can listen for the `readystatechange` event. This will fire for each of the 4 state changes, so we really only want to focus on state 4:

```javascript
request.addEventListener("readystatechange", (e) => {
    if (e.target.readyState === 4 && e.target.status === 200) {
        const data = JSON.parse(e.target.responseText)
        console.log(data)
    } else if (e.target.readyState === 4) {
        console.log("An error has occurred")
    }
})
```

I used what I learned today to write the following, which takes the name of a country and makes an API call to get the country's capital:

```javascript
document.querySelector("#capital-search").addEventListener("submit", (e) => {
    e.preventDefault()
    const country = e.target.elements.searchCapital.value
    
    const request = new XMLHttpRequest()
    request.open("GET", `https://restcountries.eu/rest/v2/name/${country}` )
    request.send()
    
    request.addEventListener("readystatechange", (e) => {
        if (e.target.readyState === 4 && e.target.status === 200) {
            const data = JSON.parse(e.target.responseText)
            const countryData = data[0]
            document.querySelector("#capital-wrapper").innerHTML = ""
            const capital = document.createElement("h4")
            capital.textContent = countryData.capital
            document.querySelector("#capital-wrapper").appendChild(capital)
        } else {
            document.querySelector("#capital-wrapper").innerHTML = ""
            const error = document.createElement("h4")
            error.textContent = "Hmmm, we couldn't find that country..."
            document.querySelector("#capital-wrapper").appendChild(error)
        }
    })
})
```

A few helpful resources:

- [HTTP Messages](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages)
- [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
- [readystatechange event](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

### Key takeaways

- We initialize the request with the `XMLHttpRequest()` constructor
- The `readyState` property describes the state of the client during the request

### Tomorrow

- Tomorrow I won't have much time, but I'll keep digging into HTTP requests in JS.

### Journal

- Feeling good, just wish I had more time.

***

## Day 7:

### tl;dr
- Topic(s): Subclasses, getters & setters
- Time: 1 hour

### Today's Topic(s)

Today I learned how you can create subclasses to extend the functionality of Classes:

For example, below, we create `Employee` and `Student` subclasses that share properties and methods with the broader `Person` Class.

```javascript
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
```

I also learned the basics of getters and setters. These methods allow you to control how data is stored and returned. They can be handy in sanitization.

For example, the getter isn't doing much for below, but the setter allows us to call a property - the `.location` property here - AND trim whitespace, which we'd otherwise need to call a function or the `.trim()` method to do. It also allows us to add changes to the property to an array at the same time to track the property over time.

```javascript
const data = {
    locations: [],
    get location() {
        return this._location
    },
    set location(value) {
        this._location = value.trim()
        this.locations.push(this._location)
    }
}

data.location = "  Chicago   "
data.location = "  New York"
console.log(data)
```

The getters and setters on `Person` above are probably a better example. If we look at `fullName`, it's not actually a declared property, yet we can call it as such because we use the setter to split `firstName` and `lastName` and the getter to concatenate them. 

### Key takeaways

- Subclass consructor syntax:

```javascript

class SubClass extends MainClass {
    constructor(sharedArg1, sharedArg2, uniqueArg) { // all args
        super(sharedArg1, sharedArg2)
        this.uniqueArg = uniqueArg
    }
}
```

- When using a setter, we can't save the modified value to the name of the setter property because that's already taken by the setter itself. Instead, we need to add it to a property with a different name.

```javascript
 set location(value) {
        this._location = value.trim()
        this.locations.push(this._location)
    }
 ```

### Tomorrow

Tomorrow I'm wrapping up a few coding challenges in my course, and then starting in on asynchronous Javascript.

### Journal

Nearing the end of the OOP section of my course, and feeling good about the context. Next up is what I'm really interested in: asynchronous JS! Feeling re-energized and ready to roll. A bit frustrated by not being able to dedicate more time right now. 

***

## Day 6:

### tl;dr

- Topic(s): Refactored hangman app, started Class syntax
- Time: 1 hour

### Today's Topic(s)

Today I refactored my word-guessing app:

- [Try it here](https://marred-workable-moss.glitch.me/)

It still only offers 1 word, but it otherwise functions like you'd expect. It limits the number of guesses and displays a win/loss message accordingly.

I also started learning about Classes. 

Where we'd normally use a constructor function and define prototypes...

```javascript
// Constructor fuction 

const Person = function (firstName, lastName, age, likes = []) {
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
    this.likes = likes
}

// Prototype properties

Person.prototype.getBio = function () {
    let bio = `${this.firstName} is ${this.age} years old.`
    this.likes.forEach((like) => {
        bio += ` ${this.firstName} likes ${like}.`
    })
    return bio
}

Person.prototype.setName = function (fullName) {
    const names = fullName.split(" ")
    this.firstName = names[0]
    this.lastName = names[1]
}
```

...we can instead use Class syntax:

```javascript
class PersonClass {
    constructor(name, age, likes) {
        this.name = name
        this.age = age
        this.likes = likes
    }
    genBio() {
        let bio = `${this.name} is ${this.age} years old.`
        this.likes.forEach((like) => {
            bio += ` ${this.name} likes ${like}.`
        })
        return bio
        }
    setName(fullName) {
        const names = fullName.split(" ")
        this.firstName = names[0]
        this.lastName = names[1]
    }
}
```

### Key takeaways

- Class syntax is "syntactic sugar." It's easier to read, but it functions the same.
- the `.every()` array method. Takes a callback function, checks each item against the function, and returns a boolean. This was helpful in the hangman app as it offered an easy way to see if the player successfully guessed all the letters in the word.

### Tomorrow

Tomorrow I plan to leanr about subclasses, getters, and setters

### Journal

It's been a busy week, and the next few weeks will only get busier. #100DaysOfCode has been a great way to try to at least get something done every day. Hoping to use this as a way to stay fresh for the next few weeks until things calm down and I can really dig in.

***

## Day 5:

### tl;dr

- Topic(s): Word-guessing app
- Time: 30 minutes

### Today's Topic(s)

I started working on a little word-guessing app:

- [Try it here](https://marred-workable-moss.glitch.me/)

Right now it only offers one word. When I learn how to use APIs, I'm going to plug in a random-word API call. 

This didn't require much new info, but I did get to learn about the keypress event. 

```javascript
window.addEventListener("keypress", function (e) {
    const guess = String.fromCharCode(e.charCode)
    if (gameWord.remainingGuesses > 0) {
        gameWord.makeGuess(guess)
        renderWord(gameWord)
        renderGuessesLeft(gameWord)
    } else {
        renderGameOver()
    }
})
```

### Key takeaways

- To get a stringified key letter from the keypress event: `String.fromCharCode(e.charCode)`

### Tomorrow

Tomorrow, I'm hoping to get into Classes and closure. 

### Journal

Still finding it tricky to balance coding and learning with the little time I have, but I'm getting there.

***

## Day 4:

### tl;dr
- Topic(s): Tinkering with OOP, Git, GitHub
- Time: 40 minutes
### Today's Topic(s)

#### Inventory app

Today I tinkered around with OOP in little inventory tracking app. 

- [Try it here](https://funny-zealous-panda.glitch.me/)

The idea felt more unique than it actually ended up being. It's pretty similar to the grocery app I'm working on but with a few differences.

First, it was fun trying to figure out how to constuct entire new table rows using form data. I'm not sure this is the most elegant solution, but it works:

```javascript
const generateRow = function(product) {
    // Wrapper
    const newRow = document.createElement("tr")
    // Col_1
    const col1 = document.createElement("td")
    col1.textContent = product.name
    // Col_2
    const col2 = document.createElement("td")
    col2.textContent = product.price
    // Col_3
    const col3 = document.createElement("td")
    col3.textContent = product.quantity
    // Append
    newRow.appendChild(col1)
    newRow.appendChild(col2)
    newRow.appendChild(col3)
    return newRow
}

const renderTable = function(products) {
    products.forEach(function(product) {
        document.querySelector("#table-body").appendChild(generateRow(product))
    })
}

renderTable(products)
```

Second, the reason for trying this: I used a constructor function to make each product instead of an object literal. 

```javascript
const Product = function (name, price, quantity) {
    this.name = name
    this.price = price
    this.quantity = quantity
}
```
This feels like a clearner approach, but I'm not sure I realize the benefits quite yet. 

```javascript
document.querySelector("#new-product").addEventListener("submit", function(e) {
    e.preventDefault()
    let name = e.target.elements.productName.value
    let price = e.target.elements.productPrice.value
    let quantity = e.target.elements.productQuantity.value
    const newProduct = new Product(name, price, quantity)
    products.push(newProduct)
    saveProducts(products)
    renderTable(products)
    e.target.elements.productName.value = ""
    e.target.elements.productPrice.value = ""
    e.target.elements.productQuantity.value = ""
})
```
I'm planning to wire up some event listeners to use the following methods. I'm interested to see how this changes things compared to the grocery app.

```javascript
Product.prototype.updatePrice = function(newPrice) {
    this.price = newPrice
}

Product.prototype.updateQuantity = function(newQuantity) {
    this.quantity = newQuantity
}
```

#### Git & GitHub

I also spent some time today learning about Git and GitHub. So far, I've only been using GitHub in the browser, but that does not feel sustainable. I know I'll need to get really comfortable with GitHub, so I'm trying to work it in now. 

Sources:
- [Git article](https://www.notion.so/Introduction-to-Git-ac396a0697704709a12b6a0e545db049)
- [Git video](https://youtu.be/USjZcfj8yxE)
- [GitHub article](https://www.notion.so/Introduction-to-GitHub-202af6f64bbd4299b15f238dcd09d2a7)
- [GitHub video](https://youtu.be/nhNq2kIvi9s)

### Key takeaways

- DOM manipulation is hard. I don't know what I don't know, so I'm not sure if some things are really as repetitive as they seem or if I'm just not hip to the best practices yet. 
- Git process: 

1. `git status`
2. `git add ...` filename or .
3. `git commit -m "message text...`
4. `git log`

### Tomorrow

Tomorrow I'm going to charge ahead on my Udemy course. I feel like I'm running the basics of OOP into the ground, and I need to keep moving.

### Journal

Right now, it's hard to balance learning and doing, partically because I feel like I either don't have ideas for things to build, or I don't have the toolset to apply what I know in really challenging ways. 

This coming weekend, I'll spend some time mapping our a curriculum so I don't spend another 4 days on 1 topic. Maybe I'll try to work in coding challenges as well. 

Otherwise, feeling good!

***

## Day 3:

### tl;dr
- Topic(s): Array methods, DOM manipulation, flow control
- Time: 45 minutes

### Today's Topic(s)

As predicted, I didn't have much time today. But after a two-day streak, I really wanted to keep the momentum going. 

Last night I started a shopping list app, and today I kept plugging away. Today, I added a second page, meant for editing an existing note, passed and parsed a hash to use on the second page, and added a button to return to the main page using `location.assign()`.

Here's the app in its current state:

![today demo](https://cdn.zappy.app/0ee908a52173afa5652af8c7c2d911ce.gif)

### Key takeaways

- When submitting a form, you can get the field values by using `e.target.elements.*nameofelement*.value`
- `.find()` returns an actual item while `.findIndex()` returns an index or -1.

### Tomorrow

Tomorrow I'm planning to get back to my Udemy course, working on OOP. I'd also like to add category radio buttons to the edit page of my grocery app.

### Journal

Today was definitely a test of my commitment. Without #100DaysOfCode I probably would have skipped today. What I appreciate about #100DaysOfCode is that you do what you can. I consider any amount of coding a win, and I found that, once I carved out a little time, I actually got more work in than expected. Excited to keep charging ahead!

***

## Day 2:

### tl;dr
- Topic(s): Digging into prototypal inheritance
- Time: 1 hour

### Today's Topic(s)

Yesterday, I felt like I had a solid grasp on using contructor functions to instantiate objects, but my understanding of prototypes and inheritance was lacking. Today, I dug into prototypal inheritance to make sure I fully understand what's going on.

My recap below is mostly recapping this awesome video from Jonas Schmedtmann:
- [JavaScript Prototypal Inheritance - Jonas Schmedtmann](https://youtu.be/3AKh0-PDsMw)

Some of this was covered yesterday, but I'm revisiting the topic through the lens of today's learnings. 

#### Prototype

Today I learned that `prototype` is actually a property on all objects. In other words, every Javascript object has a `prototype` property.

The `prototype` property is where we put the properties and methods that we want other objects to share. In this way, the `prototype` property is what makes inheritance possible.

For example, the `tony` object below is an instance of Object, so it is able to draw from Object's prototype property.

![simple Object instance](https://cdn.zappy.app/a21ed89e02060042d2f261fb0944f4e9.png)

#### Inheritance

Instances of an object inherit the object's prototype. 

For example, below, the `dave` object is able to use the `getAgeSummary()` method because it inherits the `Person` constructor's prototype.

```javascript
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
```

This is the "Prototype Chain" at work. From Jonas Schmedtmann:

![prototype chain](https://cdn.zappy.app/2a8905e5b9241fcd980066658d2a7bd5.png)

When we try to use a method, JS will first look for the method on the object itself. If it does not find the method, it will check the `prototype` property of the Constructor (parent). If it fails to find it there, it will check the `prototype` property of the highest order constructor. Failing to find it there (`null`), JS will return `undefined`.

I think the most important thing to take away here is: a Constructor's `prototype` property is not the prototype for the constructor itself. It is the prototype for instances that are created through the constructor.

For example, here, we see that dave's prototype and Person's prototype property reference the same object in memory:

![same thing](https://cdn.zappy.app/2c16169fd83d53d17c8db5354184324a.png)

#### Object.create()

We can also use `Object.create()` to set very specific inheritance. 

For example, here, without using a constructor...

```javascript
const mike = Object.create(Person.prototype, {
    name: {value: "Mike"},
    age: {value: 25},
    job: {value: "pilot"}
})

console.log(mike)
```

... we're telling JS that the `mike` object should inherit from Person's prototype.

![output](https://cdn.zappy.app/ae61839318f06afd518b185bd55fe47e.png)

Difference between `Object.create()` and using a Constructor function:

- `Object.create()`: Builds object that inherits directly from the one we pass into the first argument, allowing more specificity
- Constructor function: Newly-created object inherits from constructor's prototype property

### Key takeaways

- Every JS object has a `prototype` property, making inheritance possible
- The `prototype` property of a Constructor is NOT that constructor's prototype. It is the prototype of any instances that have been created from the Constructor
- Prototype chain: When calling a method, JS will check the object itself for the method, then look upward through each parent object.

### Tomorrow

I won't have much time tomorrow. I'm planning to chip away at a grocery shopping checklist app that I've set up. It's super close to a todo app that I worked on in my course, but I think this will be a helpful way to revisit array methods and stay fresh on DOM manipulation as I pass through this more theoretical phase of OOP, classes, etc.

### Journal
I'm starting to second-guess the Udemy course that I've been taking. While the project-based nature has made it feel like I'm making quick progress, I feel like I'm missing out on the depth of theory that I want/need. I can re-create what I've done in the cours, but I don't fully understand what I'm doing. In some ways, I know that's not always necessary, but I feel like I learn best when I understand the context. 

I'm debating on whether I should power through or switch courses. I'm leaning toward powering through and then trying a second course or supplementing with another course along the way. I'll iron this out as I work on a more concrete plan. 

I really appreciate Jonas Schmedtmann's teaching style, so I might give their course(s) a shot. 

***

## Day 1:

### tl;dr
- Topic(s): OOP, primitives, objects, constructors, prototypes
- Time: 1 hour

### Today's Topic(s)

Today I focused on object oriented programming in Javascript, primarily working from the following:
- [JavaScript OOP Crash Course (ES5 & ES6)](https://youtu.be/vDJpGenyHaA)(YouTube - Traversy Media)
- [Primitives vs Objects in Javascript](https://blog.mavenhive.in/primitives-vs-objects-in-javascript-1bd9fc0b8fcd) (Medium)

#### Primitives vs. Objects

I learned that `strings`, `numbers`, `booleans`, `undefined`, and `null` are are all *Primitives*.

For example, using the typeof operator on the simple string below reveals that it is a simple string:

```javascript
const stringOne = "Hello"
console.log(typeof stringOne)
// > string
```
However, we can use the String constructor to instantiate an object using a string:

```javascript
const stringTwo = new String("Hello")
console.log( typeof stringTwo)
// > object
```
Primitive data types are able to use object methods, like...

```javascript
stringOne.toLowerCase()
```
... because when the method is called, JS uses a constructor (like String() above) to instantiate.

#### Object Literals

I learned that the following syntax represents an "object literal" (i.e. is literally an object):
```javascript
const someMovie = {
    title: "Hot Rod",
    year: "2007",
    genre: "Comedy",
    getSummary: function () {
        return `The ${this.genre.toLowerCase()} ${this.title} was made in ${this.year}`
    }
}
```

#### Constructor Functions

We can use a constructor function to streamline the creation of multiple objects. A constructor functional basically sets a template that can be used to make multiple similar objects. This way, we don't have to create a ton of object literals that all share the same properties and methods. 

For example, the following constructor function lets us create instances of movies:

```javascript
function Movie (title, year, genre) {
    this.title = title
    this.year = year
    this.genre = genre
}
```
We *can* include methods within the constructor function, but it's my understanding that that is not a best practice because we end up with each instantiation, we end up with a new instance of the same method. This is fine for properties because those vary from instance to instance. 

#### Prototypes

To be honest, I'm a little unclear what prototypes are. I believe they're simply methods shared by instances of an object, but I need to parse this out. 

Like I mentioned above, we typically create the prototypes outside of the constructor function so that there's only one instance of the method (instead of one for each individual instance, which would be redundant). 

```javascript
Movie.prototype.getSummary = function () {
    return `The ${this.genre.toLowerCase()} ${this.title} was made in ${this.year}`
}

Movie.prototype.getAge = function () {
    const years = new Date().getFullYear() - this.year
    return `${this.title} is ${years} old`
}

Movie.prototype.criterion = function (trueOrFalse) {
    this.criterion = trueOrFalse
}
```

#### Instantiation

When we call the constructor function, we create an *instance* of the object.

For example, each time we call the Movie constructor, we're creating a new movie object with its own unique properties.

```javascript
const favMovie = new Movie("Hot Rod", "2007", "Comedy")
```

#### Inheritance

I need to dig into inheritance further, but to the extent I understand it, instances inherit the prototypes of their constructors. There's probably a more precise way of putting that. 

For example, in the following, the `goodMovie` object only has one property. We're able to use the `hasOwnProperty()` method on the name of the method itself because, JS first checks the goodMovie object itself for the method, and failing to find that, it checks the higher order `Object.prototype` where it successfully finds the method.

```javascript
const goodMovie = {
  title: "Cool Runnings"
 }

console.log(goodMovie.hasOwnProperty("title")) // true
console.log(goodMovie.hasOwnProperty("hasOwnProperty")) // false
```

We can take advantage of inheritance to make a second object that shares properties and prototypes with the first. 

For example, here, we create a TvShow object that draws from Movie

```javascript
function TvShow (title, year, genre, seasons) {
    Movie.call(this, title, year, genre)
    this.seasons = seasons
}

// To inherit prototypes of Movie - using Movie's constructor
tvShow.prototype = Object.create(Movie.prototype)

// Own constructor
tvShow.prototype.constructor = tvShow

const favShow = new tvShow("X-Files", "1993", "Sci-fi", "11")
console.log(favShow.getSummary())
```

And that's as far as I got!

### Key takeaways

- Literals vs. Primitives vs. Objects
- We create constructors for our own objects, but there are higher order constructors at work behind primitives
- Constructors and prototypes help avoid redundancy

### Tomorrow

I'm going to continue on with OOP, reading up on prototypes, finishing the Traversy Media video above, and revisiting my Udemy course now that I understand this stuff a bit better.

### Journal

I'm feeling pretty good! I'm kicking this off having already done some learning - but inconsistently - so I'm hoping this forces some regularity. I'm a little uneasy about the lack of an outline right now, but I'll find some time to map out a plan soon.

***

# Tools

### Screenshots

- [Zappy by Zapier](https://zapier.com/zappy)

### App Hosting

- [Glitch](https://glitch.com/)

### Sharing to Twitter

[Zapier](https://zapier.com/)
- [Use my Zap (actual)](https://zapier.com/shared/ce1ee3413c12c6c5cc8b8df7fe6a7662feca60f9)
- [Use my Zap (simple)](https://zapier.com/shared/cbe12a740d6834e452513ff4064d4bdd90eb5029)

***

# Resources

- [GitHub README/Markdown Formatting](https://docs.github.com/en/enterprise/2.20/user/github/writing-on-github/basic-writing-and-formatting-syntax#quoting-code)

