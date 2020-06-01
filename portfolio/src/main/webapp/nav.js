/* change src of iframe according to pageIndex
 * @param {integer} pageIndex index of page the iframe should load
 */
function load(pageIndex) {
  const frame = document.getElementsByTagName("iframe")[0];
  switch(pageIndex) {
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