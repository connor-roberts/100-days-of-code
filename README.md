# 100 Days of Code

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

When we try to use a method, JS will first look for the method on the object itself. If it does not find the method, it will check the `prototype` property of the Constructor (parent). If it fails to find it there, it will check the `prototype` property of the highest order constructor. Failing to find it there (`null`), JS will return `undefiled`.

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

- [Zapier - Use my Zap!](https://zapier.com/shared/cbe12a740d6834e452513ff4064d4bdd90eb5029)

***

# Resources

- [GitHub README/Markdown Formatting](https://docs.github.com/en/enterprise/2.20/user/github/writing-on-github/basic-writing-and-formatting-syntax#quoting-code)

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
```javascript
const test = function () {
  console.log("eh?")
}
```
-->
