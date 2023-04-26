const slider = document.querySelector(".slider");
const prevButton = document.querySelector(".slider-prev");
const nextButton = document.querySelector(".slider-next");
const slideWidth = slider.clientWidth / 3;
let currentSlide = 1;

function goToSlide(n) {
  currentSlide = (n + 3) % 3;
  slider.style.left = -currentSlide * slideWidth + "px";
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function prevSlide() {
  goToSlide(currentSlide - 1);
}

nextButton.addEventListener("click", nextSlide);
prevButton.addEventListener("click", prevSlide);