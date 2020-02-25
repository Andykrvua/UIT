import Headroom from "headroom.js";
import Swiper from "swiper";
import Smooth from "smooth-scroll";
import Inputmask from "inputmask";

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
  autoHeight: true,
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

// smooth-scroll
var scroll = new Smooth(".smooth, nav a", {
  speed: 300
});

// form style
let orderDemo = document.querySelector(".order-demo");
let orderDemo2 = document.querySelector(".order-demo2");
let orderCost = document.querySelector(".order-cost");
let orderRent = document.querySelector(".order-rent");
let orderHosting = document.querySelector(".order-hosting");

let clickStyle = "background-color: rgb(123, 114, 143)";
let orderTitle;

orderDemo.addEventListener("click", () => {
  resStyle();
  document.querySelector(".order_demo").style.cssText = clickStyle;
  orderTitle = orderDemo.textContent;
  changeTitle(orderTitle);
});
orderDemo2.addEventListener("click", () => {
  resStyle();
  document.querySelector(".order_demo").style.cssText = clickStyle;
  orderTitle = orderDemo2.textContent;
  changeTitle(orderTitle);
});
orderCost.addEventListener("click", () => {
  resStyle();
  document.querySelector(".order_cost").style.cssText = clickStyle;
  orderTitle = orderCost.textContent;
  changeTitle(orderTitle);
});
orderRent.addEventListener("click", () => {
  resStyle();
  document.querySelector(".order_rent").style.cssText = clickStyle;
  orderTitle = orderRent.textContent;
  changeTitle(orderTitle);
});
orderHosting.addEventListener("click", () => {
  resStyle();
  document.querySelector(".order_hosting").style.cssText = clickStyle;
  orderTitle = orderHosting.textContent;
  changeTitle(orderTitle);
});

// change form title
function changeTitle(titleText) {
  document.querySelector(".form-heading").textContent = titleText;
}

// reset form style
function resStyle() {
  let buttonsForm = document.querySelectorAll(".form-options .btn");
  let i;
  for (i = 0; i < buttonsForm.length; i++) {
    buttonsForm[i].style.cssText = "";
  }
}

// change form title and focus
let acc2 = document.querySelectorAll(".form-options .btn");
for (let j = 0; j < acc2.length; ++j) {
  acc2[j].addEventListener("click", () => {
    resStyle();
    changeTitle(acc2[j].textContent);
    document.querySelector(".main-form input").focus();
  });
}

// inputmask
Inputmask().mask(document.querySelector(".i_phone"));

// send form
const request = new XMLHttpRequest();
const url = "ajax_quest.php";

request.open("POST", url, true);

request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

request.addEventListener("readystatechange", () => {
  if (request.readyState === 4 && request.status === 200) {
    console.log(request.responseText);
  }
});

let i_send = document.querySelector(".order_cost");
i_send.addEventListener("click", e => {
  e.preventDefault();

  let i_name = document.querySelector(".i_name").value;
  let i_phone = document.querySelector(".i_phone").value;
  let i_mail = document.querySelector(".i_mail").value;
  let i_btn = i_send.textContent;

  if (i_name === "" && i_phone === "" && !validateEmail(i_mail)) {
    i_name === "" ? console.log("Введите имя") : null;
    i_phone === "" ? console.log("Укажите телефон или почту") : null;

    // if (i_phone === "" || i_mail === "") {
    validateEmail(i_mail) ? null : console.log("Неправильный адрес почты ");
    // } else {
    // console.log("Укажите телефон или почту");
    // }
  } else {
    const params =
      "name=" +
      i_name +
      "&phone=" +
      i_phone +
      "&mail=" +
      i_mail +
      "&btn=" +
      i_btn;

    request.send(params);
    // console.log(t1);
    document.querySelector(".i_name").value = "";
    document.querySelector(".i_phone").value = "";
    document.querySelector(".i_mail").value = "";
  }
});

// email validate
function validateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  // alert("You have entered an invalid email address!");
  return false;
}

// show validation
function showValidation(str) {
  document.querySelector(".validate").textContent = str;
}
