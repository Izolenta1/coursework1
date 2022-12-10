var sliderOffset = 0;

function sliderMoveLeft(slide) {
    sliderOffset -= 100;
    sliderOffset = sliderOffset <= -200 ? -200 : sliderOffset;
    // slide.setAttribute("style", `margin-left: ${sliderOffset}%`)
    slide.style.marginLeft = `${sliderOffset}%`
}

function sliderMoveRight(slide) {
    sliderOffset += 100;
    sliderOffset = sliderOffset >= 0 ? 0 : sliderOffset;
    // slide.setAttribute("style", `margin-left: ${sliderOffset}%`)
    slide.style.marginLeft = `${sliderOffset}%`
}

function slider() {
    var leftBTN = document.querySelector(".mainSliderNSlogan_slider_arrowLeft")
    var rightBTN = document.querySelector(".mainSliderNSlogan_slider_arrowRight")
    var slide = document.querySelector(".slide")

    leftBTN.addEventListener("click", function() {sliderMoveRight(slide)})
    rightBTN.addEventListener("click", function() {sliderMoveLeft(slide)})
}

function slideAdaptation() {
    var slidesMas = document.querySelectorAll(".slide")
    var slider = document.querySelector(".mainSliderNSlogan_slider")

    for (let i = 0; i < slidesMas.length; i++) {
        slidesMas[i].style.width = slider.clientWidth + "px"
        slidesMas[i].style.height = slider.clientWidth / 2.3264 + "px"
    }
}

function onLoad() {
    slider()
    slideAdaptation()
}

window.addEventListener("load", onLoad);
window.addEventListener("resize", slideAdaptation)