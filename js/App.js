function animations() {
  // Wrapper animation
  anime
    .timeline({
      targets: ".welcome",
      easing: "easeOutExpo",
    })
    .add({
      width: ["0vw", "100vw"],
      opacity: 1,
      duration: 1200,
    })
    .add({
      delay: 2700,
      opacity: 1,
      duration: 1500,
      complete: function (anime) {
        let main = document.querySelector("main");
        document.querySelector(".welcome").remove();
        main.style.width = "100%";
        main.style.height = "100%";
      },
    });

  // Heading animation
  anime({
    targets: ".heading",
    delay: 400,
    opacity: 1,
    duration: 1800,
    translateY: ["-30px", "0px"],
    easing: "easeOutExpo",
  });

  // Sub-heading animation
  anime({
    targets: ".sub-heading",
    delay: 600,
    opacity: 1,
    duration: 1800,
    translateY: ["-30px", "0px"],
    easing: "easeOutExpo",
  });

  // Loader wrapper animation
  anime({
    targets: ".loader-wrapper",
    delay: 1500,
    opacity: 1,
    duration: 1800,
    easing: "easeOutExpo",
  });

  // Loader animation
  anime({
    targets: ".loader",
    delay: 2000,
    width: ["0%", "100%"],
    opacity: 1,
    duration: 2400,
    easing: "easeOutExpo",
  });

  // Paragraph animation
  anime({
    targets: "p",
    delay: (el, i) => 5200 + 100 * i,
    opacity: 1,
    duration: 2300,
    easing: "easeOutExpo",
    begin: function () {
      let sections = document.querySelectorAll("section");

      for (let i = 0; i < sections.length; i++) {
        sections[i].classList.remove("hide");
        document.querySelector(".icons").classList.remove("hide");
      }
    },
  });
}

function tagCloud() {
  const texts = [
    "HTML",
    "CSS",
    "JAVASCRIPT",
    "PHP",
    "PYTHON",
    "MYSQL",
    "JQUERY",
    "BOOTSTRAP",
    "WORDPRESS",
  ];
  let radius = 300;

  if (screen.width < 768) {
    radius = 150;
  } else if (screen.width < 1024) {
    radius = 200;
  }

  let tagCloud = TagCloud(".sphere", texts, {
    // Sphere radius in px
    radius: radius,

    // animation speed
    // slow, normal, fast
    maxSpeed: "normal",
    initSpeed: "fast",

    // Roling direction [0 (top), 90 (left), 135 (right-bottom)]
    direction: 135,

    // Interaction with mouse or not [Default true (delerate to rolling init speed, and keep rolling with mouse).]
    keep: true,
  });

  // Giving color to each text in sphere
  let color = "#FF5733";
  document.querySelector(".sphere").style.color = color;
}

function scrollAnimation() {
  let allAnimatedElements = document.querySelectorAll(".animatedElement");

  const controller = new ScrollMagic.Controller();

  allAnimatedElements.forEach((animatedElements) => {
    let tween = gsap.from(animatedElements, {
      opacity: 0,
      duration: 0.5,
    });

    let scene = new ScrollMagic.Scene({
      triggerElement: animatedElements,
      // reverse: false,
    })
      .setTween(tween)
      // .addIndicators()
      .addTo(controller);
  });
}

function timeLine() {
  const allRonds = document.querySelectorAll(".rond");
  const allBoxes = document.querySelectorAll(".box");

  const controller = new ScrollMagic.Controller();

  allBoxes.forEach((box) => {
    for (let i = 0; i < allRonds.length; i++) {
      if (
        allRonds[i].getAttribute("data-anim") === box.getAttribute("data-anim")
      ) {
        let tween = gsap.from(box, { y: -50, opacity: 0, duration: 0.5 });

        let scene = new ScrollMagic.Scene({
          triggerElement: allRonds[i],
          // reverse: false,
        })
          .setTween(tween)
          // .addIndicators()
          .addTo(controller);
      }
    }
  });
}

function contactForm() {
  const form = document.querySelector(".form");
  const validationMessage = document.querySelector(".validationMessage");
  const errorMessage = document.querySelector(".errorMessage");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    let elementTarget;

    fetch("php/contactForm.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((error) => {
        if (error) {
          elementTarget = ".errorMessage";
        } else {
          elementTarget = ".validationMessage";
        }

        animeElement(elementTarget);
      })
      .catch((error) => {
        elementTarget = ".errorMessage";
        animeElement(elementTarget);
        return console.error(error);
      });
  });
}

function animeElement(elementTarget) {
  anime
    .timeline({
      targets: elementTarget,
      easing: "easeOutExpo",
    })
    .add({
      opacity: 1,
      duration: 3000,
      begin: function () {
        let element = document.querySelector(elementTarget);
        element.classList.remove("hide");
        element.scrollIntoView();
      },
    })
    .add({
      delay: 3000,
      opacity: 0,
      duration: 1000,
      complete: function () {
        document.querySelector(elementTarget).classList.add("hide");
      },
    });
}

document.addEventListener("DOMContentLoaded", () => {
  animations();
  tagCloud();
  scrollAnimation();
  timeLine();
  contactForm();
});
