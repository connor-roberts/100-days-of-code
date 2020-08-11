
const getSavedProducts = function() {
    const productsJSON = localStorage.getItem("products")
    if (productsJSON !== null) {
        return JSON.parse(productsJSON)
    } else {
        return []
    }
}

const products = getSavedProducts()

const Product = function (name, price, quantity) {
    this.name = name
    this.price = price
    this.quantity = quantity
}

Product.prototype.updatePrice = function(newPrice) {
    this.price = newPrice
}

Product.prototype.updateQuantity = function(newQuantity) {
    this.quantity = newQuantity
}

const generateRow = function(product) {
    // Wrapper
    const newRow = document.createElement("tr")
    // Col_1
    const col1 = document.createElement("td")
    col1.textContent = product.name
    // Col_2
    const col2 = document.createElement("td")
    col2.textContent = product.price
    // Col_3
    const col3 = document.createElement("td")
    col3.textContent = product.quantity
    // Append
    newRow.appendChild(col1)
    newRow.appendChild(col2)
    newRow.appendChild(col3)
    return newRow
}

const renderTable = function(products) {
    products.forEach(function(product) {
        document.querySelector("#table-body").appendChild(generateRow(product))
    })
}

renderTable(products)

const saveProducts = function(products) {
    localStorage.setItem("products", JSON.stringify(products))
}

document.querySelector("#new-product").addEventListener("submit", function(e) {
    e.preventDefault()
    let name = e.target.elements.productName.value
    let price = e.target.elements.productPrice.value
    let quantity = e.target.elements.productQuantity.value
    const newProduct = new Product(name, price, quantity)
    products.push(newProduct)
    saveProducts(products)
    renderTable(products)
    e.target.elements.productName.value = ""
    e.target.elements.productPrice.value = ""
    e.target.elements.productQuantity.value = ""
})

