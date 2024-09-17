const sliderImages = document.querySelectorAll('.slider-image');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;
const totalImages = sliderImages.length;

function showImage(index) {
    const offset = -index * 100;
    document.querySelector('.image-slider').style.transform = `translateX(${offset}%)`;
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % totalImages;
    showImage(currentIndex);
}

function showPrevImage() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    showImage(currentIndex);
}

nextBtn.addEventListener('click', showNextImage);
prevBtn.addEventListener('click', showPrevImage);

// Auto-slideshow
let autoSlide = setInterval(showNextImage, 3000);

// Stop the slideshow when the user interacts with the buttons
nextBtn.addEventListener('mouseover', () => clearInterval(autoSlide));
prevBtn.addEventListener('mouseover', () => clearInterval(autoSlide));
