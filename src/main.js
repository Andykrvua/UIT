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

// validate form run
let buttons = document.querySelectorAll(".form-options .btn");

for (let m = 0; m < buttons.length; m++) {
  buttons[m].addEventListener("click", validate, true);
}

// validation form
function validate(e) {
  e.preventDefault();

  let i_name = document.querySelector(".i_name").value;
  let i_phone = document.querySelector(".i_phone").value;
  let i_mail = document.querySelector(".i_mail").value;
  let i_btn = this.textContent;

  let str = [];

  //lang
  let querylang = document.querySelector("html").getAttribute("lang");
  let lang;

  if (querylang === "ru") {
    lang = false;
  } else {
    lang = true;
  }

  if (i_name === "") {
    lang ? str.push("Введіть ім'я") : str.push("Введите имя");
  }

  if (i_phone === "" && !validateEmail(i_mail)) {
    lang
      ? str.push("Вкажіть телефон або пошту")
      : str.push("Укажите телефон или почту");

    if (i_mail !== "" && !validateEmail(i_mail)) {
      lang
        ? str.push("Невірна поштова адреса")
        : str.push("Неправильный адрес почты");
    }
  }

  if (i_phone !== "" && i_mail !== "") {
    validateEmail(i_mail)
      ? null
      : lang
      ? str.push("Невірна поштова адреса")
      : str.push("Неправильный адрес почты");
  }

  if (i_phone !== "" && i_phone.toString().slice(-1) === "_") {
    lang
      ? str.push("Невірний номер телефону")
      : str.push("Неправильный номер телефона");
  }

  if (!str.length) {
    sendMail(i_name, i_phone, i_mail, i_btn);
  } else {
    showValidation(str);
  }
}

// email validate
function validateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

// show validation
function showValidation(str) {
  if (str !== "") {
    let buttons = document.querySelectorAll(".form-options .btn");
    for (let n = 0; n < buttons.length; n++) {
      buttons[n].disabled = true;
    }

    let elem = document.querySelector(".validate");

    str.forEach(element => {
      elem.innerHTML += `<span>${element}</span>`;
    });

    elem.classList.add("active");
    setTimeout(() => {
      elem.classList.remove("active");
      elem.innerHTML = "";

      let buttons = document.querySelectorAll(".form-options .btn");
      for (let n = 0; n < buttons.length; n++) {
        buttons[n].disabled = false;
      }
    }, 2000);
  }
}

// send form
function sendMail(i_name, i_phone, i_mail, i_btn) {
  const request = new XMLHttpRequest();
  const url = "./mailsender/mailsend.php";

  request.open("POST", url, true);

  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  request.addEventListener("readystatechange", () => {
    if (request.readyState === 4 && request.status === 200) {
      console.log(request.responseText);
    }
  });

  let cook = makeRandStr();

  document.cookie = `grttth=${cook}`;

  function makeRandStr() {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  const params =
    "name=" +
    i_name +
    "&phone=" +
    i_phone +
    "&mail=" +
    i_mail +
    "&btn=" +
    i_btn +
    "&grttth=" +
    cook;

  request.send(params);

  document.querySelector(".i_name").value = "";
  document.querySelector(".i_phone").value = "";
  document.querySelector(".i_mail").value = "";
}
