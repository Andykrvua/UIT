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
  slidesPerView: "auto",
  centeredSlides: true,
  spaceBetween: 30,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  }
});
