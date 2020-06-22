/** The class handling all slides. */
export default class SlideHandler {
  
  /** 
   * @static @const @type {integer} All slides have 5 pages, 
   * so the max index is 4. 
   */
  static MAX_PAGE_INDEX = 4;

  constructor(document) {
    /** @private @type {integer} Index of the page slide 1 is showing. */
    this.slide1_ = 0;
    /** @private @type {integer} Index of the page slide 2 is showing. */
    this.slide2_ = 0;
    /** @private @const @type {HTML document} */
    this.document_ = document;
    this.init_();
  }

  /**
   * Sets both slides to show the first page.
   * @private
   */
  init_() {
    this.document_.getElementById("slide1").getElementsByTagName("img")[0]
      .classList.add("pic-show");
    this.document_.getElementById("slide2").getElementsByTagName("img")[0]
      .classList.add("pic-show");
  }

  /**
   * Flips both slideshow in gallery.html.
   * @param {integer}  num Number of pages to flip.
   * @param {integer}  sIndex Index of the slide to be fliped.
   */
  flip(num, sIndex) {
    if (sIndex == 1) {
      this.slide1_ = 
          this.updateFlip_(this.slide1_, this.slide1_ + num, "slide1");
    } else {
      this.slide2_ = 
          this.updateFlip_(this.slide2_, this.slide2_ + num, "slide2");
    }
  }

  /**
   * The helper function for flip(n,s). 
   * Sets the input slide to show 
   * picture corresponding to the 'show' index.
   * @param {integer} prev Index of the image needs to be hided.
   * @param {integer}  show  The index of picture the slide should flip to.
   * @param {string} slideStr The class name HTML slide object to be flipped.
   * @returns {integer} The updated index for one of the slides.
   * @private
   */
  updateFlip_(prev, show, slideStr) {
    let slide = 
        this.document_.getElementById(slideStr).getElementsByTagName("img");
    if (show > SlideHandler.MAX_PAGE_INDEX) {
      show = 0;
    } else if (show < 0) {
      show = SlideHandler.MAX_PAGE_INDEX;
    }

    slide[show].classList.add("pic-show");
    slide[prev].classList.remove('pic-show');
    return show;
  }
}