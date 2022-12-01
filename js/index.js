var sliderOffset = 0;

function sliderMoveLeft(slide) {
    sliderOffset -= 100;
    sliderOffset = sliderOffset <= -200 ? -200 : sliderOffset;
    slide.setAttribute("style", `margin-left: ${sliderOffset}%`)
}

function sliderMoveRight(slide) {
    sliderOffset += 100;
    sliderOffset = sliderOffset >= 0 ? 0 : sliderOffset;
    slide.setAttribute("style", `margin-left: ${sliderOffset}%`)
}

function slider() {
    var leftBTN = document.querySelector(".mainSliderNSlogan_slider_arrowLeft")
    var rightBTN = document.querySelector(".mainSliderNSlogan_slider_arrowRight")
    var slide = document.querySelector(".slide")

    leftBTN.addEventListener("click", function() {sliderMoveRight(slide)})
    rightBTN.addEventListener("click", function() {sliderMoveLeft(slide)})
}

function onLoad() {
    slider()
}

window.addEventListener("load", onLoad);