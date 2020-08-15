class WordGuesser {
    constructor(word, guesses) {
        this.word = word.toLowerCase().split("")
        this.remainingGuesses = guesses
        this.guessedLetters = []
        this.status = "playing"
    }
    get puzzle() {
        let puzzle = ""
        this.word.forEach((letter) => {
            if (this.guessedLetters.includes(letter) || letter === " ") {
                puzzle += letter
            } else {
                puzzle += "*"
            }
        })
        return puzzle
    }
    calculateStatus() {
        const finished = this.word.every((letter) => {
            return this.guessedLetters.includes(letter) || letter === " "
        })
        if (this.remainingGuesses === 0) {
            this.status = "failed"
        } else if (finished) {
            this.status = "finished"
        } else {
            this.status  = "playing"
        }
    }
    makeGuess(guess) {
        guess = guess.toLowerCase()
        const isUniqueGuess = !this.guessedLetters.includes(guess)
        const guessNotInWord = !this.word.includes(guess)
        
        if (this.status !== "playing") {
            return
        }
        if (isUniqueGuess) {
            this.guessedLetters.push(guess)
        }
        if (isUniqueGuess && guessNotInWord) {
            this.remainingGuesses--
        }
        this.calculateStatus()
    }
    get statusMessage() {
        if (this.status === "playing") {
            return `Guesses left: ${this.remainingGuesses}`
        } else if (this.status === "finished") {
            return "WINNER!"
        } else {
            return `GAME OVER (the word was "${this.word.join("")}")`
        }
    }
}

// Functions

const renderWord = function (word) {
    const gameSpace = document.querySelector("#game-space")
    const wordText = document.createElement("h2")
    gameSpace.innerHTML = ""
    wordText.textContent = word.puzzle
    gameSpace.appendChild(wordText)
}

const renderGuessesLeft = function (word) {
    const guessesLeft = document.querySelector("#guesses-left")
    const summaryText = document.createElement("p")
    guessesLeft.innerHTML = ""
    summaryText.textContent = word.statusMessage
    guessesLeft.appendChild(summaryText)
}
