import {CommentHandler} from '/CommentHandler.js';
import {NavbarHandler} from '/NavbarHandler.js';
import {UserHandler} from '/UserHandler.js';

/**
 * The adapter class which delegates actions required from view to 
 * different service modules.
 */
export default class Controller {

  constructor(document) {
    /** 
     * @private @type {string} The string of current user's username.
     */
    this.username_ = undefined;
    /** 
     * @private 
     * @type {bool} 
     * Indicates whether the user has logged in.
     */
    this.loggedIn_ = false;
    /** 
     * @private @const 
     * @type {!HTML document} 
     */
    this.document_ = document;
    /** 
     * @private @const 
     * @type {!CommentHandler}  
     */
    this.commentHandler_ = new CommentHandler();
    /** 
     * @private @const 
     * @type {!UserHandler} 
     */
    this.userHandler_ = new UserHandler();
    /** 
     * @private @const 
     * @type {!NavbarHandler} 
     */
    this.navbarHandler_ = new NavbarHandler(document);
  }

  /** Fetches comments and user's account information from server. */
  async init() {
    try {
      await this.loadComments_(this.document_.getElementById('comments'), 
                               this.document_.getElementById('comment-cell'));
    } catch(e) {
      alert('Cannot load comments');
      console.log(e);
    }
    try {
      await this.checkLoginStatus_();
    } catch(e) {
      alert("Cannot check user's login status");
      console.log(e);
    }
  }

  /** Shows the change name form. */
  openNameForm() {
    this.document_.getElementById('name-form').classList.remove('hidden-elem');
  }

  /** Hides the change name form. */
  closeNameForm() {
    this.document_.getElementById('name-form').classList.add('hidden-elem');
  }

  /** 
   * Loads html page corresponding to the page index.
   * @param {integer} index The page index for possible html page.
   */
  loadFrame(index) {
    this.navbarHandler_.loadFrame(index);
  }

  /**
   * Loads all comments from backend.
   * This function is called when the page is loaded.
   * @param {!HTML div object} commentBox The div in document with id "comment-box".
   * @param {!HTML template} commentCell The template for one comment.
   * @private
   */
  async loadComments_(commentBox, commentCell) { 
    try {
      await this.commentHandler_.loadComments_(commentBox, commentCell);
    } catch (e) {
      alert('Cannot get response from /comment');
      console.log(e);
    }
  }

  /**
   * Checks whether the user has logged in;
   * if so, gets the username;
   * if not, gets the login url.
   * to the portfolio webpage.
   * @private
   */
   async checkLoginStatus_() {
    try {
      await this.userHandler_.loadLoginStatus_(this);
    } catch(e) {
      alert('Cannot get response from /login');
      console.log(e);
    }
  }
}