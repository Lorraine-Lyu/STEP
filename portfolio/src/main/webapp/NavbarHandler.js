/** The class which tracks current loaded page and changes html page. */
class NavbarHandler {

  /**
   * @private @const 
   * @type {!Array<string>}
   * The List of relative paths to all files to be loaded in iframe .
   */
  static sources_ = [
    'home.html', 
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
    this.init.bind(this);
  }

  /** 
   * Change src of iframe according to pageIndex.
   * @param {integer} index Index of page the iframe should load.
   */
  loadFrame(index) {
    const frame = this.document_.getElementById('sub-page');
    if (index < 0 || index >= NavbarHandler.sources_.length) {
      throw "Index out of range.";
    }
    frame.src = NavbarHandler.sources_[index]; 
  }

  /**
   * Initiates all buttons on the navbar.
   */
  init() {
    const template = this.document_.querySelector('#nav-cell');
    const navbar = this.document_.querySelector('#navbar');
    let index = undefined;
    for (index = NavbarHandler.sources_.length - 1; index >= 0; index--) {
      const clone = template.content.cloneNode(true);
      const btn = clone.querySelector('#nav-btn');
      btn.innerHTML = NavbarHandler.sources_[index].split('.')[0];
      navbar.insertBefore(clone, navbar.firstChild);
    }
    const buttons = navbar.getElementsByClassName('nav-link');
    buttons[3].addEventListener('click', () => this.loadFrame(3));
    buttons[2].addEventListener('click', () => this.loadFrame(2));
    buttons[1].addEventListener('click', () => this.loadFrame(1));
    buttons[0].addEventListener('click', () => this.loadFrame(0));
  }

}

export {NavbarHandler};