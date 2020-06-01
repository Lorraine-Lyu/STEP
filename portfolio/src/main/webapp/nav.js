/* change src of iframe according to input index
 * @param {integer} str index of page the iframe should load
 */
function load(str) {
  var frame = document.getElementsByTagName("iframe")[0];
  switch(str) {
    case 1:
      frame.src = "main.html";
      break;
    case 2:
      frame.src = "introduction.html";
      break;
    case 3:
      frame.src = "projects.html";
      break;
    case 4:
      frame.src = "gallery.html";
      break;
    default:
      frame.src = "error.html";
  }
}