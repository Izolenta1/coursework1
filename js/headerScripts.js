function searchEngine(goodText) {
    var searchField = document.querySelector(".headerMiddle_searchDiv_searchField");
    searchField.innerHTML = "";

    if (goodText == "") {
        return
    }

    fetch("../serverData.json")
    .then(response => response.json())
    .then(function(jsonRes) {
        var resultMas = [];
        for (let i = 0; i < jsonRes.length; i++) {
            if (jsonRes[i]["name"].includes(goodText)) {
                resultMas.push(jsonRes[i])
            }
        }
        
        var str = "";
        for (let i = 0; i < resultMas.length; i++) {
            str += `<a class="headerMiddle_searchDiv_searchField_cell" href="goodCard.html?id=${resultMas[i]["id"]}">
                            <div>
                                <img src="../goodsImg/${resultMas[i]["id"]}.jpg" class="headerMiddle_searchDiv_searchField_cellImg headerMiddle_searchDiv_searchField_cellImgAdaptation">
                            </div>
                            <span>${resultMas[i]["name"]}</span>
                        </a>`
        }
        searchField.innerHTML = str;
    })
}

function search() {
    var searchObj = document.querySelector(".headerMiddle_searchDiv_search");
    searchObj.addEventListener("input", function() {searchEngine(searchObj.value)})
}

function catalogPosition() {
    var catalogElem = document.querySelector(".navElem1")
    var dropdownField = document.querySelector(".headerBottom_dropDownField")

    dropdownField.setAttribute("style", `top:${catalogElem.clientHeight}px`)
}

function catalogOn(elem) {
    elem.setAttribute("style", "display: flex")
    elem.parentNode.setAttribute("style", "display: flex")
}

function catalogOff(elem) {
    elem.setAttribute("style", "display: none")
    elem.parentNode.setAttribute("style", "display: none")
}

function catalog() {
    var leftElemMas = document.querySelectorAll(".navElem1LeftBlock_elem")
    var rightElemMas = document.querySelectorAll(".navElem1RightBlock_elem")

    for (let i = 0; i < leftElemMas.length; i++) {
        leftElemMas[i].addEventListener("mouseover", function() {catalogOn(rightElemMas[i])})
        leftElemMas[i].addEventListener("mouseout", function() {catalogOff(rightElemMas[i])})
    }

    for (let i = 0; i < rightElemMas.length; i++) {
        rightElemMas[i].addEventListener("mouseover", function() {catalogOn(rightElemMas[i])})
        rightElemMas[i].addEventListener("mouseout", function() {catalogOff(rightElemMas[i])})
    }
    catalogPosition()
}

function updateCartIcon() {
    var cartCount = document.getElementById("cartCount")
    var cartCost = document.getElementById("cartCost")

    if (localStorage.getItem('cart') != null) {
        var savedMas = JSON.parse(localStorage.getItem("cart"))
        cartCount.innerHTML = `Товары: ${savedMas.length}`
    }
    else {
        cartCount.innerHTML = `Товары: 0`
    }

    var newCartCost = 0;
    fetch("../serverData.json")
    .then(response => response.json())
    .then(function(jsonRes) {
        var savedMas = JSON.parse(localStorage.getItem("cart"))
        if (savedMas != null) {
            for (let i = 0; i < savedMas.length; i++) {
                for (let j = 0; j < jsonRes.length; j++) {
                    if (savedMas[i] == jsonRes[j]["id"]) {
                        newCartCost += jsonRes[j]["cost"]
                    }
                }
            }
        }
        cartCost.innerHTML = `${newCartCost} руб.`
    })
}

function leftMenuOn() {
    var leftMenuField = document.querySelector(".leftMenuField")
    leftMenuField.style.marginLeft = "0px"
}

function leftMenuOff() {
    var leftMenuField = document.querySelector(".leftMenuField")
    leftMenuField.style.marginLeft = "-300px"
}

function leftMenu() {
    var closeMenuBTN = document.querySelector(".closeLeftMenuBTN")
    var openMenuBTN = document.querySelector(".navElem5")

    closeMenuBTN.addEventListener("click", leftMenuOff)
    openMenuBTN.addEventListener("click", leftMenuOn)
}

// function leftMenu_menuBTNOn(field) {
//     field.style.display = "flex"
// }

// function leftMenu_menuBTNOff(field) {
    
// }

// function leftMenu_menuBTNs() {
//     var leftMenuBTNMas = document.querySelector(".leftMenuBTN")
//     var leftMenuBTNFieldMas = document.querySelector(".leftMenuBTNField")

//     for (let i = 0; i < leftMenuBTNMas.length; i++) {
//         leftMenuBTNMas[i].addEventListener("click", function() {leftMenu_menuBTNOn(leftMenuBTNFieldMas[i])})
//     }
// }

function onLoad() {
    search()
    catalog()
    updateCartIcon()
    leftMenu()
    // leftMenu_menuBTNs()
}

window.addEventListener("load", onLoad);
window.addEventListener("resize", catalogPosition)