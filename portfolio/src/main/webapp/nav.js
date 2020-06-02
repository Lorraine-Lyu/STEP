/** The List of relative paths to all files to be loaded in iframe */
  const sources = [
    'main.html', 
    'introduction.html', 
    'projects.html', 
    'gallery.html',
  ];

/** 
 * Change src of iframe according to pageIndex
 * @param {integer} pageIndex index of page the iframe should load
 */
const loadFrame = (pageIndex) => {
  const frame = document.getElementById('sub-page');
  frame.src = sources[pageIndex];
}