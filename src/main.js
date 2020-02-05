import Headroom from "headroom.js";

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
