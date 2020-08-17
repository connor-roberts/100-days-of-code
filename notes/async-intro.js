// HTTP

// Request - what we want to do
// Response - what was done

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

getPuzzle((error, puzzle) => {
    if (error) {
        console.log(`Error: ${error}`)
    } else {
        console.log(puzzle)
    }
})

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
