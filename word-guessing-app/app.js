
const gameWord = new WordGuesser("Dog food", 2)

renderWord(gameWord)
renderGuessesLeft(gameWord)

window.addEventListener("keypress", function (e) {
    const guess = String.fromCharCode(e.charCode)
    gameWord.makeGuess(guess)
    renderWord(gameWord)
    renderGuessesLeft(gameWord)
    console.log(gameWord.status)
})