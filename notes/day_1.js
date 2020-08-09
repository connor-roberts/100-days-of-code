// Primitives vs. Objects
// strings, numbers, booleans, undefined, null

const stringOne = "Hello"
console.log(typeof stringOne)
// > string

const stringTwo = new String("Hello")
console.log( typeof stringTwo)
// > object

// Primitive data types - like strings, numbers, and booleans - can use object methods because, when the method is called, JS basically instantiates an object

// Object literal

const someMovie = {
    title: "Hot Rod",
    year: "2007",
    genre: "Comedy",
    getSummary: function () {
        return `The ${this.genre.toLowerCase()} ${this.title} was made in ${this.year}`
    }
}

// Constructor function - saves us having to write a literal for every object

function Movie (title, year, genre) {
    this.title = title
    this.year = year
    this.genre = genre
    // Could add methods here, but this would be redundant
}

// Prototype method
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

// Instantiation
const favMovie = new Movie("Hot Rod", "2007", "Comedy")

favMovie.criterion(true)

console.log(favMovie)

// INHERITANCE

function TvShow (title, year, genre, seasons) {
    Movie.call(this, title, year, genre)
    this.seasons = seasons
}

// To inherit prototypes of Movie - using Movie's constructor
TvShow.prototype = Object.create(Movie.prototype)

// Own constructor
TvShow.prototype.constructor = TvShow

const favShow = new TvShow("X-Files", "1993", "Sci-fi", "11")
console.log(favShow.getSummary())
