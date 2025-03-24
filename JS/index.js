let currentIndex = 0;
let totalSlides = 17; // This is your total number of titles

const updateActiveSlide = () => {
  document.querySelectorAll(".title").forEach((el, index) => {
    el.classList.toggle("active", index === currentIndex);
  });
};

const updateNumberDisplay = () => {
  const numberContainer = document.querySelector(".number-container");

  // Remove the old number element if it exists
  const oldNumberElement = document.querySelector(".number");
  if (oldNumberElement) {
    oldNumberElement.remove();
  }

  // Create a new number element (this will be animated)
  const newNumber = String(currentIndex + 1).padStart(2, "0"); // Format the number
  const newNumberElement = document.createElement("div");
  newNumberElement.classList.add("number");
  newNumberElement.textContent = newNumber;

  // Add the new number to the container
  numberContainer.appendChild(newNumberElement);

  // Animate the new number element
  gsap.fromTo(
    newNumberElement,
    {
      opacity: 0,
      y: -50, // Start from above
    },
    {
      opacity: 1,
      y: 0, // End at its original position
      duration: 2, // Duration of the animation
      ease: "power4.out",
    }
  );
};

const handleSlider = () => {
  currentIndex = (currentIndex + 1) % totalSlides;

  const slideWidth = window.innerWidth; // Get the current viewport width
  const slideMoveDistance = slideWidth * currentIndex; // Move based on the currentIndex

  gsap.to(".slide-titles", {
    onStart: () => {
      setTimeout(() => {
        updateActiveSlide();
      }, 100);

      updateImages(currentIndex + 1);
      updateNumberDisplay(); // Update the number with sliding effect
    },
    x: -slideMoveDistance, // Use slideMoveDistance to ensure proper alignment
    duration: 0.05,
    ease: "power4.out",
  });
};

const updateImages = (imgNumber) => {
  const imgSrc = `Images/img${imgNumber}.jpg`;

  // Remove previous images
  document.querySelector(".img-top").innerHTML = "";
  document.querySelector(".img-bottom").innerHTML = "";

  // Create new images
  const imgTop = document.createElement("img");
  const imgBottom = document.createElement("img");
  imgTop.src = imgSrc;
  imgBottom.src = imgSrc;

  // Initial state for animation
  if (window.innerWidth > 900) {
    imgTop.style.clipPath = "polygon(85% 0%, 0% 0%, 0% 50%, 85% 50%)";
    imgBottom.style.clipPath =
      "polygon(100% 50%, 15% 50%, 15% 100%, 100% 100%)";
  } else {
    imgTop.style.clipPath = "polygon(85% 0%, 0% 0%, 0% 50%, 85% 50%)";
    imgBottom.style.clipPath =
      "polygon(100% 50%, 15% 50%, 15% 100%, 100% 100%)";
  }

  imgTop.style.transform = "scale(1.2)";
  imgBottom.style.transform = "scale(1.2)";

  document.querySelector(".img-top").appendChild(imgTop);
  document.querySelector(".img-bottom").appendChild(imgBottom);

  // Animate images into view
  gsap.to([imgTop, imgBottom], {
    clipPath:
      window.innerWidth > 900
        ? "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
        : "none",
    transform: "scale(1)",
    duration: 1.5,
    ease: "power4.out",
  });
};

// Dynamically set the width of `.slide-titles` based on the number of titles
document.addEventListener("DOMContentLoaded", () => {
  // Set width of `.slide-titles` to totalSlides * 100vw
  document.querySelector(".slide-titles").style.width = `${
    totalSlides * 100
  }vw`;

  document.addEventListener("click", handleSlider);
  updateImages(1);
  updateActiveSlide();
  updateNumberDisplay(); // Initialize the number display with animation
});
