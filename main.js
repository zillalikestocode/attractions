import "./style.css";
import china from "./assets/china.jpg";
import redeemer from "./assets/redeemer.jpg";
import machu from "./assets/machu.jpg";
import mahal from "./assets/mahal.jpg";
import colosseum from "./assets/colosseum.jpg";
import petra from "./assets/petra.jpg";
import chichen from "./assets/chichen.jpg";

const app = document.querySelector("#app");
const attractions = [
  {
    title: "Colosseum",
    country: "Rome",
    image: colosseum,
    key: 7,
  },
  {
    title: "Chichen Itza",
    country: "Mexico",
    image: chichen,
    key: 6,
  },
  {
    title: "Machu Picchu",
    country: "Peru",
    image: machu,
    key: 5,
  },
  {
    title: "Petra",
    country: "Jordan",
    image: petra,
    key: 4,
  },
  {
    title: "Taj Mahal",
    country: "India",
    image: mahal,
    key: 3,
  },
  {
    title: "Christ the Redeemer",
    country: "Brazil",
    image: redeemer,
    key: 2,
  },
  {
    title: "Great Wall of China",
    country: "China",
    image: china,
    key: 1,
  },
];
const App = function _App() {
  return (
    attractions
      // .filter((item) => item === App.state.attraction)
      .map((item) => {
        return `
      <img class="object-cover scale-[1.1] hidden overflow-hidden fixed h-full w-full top-0 -z-50 slide${item.key} " src=${item.image}>
    `;
      })
      .join("")
  );
};
function updateTitle() {
  const title = document.querySelector(".title");
  title.innerHTML = `
    <h4 class="text-7xl font-['Barlow_Condensed'] tracking-wider font-bold ">${App.state.attraction.title.toUpperCase()}</h4>
    <button class="bg-red-600 p-5 font-medium py-3 rounded-md">EXPLORE NOW</button>
  `;
}

function updateTree() {
  app.innerHTML = App();
  document.querySelector(".back").addEventListener("click", App.state.backward);
  document.querySelector(".next").addEventListener("click", App.state.forward);
}

function setState(callback) {
  callback();
  updateTree();
}

App.state = {
  index: 1,
  attraction: attractions[attractions.length - 1],
  forward: () => {
    clearInterval(interval);

    interval = setInterval(App.state.forward, 8000);
    gsap.to(
      `.slide${App.state.index > attractions.length ? 1 : App.state.index}`,
      {
        x: "-130%",
        duration: 1,
        display: "none",
        ease: "linear",
      }
    );
    gsap.fromTo(
      `.slide${
        App.state.index >= attractions.length ? 2 : App.state.index + 1
      }`,
      {
        scale: 1,
        x: 150,
      },
      { scale: 1.1, x: 0, delay: 0, duration: 1 }
    );
    gsap.fromTo(
      `.slide${
        App.state.index >= attractions.length ? 2 : App.state.index + 1
      }`,
      {
        display: "none",
      },
      { display: "block" }
    );
    if (App.state.index === attractions.length) {
      gsap.to(".slide1", {
        x: 0,
      });
      gsap.fromTo(
        `.slide${attractions.length}`,
        {
          x: 0,
        },
        { x: 0 }
      );
      for (let i = 2; i <= attractions.length - 1; i++) {
        gsap.fromTo(
          `.slide${i}`,
          {
            x: "-130%",
          },
          { x: 0 }
        );
      }
    }
    gsap.fromTo(
      ".progress-bar",
      {
        width: 0,
      },
      { width: "100%", duration: 7, ease: "linear" }
    );
    App.state.index =
      App.state.index >= attractions.length ? 1 : App.state.index + 1;
    App.state.attraction = attractions[attractions.length - App.state.index];
    number.innerHTML = `
  <h4 class="text-7xl font-semibold clip">0${App.state.attraction.key}</h4>
  <h4 class="tracking-widest font-semibold text-lg absolute top-0 -right-8 font-['Barlow_Condensed']">${App.state.attraction.country.toUpperCase()}</h4>
`;
    updateTitle();
  },
  backward: () => {
    clearInterval(interval);
    interval = setInterval(App.state.forward, 8000);
    if (App.state.index !== 1) {
      gsap.to(`.slide${App.state.index - 1}`, {
        x: "0",
        duration: 1,
      });
    } else {
      gsap.to(`.slide${attractions.length}`, {
        x: "0",
        duration: 0,
      });
    }
    gsap.to(
      `.slide${
        App.state.index === 1 ? attractions.length : App.state.index - 1
      }`,
      {
        display: "block",
        duration: 0,
      }
    );
    gsap.fromTo(
      ".progress-bar",
      {
        width: 0,
      },
      { width: "100%", duration: 7, ease: "linear" }
    );

    if (App.state.index === 1) {
      for (let i = 1; i < attractions.length; i++) {
        gsap.to(`.slide${i}`, {
          x: "-100%",
          scale: 1,
        });
      }
    } else {
      gsap.fromTo(
        `.slide${App.state.index > attractions.length ? 2 : App.state.index}`,
        {
          scale: 1.1,
          x: 0,
        },
        { scale: 1, x: 150, delay: 0, duration: 1 }
      );
    }
    App.state.index =
      App.state.index === 1 ? attractions.length : App.state.index - 1;
    App.state.attraction = attractions[attractions.length - App.state.index];
    number.innerHTML = `
  <h4 class="text-7xl font-semibold clip">0${App.state.attraction.key}</h4>
  <h4 class="tracking-widest font-semibold text-lg absolute top-0 -right-8 font-['Barlow_Condensed']">${App.state.attraction.country.toUpperCase()}</h4>
`;
    updateTitle();
  },
};

let interval = setInterval(App.state.forward, 7000);
updateTree();

const number = document.querySelector(".number");
number.innerHTML = `
  <h4 class="text-7xl font-semibold clip">0${App.state.attraction.key}</h4>
  <h4 class="tracking-widest font-semibold text-lg absolute top-0 -right-9 font-['Barlow_Condensed']">${App.state.attraction.country.toUpperCase()}</h4>
`;

gsap.fromTo(
  ".progress-bar",
  {
    width: 0,
  },
  { width: "100%", duration: 8 }
);

updateTitle();
