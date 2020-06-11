export default class CommentHandler {
  /**
   * Loads all comments from backend.
   * This function is called when the page is loaded.
   * @returns {JSON Array} a JSON array containing all comments
   */
  static async loadComments() {
    let commentResponse = undefined;
    try {
      commentResponse = await fetch('/comment');
    } catch (e) {
      throw e;
      return;
    }

    try {
      const jsonArray = await commentResponse.json();
      return jsonArray;
    } catch (e) {
      throw e;
    }
  }
}