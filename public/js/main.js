(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".sticky-top").addClass("shadow-sm").css("top", "0px");
    } else {
      $(".sticky-top").removeClass("shadow-sm").css("top", "-100px");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Date and time picker
  $(".date").datetimepicker({
    format: "L",
  });
  $(".time").datetimepicker({
    format: "LT",
  });

  // Header carousel
  $(".header-carousel").owlCarousel({
    autoplay: false,
    animateOut: "fadeOutLeft",
    items: 1,
    dots: true,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: false,
    smartSpeed: 1000,
    center: true,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
    },
  });

  const urls = [
    // "../img/bn3.jpg",
    "../img/hero-01.jpg",

    // "../img/bn2.jpeg",
    // "../img/bn3.jpg",
    // "../img/bn4.jpg",
  ];

   $(".hero-sub-container").css({
    "background-image": `url(${urls[0]})`,
    "background-size": "conver",
    "background-position": "center",
    "background-repeat": "no-repeat",
    "box-shadow": "inset 0px 25px 90px pink",
    "transition":"4s"
  });
  const urlLength = urls.length;

  let count = -1;

function incrementAndReset() {
  count++;
  if (count > urlLength-1) {
    count = 0;
  }
  // console.log(urls[count]);
   $(".hero-sub-container").css({
    "background-image": `url(${urls[count]})`,
    "background-size": "cover",
    "background-position": "center",
    "background-repeat": "no-repeat",
    "box-shadow": "inset 0px 25px 90px purple",
    "transition":"3s"
  });
}
  
  const sliderFun = () => {
    let j = 0;
    if (j < urlLength ) {
      j +=1;
      
    }
    else{
        j -=1
    }
console.log(urls[j-1]);
console.log(j)

  };

  setInterval(() => {

    incrementAndReset();
  }, 8000);

 
})(jQuery);
