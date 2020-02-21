import Headroom from "headroom.js";
import Swiper from "swiper";

// dynamic header
const myElement = document.querySelector("header");

var headroom = new Headroom(myElement, {
  offset: 500,
  classes: {
    initial: "animated",
    pinned: "slideDown",
    unpinned: "slideUp"
  }
});
headroom.init();

// accordion
let acc = document.getElementsByClassName("myth-item");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
  });
}

// review slider
var swiper = new Swiper(".swiper-container", {
  // slidesPerView: "auto",
  centeredSlides: true,
  spaceBetween: 65,
  loop: true,
  navigation: {
    nextEl: ".swiper-next",
    prevEl: ".swiper-prev"
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  breakpoints: {
    800: {
      slidesPerView: 1
    }
  },
  breakpoints: {
    801: {
      slidesPerView: "auto"
    }
  }
});
