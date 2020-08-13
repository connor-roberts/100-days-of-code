
const gameWord = new Hangman("Dog", 2)

renderWord(gameWord)
renderGuessesLeft(gameWord)
console.log

window.addEventListener("keypress", function (e) {
    const guess = String.fromCharCode(e.charCode)
    gameWord.makeGuess(guess)
    renderWord(gameWord)
    renderGuessesLeft(gameWord)
    console.log(gameWord.status)
})
