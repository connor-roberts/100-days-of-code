
const gameWord = new Hangman("Fish food", 4)

renderWord(gameWord)
renderGuessesLeft(gameWord)

console.log(gameWord.getPuzzle())

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
