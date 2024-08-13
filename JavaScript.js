const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const thumbnails = document.querySelectorAll('.thumbnails img');

let currentIndex = 0;
let autoSlideInterval;

// Function to show the selected slide
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        thumbnails[i].classList.remove('active');
    });
    slides[index].classList.add('active'); // Show the selected slide
    thumbnails[index].classList.add('active'); // Highlight the active thumbnail
    currentIndex = index;
}

// Function to move to the next slide
function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

// Function to move to the previous slide
function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
}

// Event listeners for navigation buttons
prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// Thumbnail navigation
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        const index = parseInt(thumbnail.dataset.index);
        showSlide(index);
    });
});

// Auto-slide with pause on hover
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000); // Slide every 3 seconds
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

document.querySelector('.slider-container').addEventListener('mouseover', stopAutoSlide);
document.querySelector('.slider-container').addEventListener('mouseout', startAutoSlide);

// Initialize auto-slide and first slide
showSlide(currentIndex);
startAutoSlide();

// Swipe gesture support for mobile
let startX = 0;

document.querySelector('.slider').addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

document.querySelector('.slider').addEventListener('touchmove', (e) => {
    const touchX = e.touches[0].clientX;
    if (startX - touchX > 50) {
        nextSlide();
    } else if (touchX - startX > 50) {
        prevSlide();
    }
});
