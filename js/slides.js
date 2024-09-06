let slideIndex = 0;
const slides = document.getElementsByClassName("slide");
const btn = document.getElementById("cta-btn")

const btnText = [
    "Register",
    "text2",
    "text3"
]

const btnHref = [
    "#test1",
    "#test2",
    "#test3"
]

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
    btn.style.opacity = '0';
    setTimeout(() => {
        btn.textContent = btnText[slideIndex];
        btn.href = btnHref[slideIndex];
        btn.style.opacity = '1';
    }, 300);
}

function startSlideshow() {
    slideInterval = setInterval(() => {
        slideIndex++;
        showSlide(slideIndex);
    }, 3000);
}

function slideLeft() {
    clearInterval(slideInterval);
    showSlide(slideIndex += 1);
    startSlideshow();
}

function slideRight() {
    clearInterval(slideInterval);
    showSlide(slideIndex += -1);
    startSlideshow();
}

showSlide(slideIndex);
startSlideshow();