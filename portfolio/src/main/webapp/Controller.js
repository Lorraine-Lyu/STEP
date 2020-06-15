import CommentHandler from '/CommentHandler.js';
import UserHandler from '/UserHandler.js';

export default class Controller {

  constructor(document) {
    this.username_ = undefined;
    this.loggedIn_ = false;
    this.document_ = document;
    this.commentHandler_ = new CommentHandler();
    this.userHandler_ = new UserHandler();
  }

  /** Fetches comments and user's account information from server. */
  async init() {
    await this.loadComments_(this.document_.getElementById('comments'), 
                             this.document_.getElementById('comment-cell'));
    await this.checkLoginStatus_();
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