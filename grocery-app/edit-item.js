const itemID = location.hash.substring(1)

const items = getSavedItems()

const editItem = items.find(function(item) {
    return item.id === itemID
}) 

const nameField = document.querySelector("#item-name")
const doneButton = document.querySelector("#done")

nameField.value = editItem.name

nameField.addEventListener("input", function(e) {
    editItem.name = e.target.value
    saveItems(items)
})

doneButton.addEventListener("click", function(e) {
    location.assign("index.html")
})

