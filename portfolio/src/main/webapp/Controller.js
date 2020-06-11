export default class Controller {

  constructor(document) {
    this.username = undefined;
    this.loggedIn = false;
    this.document = document;
  }

  openNameForm() {
    // pops up the form with id "nameForm".
  }

  closeNameForm() {
    // hides the form with id "nameForm".
  }

  /**
   * Loads all comments from backend.
   * This function is called when the page is loaded.
   * @param {HTML div object} commentBox The div in document with id "comment-box"
   */
  static async loadComments(commentBox) {

    try {
      const jsonArray = await commentResponse.json();
      const comments = jsonArray
        .map(entry => 
        `<div class='entry'><p> ${entry.userName} : ${entry.comment}</p></div>`)
        .join('');
      commentBox.innerHTML = comments;
    } catch (e) {
      alert('Cannot parse response');
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
      const statusObj = await loginStatus.json();
      if (statusObj.isUserLoggedIn) {
        controller.username = statusObj.helperInfo;
        controller.document.getElementById('form-comment').classList.remove('hidden-elem');
        controller.document.getElementById('username').textContent = controller.username;
        controller.document.getElementById('logout').href = statusObj.logoutUrl;
        controller.document.getElementById('p-login').classList.add('hidden-elem');
      } else {
        let loginUrl = statusObj.helperInfo;
        controller.document.getElementById('form-comment').classList.add('hidden-elem');
        controller.document.getElementById('p-login').classList.remove('hidden-elem');
        controller.document.getElementById('login').href = loginUrl;
      }
      controller.loggedIn = statusObj.isUserLoggedIn;
    } catch(e) {
      alert('Cannot parse response');
      console.log(e);
    }
  }
}