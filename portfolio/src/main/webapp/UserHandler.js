/** The class which checks user's login status. */
export default class UserHandler {
  
  /** Gets user's login status and helpful information.
   * If user has logged in, show the commentbox and username;
   * if not, show the log in url.
   * @param {Controller} controller The Controller of current webapp
   */
  async loadLoginStatus_(controller) {
    let loginStatus = undefined;
    try {
      loginStatus = await fetch('/login');
    } catch(e) {
      throw e;
      return;
    }

    try {
      // statusObj has a boolean to indicate whether the user has logged in;
      // and a helperInfo string which can either be username or login url.
      let statusObj = await loginStatus.json();
      let doc = controller.document_;
      if (statusObj.isUserLoggedIn) {
        controller.username_ = statusObj.helperInfo;
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
      controller.loggedIn_ = statusObj.isUserLoggedIn;
      return statusObj;
    } catch(e) {
      throw e;
    }
  }
}