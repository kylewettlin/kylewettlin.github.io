// scripts.js

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
