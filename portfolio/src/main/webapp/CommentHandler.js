/** The class in charge of comment loading. */
export default class CommentHandler {
  /**
   * Loads all comments from backend.
   * This function is called when the page is loaded.
   * @param {HTML div object} commentBox The div in document with id "comment-box".
   * @param {HTML template} commentCell The template for one comment.
   * @private
   */
  async loadComments_(commentBox, commentCell) {
    let commentResponse = undefined;
    try {
      commentResponse = await fetch('/comment');
      const commentArray = await commentResponse.json();
      commentArray
        .map(entry => {
          let clone = commentCell.content.cloneNode(true);
          clone.getElementById('guest-name').textContent = entry.userName;
          clone.getElementById('guest-comment').textContent = entry.comment;
          commentBox.appendChild(clone);
        });
    } catch (e) {
      throw e;
    }
  }
}