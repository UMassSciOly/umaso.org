let slideIndex = 0;
const slides = document.getElementsByClassName("slide");
const btn = document.getElementById("cta-btn");

const btnText = [
    // "Register",
    "Pre-Order Merch!",
    "Who We Are",
    "Follow Us on Insta!"
];

const btnHref = [
    // "/tournament/#registration",
    "/tournament/#merch",
    "/about",
    "https://www.instagram.com/umass.scioly/"
];

let lastSlideTime = 0;
const slideDelay = 600;
const slideTime = 5500;

function showSlide(n, initial = false) {
    if (n >= slides.length) {slideIndex = 0}
    if (n < 0) {slideIndex = slides.length-1}

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active", "previous", "initial");
    }

    if (slideIndex > 0) {
        slides[slideIndex - 1].classList.add("previous");
    } else {
        slides[slides.length - 1].classList.add("previous");
    }

    if (initial) {
        slides[slideIndex].classList.add("initial");
    } else {
        slides[slideIndex].classList.add("active");
    }

    if (!initial) {
        btn.style.opacity = '0';
    }
    
    setTimeout(() => {
        btn.textContent = btnText[slideIndex];
        btn.href = btnHref[slideIndex];
        btn.style.opacity = '1';
    }, 300);
}

let slideInterval;

function startSlideshow() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        slideIndex++;
        showSlide(slideIndex);
    }, slideTime);
}

function slideLeft() {
    const now = Date.now(); // there has to be a better way :skull:
    if (now - lastSlideTime >= slideDelay) {
        clearInterval(slideInterval);
        showSlide(slideIndex += 1);
        startSlideshow();
        lastSlideTime = now;
    }
}

function slideRight() {
    const now = Date.now();
    if (now - lastSlideTime >= slideDelay) {
        clearInterval(slideInterval);
        showSlide(slideIndex += -1);
        startSlideshow();
        lastSlideTime = now;
    }
}

showSlide(slideIndex, true);

// attempt to fix initial slide transition on firefox, edge
setTimeout(() => {
    slides[slideIndex].classList.remove("initial");
    slides[slideIndex].classList.add("active");
    startSlideshow();
}, 100);