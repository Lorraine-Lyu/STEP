// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// the indexes recording the picture 
// the slides in gallery.html is showing
let slide1 = 0;
let slide2 = 0;
const MAX_PAGE_INDEX = 4;

/**
 * flips both slideshow in gallery.html
 * @param {integer}  num number of pages to flip
 * @param {integer}  sIndex index of the slide to be fliped
 */
const flip = (num, sIndex) => {
  if (sIndex == 1) {
    slide1 = updateFlip(slide1, slide1 + num, "slide1");
  } else {
    slide2 = updateFlip(slide2, slide2 + num, "slide2");
  }
}

/**
 * The helper function for flip(n,s); 
 * sets the input slide to show 
 * picture corresponding to the 'show' index
 * @param {integer} prev of the image needs to be hided
 * @param {integer}  show  the index of picture the slide should flip to
 * @param {string} slideStr the class name HTML slide object to be flipped
 * @returns {integer} show the updated index for one of the slides
 */
const updateFlip = (prev, show, slideStr) => {
  let slide = document.getElementById(slideStr).getElementsByTagName("img");
  if (show > MAX_PAGE_INDEX) {
      show = 0;
  } else if (show < 0) {
      show = MAX_PAGE_INDEX;
  }

  slide[show].classList.add("pic-show");
  slide[prev].classList.remove('pic-show');
  return show;
}

// Loads the first picture of both slides when the document is loaded.
window.onload = () => {
  document.getElementById("slide1").getElementsByTagName("img")[0]
      .classList.add("pic-show");
  document.getElementById("slide2").getElementsByTagName("img")[0]
      .classList.add("pic-show");
};
