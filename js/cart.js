function fillCart() {
    var cartField = document.querySelector(".cartField")
    var totalCost = document.getElementById("totalCost")

    fetch("../serverData.json")
    .then(response => response.json())
    .then(function(jsonRes) {
        var savedMas = JSON.parse(localStorage.getItem("cart"))
        var newTotalCost = 0;
        if (savedMas != null) {
            for (let i = 0; i < savedMas.length; i++) {
                for (let j = 0; j < jsonRes.length; j++) {
                    if (savedMas[i] == jsonRes[j]["id"]) {
                        newTotalCost += jsonRes[j]["cost"]

                        let block = document.createElement("div")
                        block.innerHTML += `<img src="../goodsImg/${jsonRes[j]["id"]}.jpg" style="width: 200px;">`
                        var innerBlock = document.createElement("div")
                        innerBlock.innerHTML += `<span>${jsonRes[j]["name"]}</span>`
                        var delBTN = document.createElement("div")
                        delBTN.innerHTML = "Удалить из корзины"
                        delBTN.classList.add("testclass")
                        delBTN.addEventListener("click", function() {deleteFromCart(block, jsonRes[j]["id"])})
                        innerBlock.append(delBTN)
                        block.append(innerBlock)
                        var spanElem = document.createElement("span")
                        spanElem.innerHTML = `<span>${jsonRes[j]["cost"]} ₽</span>`
                        block.append(spanElem)
                        cartField.append(block)
                    }
                }
            }
        }
        totalCost.innerHTML = `Всего к оплате: ${newTotalCost} ₽`
    })
}

function updateTotalCost() {
    var totalCost = document.getElementById("totalCost")

    fetch("../serverData.json")
    .then(response => response.json())
    .then(function(jsonRes) {
        var savedMas = JSON.parse(localStorage.getItem("cart"))
        var newTotalCost = 0;
        if (savedMas != null) {
            for (let i = 0; i < savedMas.length; i++) {
                for (let j = 0; j < jsonRes.length; j++) {
                    if (savedMas[i] == jsonRes[j]["id"]) {
                        newTotalCost += jsonRes[j]["cost"]
                    }
                }
            }
        }
        totalCost.innerHTML = `Всего к оплате: ${newTotalCost} ₽`
    })
}


function deleteFromCart(elem, id) {
    elem.remove()

    var savedMas = JSON.parse(localStorage.getItem("cart"))
    var index = savedMas.indexOf(id)
    savedMas.splice(index, 1)
    localStorage.setItem("cart", JSON.stringify(savedMas))
    updateCartIcon()
    updateTotalCost()
}

function onLoad() {
    fillCart()
}

window.addEventListener("load", onLoad);