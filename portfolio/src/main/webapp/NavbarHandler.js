/** The class which tracks current loaded page and changes html page. */
class NavbarHandler {

  /**
   * @private @const 
   * @type {!Array<string>}
   * The List of relative paths to all files to be loaded in iframe .
   */
  static sources_ = [
    'main.html', 
    'introduction.html', 
    'projects.html', 
    'gallery.html',
  ];

  constructor(document) {
    /** 
     * @private @const 
     * @type {!HTML document} 
     */
    this.document_ = document;
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
    frame.src = NavbarHandler.sources_[pageIndex];
  }

}

export {NavbarHandler};