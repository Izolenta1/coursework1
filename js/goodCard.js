function fillCard(searchRes) {
    var goodId = searchRes.split("=")[1]

    fetch("../serverData.json")
    .then(response => response.json())
    .then(function(jsonRes) {
        var header = document.getElementById("header")
        var picture = document.getElementById("picture")
        var cost = document.getElementById("cost")
        var onStore = document.getElementById("onStore")
        var description = document.getElementById("description")
        var country = document.getElementById("country")
        var age = document.getElementById("age")
        var cartBTN = document.getElementById("cartBTN")

        for (let i = 0; i < jsonRes.length; i++) {
            if (jsonRes[i]["id"] == Number(goodId)) {
                header.innerHTML = jsonRes[i]["name"]
                picture.innerHTML = `<img src="../goodsImg/${jsonRes[i]["id"]}.jpg" style="width: 600px;">`
                cost.innerHTML = jsonRes[i]["cost"] + " руб."
                onStore.innerHTML = jsonRes[i]["onStore"] == true ? "Товар есть в наличии" : "Товара нет в наличии"
                description.innerHTML = jsonRes[i]["description"]
                country.innerHTML = "Страна изготовитель: " + jsonRes[i]["country"]
                age.innerHTML = "Рекомендуемый возраст: " + jsonRes[i]["age"] + " лет"
                cartBTN.addEventListener("click", function() {addToCart(Number(jsonRes[i]["id"]))})
            }
        }
    })
}

function addToCart(id) {
    if (localStorage.getItem('cart') != null) {
        var savedMas = JSON.parse(localStorage.getItem("cart"))
        savedMas.push(id)
        localStorage.setItem("cart", JSON.stringify(savedMas))
    }
    else {
        var mas = []
        mas.push(id)
        localStorage.setItem("cart", JSON.stringify(mas))
    }
    updateCartIcon()
}

function onLoad() {
    fillCard(location.search)
}

window.addEventListener("load", onLoad);