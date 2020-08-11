const getSavedItems = function() {
    const itemsJSON = localStorage.getItem("items")
    if (itemsJSON !== null) {
        return JSON.parse(itemsJSON)
    } else {
        return []
    }
}

const saveItems = function (items) {
    localStorage.setItem("items", JSON.stringify(items))
}

const removeItem = function (id) {
    const index = items.findIndex(function(item) {
        return item.id === id
    })
    items.splice(index, 1)
}

const generateItem = function(item) {
    // Div
    const itemWrapper = document.createElement("div")
    // Checkbox
    const itemCheckbox = document.createElement("input")
    itemCheckbox.setAttribute("type", "checkbox")
    itemCheckbox.checked = item.purchased
    itemWrapper.appendChild(itemCheckbox)
    itemCheckbox.addEventListener("change", function(e) {
        item.purchased = !item.purchased
        saveItems(items)
        renderItems(items, filters)
    })
    // Text
    const newItem = document.createElement("a")
    newItem.setAttribute("href", `edit.html#${item.id}`)
    newItem.textContent = item.name
    itemWrapper.appendChild(newItem)
    // Button
    const removeButton = document.createElement("button")
    removeButton.textContent = "x"
    itemWrapper.appendChild(removeButton)
    removeButton.addEventListener("click", function(e) {
        removeItem(item.id)
        saveItems(items)
        renderItems(items, filters)
    })
    return itemWrapper
}

const renderItems = function(items, filters) {
    // Filter
    const filteredItems = items.filter(function(item) {
        const searchMatch = item.name.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideMatch = !filters.hidePurchased || !item.purchased
        return searchMatch && hideMatch
    })
    // Clear div
    document.querySelector("#items").innerHTML = ""
    // Add items
    filteredItems.forEach(function (item) {
        document.querySelector("#items").appendChild(generateItem(item))
    })
}
