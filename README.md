# 100 Days of Code

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
