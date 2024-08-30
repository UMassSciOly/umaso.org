let slideIndex = 0;
const slides = document.getElementsByClassName("slide");
const learnButton = document.getElementById("learn-more");
const learnButtonHrefs = [
    "#test1",
    "#test2",
    "#test3"
];

function showSlide(n) {
    if (n >= slides.length) {slideIndex = 0}
    if (n < 0) {slideIndex = slides.length-1}

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active", "previous");
    }

    if (slideIndex > 0) {
        slides[slideIndex - 1].classList.add("previous");
    } else {
        slides[slides.length - 1].classList.add("previous");
    }

    slides[slideIndex].classList.add("active");

    learnButton.href = learnButtonHrefs[slideIndex];
}

function startSlideshow() {
    slideInterval = setInterval(function () {
        slideIndex++;
        showSlide(slideIndex);
    }, 3000);
}

showSlide(slideIndex);
startSlideshow();