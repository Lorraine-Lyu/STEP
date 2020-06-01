/** 
 * Change src of iframe according to pageIndex
 * @param {integer} pageIndex index of page the iframe should load
 */
function loadFrame(pageIndex) {
  const frame = document.getElementById("iframe");
  const sources = [
    'main.html', 
    'introduction.html', 
    'projects.html', 
    'gallery.html',
  ];
  frame.src = sources[pageIndex];
}