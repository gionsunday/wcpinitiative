window.addEventListener("load", () => {
  const imgHolder01 = document.querySelector("#imgholder1");
  const imgHolder02 = document.querySelector("#imgholder2");

  const img00 = "https://wcpinitiative.onrender.com/img/events/g0.jpg";
  const img01 = "https://wcpinitiative.onrender.com/img/events/g1.jpg";
  const img02 = "https://wcpinitiative.onrender.com/img/events/g2.jpg";
  const img03 = "https://wcpinitiative.onrender.com/img/events/g3.jpg";
  const img04 = "https://wcpinitiative.onrender.com/img/events/g4.jpg";
  const img05 = "https://wcpinitiative.onrender.com/img/events/g5.jpg";
  const img06 = "https://wcpinitiative.onrender.com/img/events/g6.jpg";
  const img07 = "https://wcpinitiative.onrender.com/img/events/g7.jpg";
  const img08 = "https://wcpinitiative.onrender.com/img/events/g8.jpg";
  const img09 = "https://wcpinitiative.onrender.com/img/events/g9.jpg";
  const img10 = "https://wcpinitiative.onrender.com/img/events/g10.jpg";
  const img11 = "https://wcpinitiative.onrender.com/img/events/g11.jpg";
  const img12 = "https://wcpinitiative.onrender.com/img/events/g12.jpg";
  const img13 = "https://wcpinitiative.onrender.com/img/events/g13.jpg";
  const img14 = "https://wcpinitiative.onrender.com/img/events/g14.jpg";
  const img15 = "https://wcpinitiative.onrender.com/img/events/g15.jpg";
  const img16 = "https://wcpinitiative.onrender.com/img/events/g16.jpg";
  const img17 = "https://wcpinitiative.onrender.com/img/events/g17.jpg";
  const img18 = "https://wcpinitiative.onrender.com/img/events/g18.jpg";
  const img19 = "https://wcpinitiative.onrender.com/img/events/g19.jpg";
  const img20 = "https://wcpinitiative.onrender.com/img/events/g20.jpg";
  const img21 = "https://wcpinitiative.onrender.com/img/events/g21.jpg";
  const img22 = "https://wcpinitiative.onrender.com/img/events/g22.jpg";
  const img23 = "https://wcpinitiative.onrender.com/img/events/g23.jpg";
  const img24 = "https://wcpinitiative.onrender.com/img/events/g24.jpg";
  const img25 = "https://wcpinitiative.onrender.com/img/events/g25.jpg";
  const img26 = "https://wcpinitiative.onrender.com/img/events/g26.jpg";
  const img27 = "https://wcpinitiative.onrender.com/img/events/g27.jpg";
  const img28 = "https://wcpinitiative.onrender.com/img/events/g28.jpg";
  const img29 = "https://wcpinitiative.onrender.com/img/events/g29.jpg";
  const img30 = "https://wcpinitiative.onrender.com/img/events/g30.jpg";
  const img31 = "https://wcpinitiative.onrender.com/img/events/g31.jpg";
  const img32 = "https://wcpinitiative.onrender.com/img/events/g32.jpg";
  const img33 = "https://wcpinitiative.onrender.com/img/events/g33.jpg";

  const imgageArrays01 = [
    img00,
    img01,
    img02,
    img03,
    img04,
    img05,
    img06,
    img07,
    img08,
    img09,
    img10,
    img11,
    img12,
    img13,
    img14,
    img15,
    img16,
    img17,
    img18,
    img19,
    img20,
  ];
  const imgageArrays02 = [
    img14,
    img15,
    img16,
    img17,
    img18,
    img19,
    img20,
    img21,
    img22,
    img23,
    img24,
    img25,
    img26,
    img27,
    img28,
    img29,
    img30,
    img31,
    img32,
    img33,
  ];

  let randomNumber1 = 0;
  let randomNumber2 = 0;
  setInterval(() => {
    randomNumber1 = Math.floor(Math.random() * 10);
    randomNumber2 = Math.floor(Math.random() * 10);

    //   console.log(randomNumber1, randomNumber2)

    imgHolder01.src = imgageArrays01[randomNumber1];
    imgHolder02.src = imgageArrays02[randomNumber2];

    //   console.log(imgageArrays[randomNumber1], imgageArrays[randomNumber2])
  }, 3000);
});
