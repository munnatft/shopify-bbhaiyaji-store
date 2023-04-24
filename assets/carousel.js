$(document).ready(function() {
    const totalListLength = $(".carousel__slide").length
    $("#previous-button").on("click",function(){
        const listItem = $("#carousel-track .current-slide")
        const currentIndex = $(".carousel__slide").index(listItem)
        const currentDot = $("#carousel-dots .current-slide")
        showOrHideBtn(currentIndex-1,totalListLength)
        if(currentIndex > 0) {
            $("#carousel-track").css("transform", `translateX(-${(currentIndex-1)*100}%)`)
            updateListElement(listItem,listItem.prev())
            updateDotNavigator(currentDot, currentDot.prev())
        }
    })
    $("#next-button").on("click",function(){
        const listItem = $("#carousel-track .current-slide")
        const currentIndex = $(".carousel__slide").index(listItem)
        const currentDot = $("#carousel-dots .current-slide")
        showOrHideBtn(currentIndex+1,totalListLength)
        if(currentIndex < totalListLength-1) {
            $("#carousel-track").css("transform", `translateX(-${(currentIndex+1)*100}%)`)
            updateListElement(listItem,listItem.next())
            updateDotNavigator(currentDot, currentDot.next())
        }
    })
    $("#carousel-dots").on("click",function(e) {
        const targetDotElement = $(e.target)
        const activeDotElement = $("#carousel-dots .current-slide")
        const targetDotIndex = $(".dot__navigator").index(e.target)
        const currentlistElement = $("#carousel-track .current-slide")
        const targetListElement = $(".carousel__slide").eq(targetDotIndex)
        $("#carousel-track").css("transform", `translateX(-${(targetDotIndex)*100}%)`)
        updateListElement(currentlistElement,targetListElement)
        updateDotNavigator(activeDotElement,targetDotElement)
        showOrHideBtn(targetDotIndex,totalListLength)
    })
})

const showOrHideBtn = (targetIndex, totalListLength) => {
    if(targetIndex === 0) {
        $("#previous-button").addClass("is-hidden")
        $("#next-button").removeClass("is-hidden")
        return;
    }
    if(targetIndex === totalListLength-1) {
        $("#previous-button").removeClass("is-hidden")
        $("#next-button").addClass("is-hidden")
        return;
    }
    $("#previous-button").removeClass("is-hidden")
    $("#next-button").removeClass("is-hidden")
}

const updateListElement = (currentListElement, targetListElement) => {
    currentListElement.removeClass("current-slide")
    targetListElement.addClass("current-slide")
}

const updateDotNavigator = (currentDotElement, targetDotElement) => {
    currentDotElement.removeClass("current-slide")
    targetDotElement.addClass("current-slide")
}