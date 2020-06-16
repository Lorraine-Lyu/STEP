import CommentHandler from '/CommentHandler.js';
import UserHandler from '/UserHandler.js';

export default class Controller {

  constructor(document) {
    /** @member {String} username_ current user's username */
    this.username_ = undefined;
    /** @member {bool} loggedIn_ whether the user has logged in */
    this.loggedIn_ = false;
    /** @member {HTML document} document_ the current document loaded on webpage */
    this.document_ = document;
    /** @member {CommentHandler} commentHandler_ 
      * an instance of comment loading service module 
      */
    this.commentHandler_ = new CommentHandler();
    /** @member {UserHandler} userHandler_ 
     * an instance of user login(out) service module 
     */
    this.userHandler_ = new UserHandler();
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
   * Loads all comments from backend.
   * This function is called when the page is loaded.
   * @param {HTML div object} commentBox The div in document with id "comment-box"
   * @param {HTML template} commentCell The template for one comment
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