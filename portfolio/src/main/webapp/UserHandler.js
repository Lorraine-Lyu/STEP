/** The class which checks user's login status */
export default class UserHandler {
  
  static async loadLoginStatus() {
    let loginStatus = undefined;
    try {
      loginStatus = await fetch('/login');
    } catch(e) {
      throw e;
      return;
    }

    try {
      let statusObj = await loginStatus.json();
      return statusObj;
    } catch(e) {
      throw e;
    }
  }
}