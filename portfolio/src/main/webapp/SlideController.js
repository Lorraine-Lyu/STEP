import SlideHandler from '/SlideHandler.js';

/** The controller handling all slideshows. */
export default class SlideController {

  constructor(document) {
    /** 
     * @private @const @type {SlideHandler} The service 
     * module manipulates the slideshows. 
     */
    this.slideHandler_ = new SlideHandler(document);
  }

  /**
   * Flips both slideshow in gallery.html.
   * @param {integer}  num Number of pages to flip.
   * @param {integer}  sIndex Index of the slide to be fliped.
   */
  flip(num, sIndex) {
    this.slideHandler_.flip(num, sIndex);
  }
  
}