const sliderWrapper = document.querySelector('.slider-wrapper');
const sliderSlides = document.querySelectorAll('.slider-slide');
const prevButton = document.querySelector('.slider-prev');
const nextButton = document.querySelector('.slider-next');
let slideIndex = 0;

function showSlide() {
  if (slideIndex < 0) {
    slideIndex = sliderSlides.length - 1;
  } else if (slideIndex >= sliderSlides.length) {
    slideIndex = 0;
  }
  sliderWrapper.style.transform = `translateX(-${slideIndex * 40}vw)`;
}

prevButton.addEventListener('click', () => {
  slideIndex--;
  showSlide();
});

nextButton.addEventListener('click', () => {
  slideIndex++;
  showSlide();
});