console.log("carousel-js")

const carouselTrack = document.querySelector('#carousel-track')
const slides = Array.from(carouselTrack.children)

const prevBtn = document.querySelector('#previous-button')
const nextBtn = document.querySelector('#next-button')

const carouselDots = document.querySelector('#carousel-dots')
const dots = Array.from(carouselDots.children)

// get the width of slide
const slideWidth = slides[0].getBoundingClientRect().width


// arranging slides next to one another
slides.forEach((slide,index) => {
    slide.style.left = `${slideWidth*index}px`
})

const moveToSlide = (currentSlide,targetSlide) => {
    const amountToMove = targetSlide.style.left;

    carouselTrack.style.transform = 'translateX(-'+amountToMove+')'

    currentSlide.classList.remove("current-slide")
    targetSlide.classList.add("current-slide")
}

const updateDotsNavigator = (currentDot,targetDot) => {
    currentDot.classList.remove("current-slide")
    targetDot.classList.add("current-slide")
}

const showOrHideArrowButton = (targetIndex) => {
    if(targetIndex === 0) {
        prevBtn.classList.add("is-hidden")
        nextBtn.classList.remove("is-hidden")
    } else if(targetIndex === slides.length -1) {
        prevBtn.classList.remove("is-hidden")
        nextBtn.classList.add("is-hidden")
    } else {
        prevBtn.classList.remove("is-hidden")
        nextBtn.classList.remove("is-hidden")
    }
}

// when I click the next button, move slide to the right
nextBtn.addEventListener('click',() => {
    const currentSlide = carouselTrack.querySelector('.current-slide')
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = carouselDots.querySelector(".current-slide")
    const nextDot = currentDot.nextElementSibling

    const nextSlideIndex = slides.findIndex(slide => slide === nextSlide)

    moveToSlide(currentSlide,nextSlide)
    updateDotsNavigator(currentDot,nextDot)
    showOrHideArrowButton(nextSlideIndex)
})

// when I click the previous button, move slide to the left
prevBtn.addEventListener('click',() => {
    const currentSlide = carouselTrack.querySelector('.current-slide')
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = carouselDots.querySelector(".current-slide")
    const nextDot = currentDot.previousElementSibling

    const prevSlideIndex = slides.findIndex(slide => slide === prevSlide)

    moveToSlide(currentSlide,prevSlide)
    updateDotsNavigator(currentDot,nextDot)
    showOrHideArrowButton(prevSlideIndex)
})

// click on the dots navigator
carouselDots.addEventListener('click',(e) => {
    const targetDot = e.target.closest('button')
    if(!targetDot) {
        return;
    }
    const currentSlide = carouselTrack.querySelector('.current-slide')
    const currentDot = carouselDots.querySelector(".current-slide")
    const targetDotIndex = dots.findIndex(dot => dot === targetDot)
    const targetSlide = slides[targetDotIndex]
    moveToSlide(currentSlide,targetSlide)
    updateDotsNavigator(currentDot,targetDot)
    showOrHideArrowButton(targetDotIndex)
})