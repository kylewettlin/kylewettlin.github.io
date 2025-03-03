// scripts.js

// Hamburger menu toggle
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navbarLinks = document.querySelector('.navbar-links');

if (hamburgerMenu) {
  hamburgerMenu.addEventListener('click', function() {
    this.classList.toggle('change');
    navbarLinks.classList.toggle('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInside = hamburgerMenu.contains(event.target) || navbarLinks.contains(event.target);
    if (!isClickInside && navbarLinks.classList.contains('active')) {
      hamburgerMenu.classList.remove('change');
      navbarLinks.classList.remove('active');
    }
  });
}

// Carousel functionality
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

// Initialize the carousel if slides exist on the current page
if (slides.length > 0 && prevBtn && nextBtn) {
  showSlide(slideIndex);

  prevBtn.addEventListener("click", () => {
    slideIndex--;
    if (slideIndex < 0) {
      slideIndex = slides.length - 1;
    }
    showSlide(slideIndex);
  });

  nextBtn.addEventListener("click", () => {
    slideIndex++;
    if (slideIndex > slides.length - 1) {
      slideIndex = 0;
    }
    showSlide(slideIndex);
  });

  // Optional auto-advance every 5 seconds
  setInterval(() => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
  }, 5000);
}

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
    }
  });
}
