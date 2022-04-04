export default class Slider {
  constructor(props) {
    this.rootElement = props.element;
    this.slides = Array.from(
      this.rootElement.querySelectorAll(".slider-list_item")
    );
    this.slidesLength = this.slides.length;
    this.current = 0;
    this.isAnimating = false;
    this.direction = 1; // -1
    this.baseAnimeSettings = {
      duration: 750,
      elasticity: 0,
      easing: "easeInOutCirc",
    };
    this.navBar = this.rootElement.querySelector(".slider_nav-bar");
    this.thumbs = Array.from(this.rootElement.querySelectorAll(".nav-control"));
    this.prevButton = this.rootElement.querySelector(".slider_arrow_prev");
    this.nextButton = this.rootElement.querySelector(".slider_arrow_next");

    this.slides[this.current].classList.add("slider-list_item_active");
    this.thumbs[this.current].classList.add("nav-control_active");

    this._bindEvents();
  }

  goTo(index, dir) {
    if (this.isAnimating) return;
    var self = this;
    let prevSlide = this.slides[this.current];
    let nextSlide = this.slides[index];

    self.isAnimating = true;
    self.current = index;
    nextSlide.classList.add("slider-list_item_active");

    anime(
      Object.assign({}, self.baseAnimeSettings, {
        targets: nextSlide,
        translateX: [100 * dir + "%", 0],
      })
    );

    anime(
      Object.assign({}, self.baseAnimeSettings, {
        targets: prevSlide,
        translateX: [0, -100 * dir + "%"],
        complete: function (anim) {
          self.isAnimating = false;
          prevSlide.classList.remove("slider-list_item_active");
          self.thumbs.forEach((item, index) => {
            var action = index === self.current ? "add" : "remove";
            item.classList[action]("nav-control_active");
          });
        },
      })
    );
  }

  goStep(dir) {
    let index = this.current + dir;
    let len = this.slidesLength;
    let currentIndex = (index + len) % len;
    this.goTo(currentIndex, dir);
  }

  goNext() {
    this.goStep(1);
  }

  goPrev() {
    this.goStep(-1);
  }

  _navClickHandler(e) {
    var self = this;
    if (self.isAnimating) return;
    let target = e.target.closest(".nav-control");
    if (!target) return;
    let index = self.thumbs.indexOf(target);
    if (index === self.current) return;
    let direction = index > self.current ? 1 : -1;
    self.goTo(index, direction);
  }

  _bindEvents() {
    var self = this;
    ["goNext", "goPrev", "_navClickHandler"].forEach((method) => {
      self[method] = self[method].bind(self);
    });
    self.nextButton.addEventListener("click", self.goNext);
    self.prevButton.addEventListener("click", self.goPrev);
    self.navBar.addEventListener("click", self._navClickHandler);
  }
}
