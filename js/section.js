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

function fillPage(searchRes) {
    var blockField = document.querySelector(".blocksWrapper")
    var sectionName = searchRes.split("=")[1]

    var header = document.querySelector(".main_text")
    header.innerHTML = sectionName

    fetch("../serverData.json")
    .then(response => response.json())
    .then(function(jsonRes) {
        var blockCounter = 0;
        for (let i = 0; i < jsonRes.length; i++) {
            if (jsonRes[i]["section"] == sectionName) {
                var block = document.createElement("div")
                block.classList.add("main_block")
                block.innerHTML = `<a href="goodCard.html?id=${jsonRes[i]["id"]}"><img src="../goodsImg/${jsonRes[i]["id"]}.jpg" style="width: 200px;"></a>
                                    <a href="goodCard.html?id=${jsonRes[i]["id"]}">${jsonRes[i]["name"]}</a>
                                    <a href="goodCard.html?id=${jsonRes[i]["id"]}">${jsonRes[i]["cost"]} ₽</a>`
                var cartBTN = document.createElement("div")
                cartBTN.innerHTML = "В КОРЗИНУ"
                cartBTN.addEventListener("click", function() {addToCart(jsonRes[i]["id"])})
                block.append(cartBTN)

                blockField.append(block)
                blockCounter++
            }
        }

        if (blockCounter == "") {
            blockField.innerHTML = "Товар отсутствует"
        }
    })
}

function onLoad() {
    fillPage(decodeURI(location.search))
}

window.addEventListener("load", onLoad);