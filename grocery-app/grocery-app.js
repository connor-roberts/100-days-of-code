const items = getSavedItems();

const filters = {
    searchText: "",
    hidePurchased: false,
}

renderItems(items, filters)

// Event Listener: Search box
document.querySelector("#search-items").addEventListener("input", function(e) {
    filters.searchText = e.target.value
    renderItems(items, filters)
})

// Event Listener: Hide purchased checkbox
document.querySelector("#hide-purchased").addEventListener("change", function(e) {
    filters.hidePurchased = e.target.checked
    renderItems(items, filters)
})

// Event Listener: Add Item button
document.querySelector("#create-item").addEventListener("submit", function(e) {
    e.preventDefault()
    const newItem = {
        id: uuidv4(),
        name: e.target.elements.newItemName.value,
        category: undefined,
        purchased: false
    }
    items.push(newItem)
    saveItems(items)
    renderItems(items, filters)
    e.target.elements.newItemName.value = ""
})
