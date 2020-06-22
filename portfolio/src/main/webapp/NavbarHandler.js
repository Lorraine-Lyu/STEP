/** The class which tracks current loaded page and changes html page. */
export default class NavbarHandler {

  constructor(document) {
    /** @private @const @type {HTML document} */
    this.document_ = document;
    /**
     * @private @const @type {String Array}
     * The List of relative paths to all files to be loaded in iframe .
     */
    this.sources_ = [
      'main.html', 
      'introduction.html', 
      'projects.html', 
      'gallery.html',
    ];
  }

  /** 
   * Change src of iframe according to pageIndex.
   * @param {integer} pageIndex Index of page the iframe should load.
   */
  loadFrame(pageIndex) {
    if (pageIndex > 3 || pageIndex < 0)  {
      alert('Invalid page index');
      return;
    }
    const frame = this.document_.getElementById('sub-page');
    frame.src = this.sources_[pageIndex];
  }

}