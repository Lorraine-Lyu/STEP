import CommentHandler from '/CommentHandler.js';
import UserHandler from '/UserHandler.js';

export default class Controller {

  constructor(document) {
    this.username = undefined;
    this.loggedIn = false;
    this.document = document;
  }

  /** Shows the change name form*/
  openNameForm() {
    this.document.getElementById('name-form').classList.remove('hidden-elem');
  }

  /** Hides the change name form*/
  closeNameForm() {
    this.document.getElementById('name-form').classList.add('hidden-elem');
  }

  /**
   * Loads all comments from backend.
   * This function is called when the page is loaded.
   * @param {HTML div object} commentBox The div in document with id "comment-box"
   * @param {HTML template} commentCell The template for one comment
   */
  static async loadComments(commentBox, commentCell) {
    try {
      let commentArray = await CommentHandler.loadComments();
      let comments = commentArray
        .map(entry => {
          let clone = commentCell.content.cloneNode(true);
          clone.getElementById('guest-name').textContent = entry.userName;
          clone.getElementById('guest-comment').textContent = entry.comment;
          commentBox.appendChild(clone);
        });
    } catch (e) {
      alert('Cannot get response from /comment');
      console.log(e);
    }
  }

  /**
   * Checks whether the user has logged in;
   * if so, gets the username;
   * if not, gets the login url.
   * @param {Controller} controller the controller connected 
   * to the portfolio webpage.
   */
  static async checkLoginStatus(controller) {

    try {
      // statusObj has a boolean to indicate whether the user has logged in;
      // and a helperInfo string which can either be username or login url.
      let statusObj = await UserHandler.loadLoginStatus();
      let doc = controller.document;
      if (statusObj.isUserLoggedIn) {
        controller.username = statusObj.helperInfo;
        doc.getElementById('form-comment').classList.remove('hidden-elem');
        doc.getElementById('username').textContent = controller.username;
        doc.getElementById('hidden-username').value = controller.username;
        doc.getElementById('logout').href = statusObj.logoutUrl;
        doc.getElementById('p-login').classList.add('hidden-elem');
      } else {
        let loginUrl = statusObj.helperInfo;
        doc.getElementById('form-comment').classList.add('hidden-elem');
        doc.getElementById('p-login').classList.remove('hidden-elem');
        doc.getElementById('login').href = loginUrl;
      }
      controller.loggedIn = statusObj.isUserLoggedIn;
    } catch(e) {
      alert('Cannot get response from /login');
      console.log(e);
    }
  }
}