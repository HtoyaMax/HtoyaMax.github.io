var header = $(".header-home");
var scrollChange = 25;
$(window).scroll(function () {
  var scroll = $(window).scrollTop();

  if (scroll >= scrollChange) {
    header.addClass("header-bg");
  } else {
    header.removeClass("header-bg");
  }
});

$(".btn-trigger").click(function () {
  $("header").toggleClass("open-menu");
});

$(document).ready(function () {
  $(".slider-home").slick({
    autoplay: true,
    dots: true,
    arrows: false,
    infinite: true,
    variableWidth: true,
    appendDots: $(".slick-dots"),
    // fade: true,
    speed: 800,
    autoplaySpeed: 5000,
  });
});

// //////////////////  rating

const ratings = document.querySelectorAll(".rating");
if (ratings.length > 0) {
  initRatings();
}

// Основная функция
function initRatings() {
  let ratingActive, ratingValue;
  // бугаем по всем рейтингам страницы
  for (let index = 0; index < ratings.length; index++) {
    const rating = ratings[index];
    initRating(rating);
  }

  // инициализация конкретного рейтинга
  function initRating(rating) {
    initRatingVars(rating);
    setRatingActiveWidth();

    // разркшаем выбирать рейтинг
    if (rating.classList.contains("rating_set")) {
      setRating(rating);
    }
  }

  // инициализация переменых
  function initRatingVars(rating) {
    ratingActive = rating.querySelector(".rating__active");
    ratingValue = rating.querySelector(".rating__value");
  }

  // изменяем ширину активных звезд
  function setRatingActiveWidth(index = ratingValue.innerHTML) {
    const ratingActiveWidth = index / 0.05;
    ratingActive.style.width = `${ratingActiveWidth}%`;
  }

  // Возможность указать оценку
  function setRating(rating) {
    const ratingItems = rating.querySelectorAll(".rating__item");
    for (let index = 0; index < ratingItems.length; index++) {
      const ratingItem = ratingItems[index];
      ratingItem.addEventListener("mouseenter", function (e) {
        // обновление переменых
        initRatingVars(rating);
        // обновление активных звезд
        setRatingActiveWidth(ratingItem.value);
      });
      ratingItem.addEventListener("mouseleave", function (e) {
        // Обновление активных звезд
        setRatingActiveWidth();
      });
      ratingItem.addEventListener("click", function (e) {
        // Обновление переменых
        initRatingVars(rating);
        if (rating.dataset.ajax) {
          setRatingValue(ratingItem.value, rating);
        } else {
          // отобразить текущую оценку
          ratingValue.innerHTML = index + 1;
          setRatingActiveWidth();
        }
      });
    }
  }

  async function setRatingValue(value, rating) {
    if (!rating.classList.contains("rating_sending")) {
      rating.classList.add("rating_sending");

      // Отправка даных (value) на сервер
      let response = await fetch("rating.json", {
        method: "GET",

        // body: JSON.stringify({
        //   userRating:value
        // }),
        // headers:{
        //   'content-type': 'application/json'
        // }
      });

      if (response.ok) {
        const result = await response.json();

        // Получаем новый рейтинг
        const newRating = result.newRating;

        // Вывод нового среднего результата
        // ratingValue.innerHTML = newRating;

        // Обновление активных звезд
        setRatingActiveWidth();

        rating.classList.remove("rating_sending");
      } else {
        alert("Error");

        rating.classList.remove("rating_sending");
      }
    }
  }
}

$(".slider-proj").slick({
  arrows: true,
  infinite: true,
  slidesToShow: 3,
  responsive: [
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 385,
      settings: "unslick",
    },
  ],
});

$(".slider-blog").slick({
  arrows: true,
  infinite: true,
  slidesToShow: 3,
  responsive: [
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
});

// const buttons = document.querySelectorAll("button");
// buttons.forEach((button) => {
//   button.addEventListener("click", () => {
//     const faq = button.nextElementSibling;
//     faq.classList.toggle("show");
//   });
// });

const faqs = document.querySelectorAll(".faq");

faqs.forEach((faq) => {
  faq.addEventListener("click", () => {
    faq.classList.toggle("active");
  });
});

const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click", function (e) {
      const popupName = popupLink.getAttribute("href").replace("#", "");
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
      e.preventDefault();
    });
  }
}

const popupCloseIcon = document.querySelectorAll(".close-popup");
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener("click", function (e) {
      popupClose(el.closest(".popup"));
      e.preventDefault();
    });
  }
}

function popupOpen(curentPopup) {
  curentPopup.classList.add("open");
  curentPopup.addEventListener("click", function (e) {
    if (!e.target.closest(".popup__content")) {
      popupClose(e.target.closest(".popup"));
    }
  });
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove("open");
    if (doUnlock) {
      // bodyUnlock();
    }
  }
}
