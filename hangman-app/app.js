const Hangman = function (word, guesses) {
    this.word = word.toLowerCase().split("")
    this.remainingGuesses = guesses
    this.guessedLetters = []
}

Hangman.prototype.getPuzzle = function () {
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

Hangman.prototype.makeGuess = function (guess) {
    guess = guess.toLowerCase()
    const isUniqueGuess = !this.guessedLetters.includes(guess)
    const guessNotInWord = !this.word.includes(guess)
    if (isUniqueGuess) {
        this.guessedLetters.push(guess)
    }
    if (isUniqueGuess && guessNotInWord) {
        this.remainingGuesses--
    }
}

const renderWord = function (word) {
    const gameSpace = document.querySelector("#game-space")
    const wordText = document.createElement("h2")
    gameSpace.innerHTML = ""
    wordText.textContent = word.getPuzzle()
    gameSpace.appendChild(wordText)
}

const renderGuessesLeft = function (word) {
    const guessesLeft = document.querySelector("#guesses-left")
    const summaryText = document.createElement("p")
    guessesLeft.innerHTML = ""
    summaryText.textContent = `Guesses left: ${word.remainingGuesses}`
    guessesLeft.appendChild(summaryText)
}

const renderGameOver = function () {
    const gameSpace = document.querySelector("#game-space")
    const wordText = document.createElement("h2")
    gameSpace.innerHTML = ""
    wordText.textContent = "GAME OVER"
    gameSpace.appendChild(wordText)
}
