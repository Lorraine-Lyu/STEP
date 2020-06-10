export default class Controller {

  constructor() {
    this.username = undefined;
    this.loggedIn = false;
  }

  static async loadComments(commentBox) {
    let commentResponse = undefined;
    try {
      commentResponse = await fetch('/comment');
    } catch (e) {
      alert('Cannot get response');
      console.log(e);
      return;
    }

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

  static async checkLoginStatus(controller, document) {
    let loginStatus = undefined;
    try {
      loginStatus = await fetch('/login');
    } catch(e) {
      alert('Cannot get login status');
      console.log(e);
      return;
    }
    try {
      const statusObj = await loginStatus.json();
      if (statusObj.isUserLoggedIn) {
        let username = loginStatus.helperInfo;
        document.getElementById('username').textContent =  username;
      } else {
        let loginUrl = loginStatus.helperInfo;
        document.getElementById('comment-box').innerHTML = '<p> please log in <a href="' + loginUrl + '"> here</a>';
      }
      controller.loggedIn = statusObj.isUserLoggedIn;
    } catch(e) {
      alert('Cannot parse response');
      console.log(e);
    }
  }
}